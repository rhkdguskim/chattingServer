import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateFriendDto } from './dto/friend.createfriend.dto';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepository : Repository<Friend>
    ) {}

    async getFriends(user : User): Promise<Friend[]> {
        const query = this.friendRepository.createQueryBuilder('friend');
        query.where('friend.my_id = :user_id', { user_id: user.user_id});
        const friends = await query.getMany();
        return friends;
    }


    async addFriend(createFriend: CreateFriendDto, user:User): Promise<Friend> {
        const {friend_id, friend_name} = createFriend;
        const friend = this.friendRepository.create({
            friend_id,
            friend_name,
            my_id : user.user_id,
            user,
        })

        // 이미 등록된 친구라면
        const friends : Friend[]  = await this.getFriends(user)
        friends.map(( (myfriend : Friend) => {
            if (myfriend.friend_id == friend_id) {
                throw new ForbiddenException({
                    statusCode: HttpStatus.FORBIDDEN,
                    message: [`이미 등록된 친구입니다.`],
                    error: 'Forbidden'
                })
            }
        }))

        // 자기자신은 친구추가 불가
        if (user.user_id == friend_id) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`자기자신은 친구가 될 수 없습니다.`],
                error: 'Forbidden'
            })
        }
        return this.friendRepository.save(friend)
    }

    async delFriend(delFriend: Friend, user:User): Promise<DeleteResult> {
        // 자기자신은 친구추가 불가
        // if (user.user_id != delFriend.my_id) {
        //     throw new ForbiddenException({
        //         statusCode: HttpStatus.FORBIDDEN,
        //         message: [`자기자신이외에는 친구를 삭제 할 수 없습니다.`],
        //         error: 'Forbidden'
        //     })
        // }
        
        return this.friendRepository.delete(delFriend) 
    }

    async changeFriendName(createFriend: CreateFriendDto, user:User): Promise<Friend> {
        const {friend_id, friend_name} = createFriend;
        const friend : Friend = await this.friendRepository.findOne({where : {
            my_id:user.user_id,
            friend_id
        }})
        if (friend) {
            friend.friend_name = friend_name;
            return await this.friendRepository.save(friend)
        } else {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`해당하는 친구가 없습니다.`],
                error: 'Forbidden'
            })
        }

    }
}
