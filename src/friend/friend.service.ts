import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateFriendDto } from './dto/friend.createfriend.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepository : Repository<Friend>,
        private userService : UsersService
    ) {}

    async getFriends(user: User): Promise<User[]> {
        const friends: Friend[] = await this.friendRepository.find({ where: { user: { id: user.id } } });
    
        const userPromises = friends.map(async (friend) => {
            const user: User = await this.userService.findOne(friend.friend_id);
            return user;
        });
    
        return Promise.all(userPromises);
    }

    async getMyFriends(user: User): Promise<Friend[]> {
        return await this.friendRepository.find({ where: { user: { id: user.id } } });
    }

    async addFriend(createFriend: CreateFriendDto, user:User): Promise<Friend> {
        const {friend_id, friend_name} = createFriend;
        console.log(friend_id, friend_name)
        const friend = this.friendRepository.create({
            friend_id,
            friend_name,
            user,
        })

        // 이미 등록된 친구라면
        const friends : Friend[]  = await this.getMyFriends(user)
        console.log(friends)
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
        // if (user.user_id == friend_id) {
        //     throw new ForbiddenException({
        //         statusCode: HttpStatus.FORBIDDEN,
        //         message: [`자기자신은 친구가 될 수 없습니다.`],
        //         error: 'Forbidden'
        //     })
        // }
        return await this.friendRepository.save(friend)
    }

    async delFriend(delFriend: Friend, user:User): Promise<DeleteResult> {
        // 해당 Friend가 현재 유저에 속하는지 확인
        const foundFriend = await this.friendRepository.findOne({where:{ id: delFriend.id, user: { id: user.id }  }});
        if (!foundFriend) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`이 친구는 삭제할 수 없습니다.`],
                error: 'Forbidden'
            });
        }
    
        return this.friendRepository.delete(foundFriend.id);
    }

    async changeFriendName(createFriend: CreateFriendDto, user:User): Promise<Friend> {
        const {friend_id, friend_name} = createFriend;
        console.log(user, friend_id)
        const friend : Friend = await this.friendRepository.findOne({where : {
            friend_id,
            user : {id:user.id},
        }})
        console.log(friend)
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