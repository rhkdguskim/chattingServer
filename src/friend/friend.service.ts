import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { Repository } from 'typeorm';
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
        query.where('friend.user_id = :user_id', { user_id: user.user_id});
        const friends = await query.getMany();
        return friends;
    }


    async addFriend(createFriend: CreateFriendDto, user:User): Promise<Friend> {
        const {friend_id, friend_name} = createFriend;
        const friend = this.friendRepository.create({
            friend_id,
            friend_name,
            user,
        })
        return this.friendRepository.save(friend)
    }

    async changeFriendName(createFriend: CreateFriendDto, user:User): Promise<Friend> {
        const {friend_id, friend_name} = createFriend;
        const friend = this.friendRepository.create({
            friend_name,
            user,
        })
        return this.friendRepository.save(friend)
    }
}
