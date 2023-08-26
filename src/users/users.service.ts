import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { CreateUserDto } from "./dto/users.createuser.dto";
import { UpdateUserDto } from "./dto/users.updateuser.dto";
import { DeleteResult, Repository } from "typeorm";
import { OAuthData } from "src/auth/dto/OAuth.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userReposity: Repository<User>,
    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userReposity.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userReposity.findOneBy({ id });
  }

  async findbyUserId(user_id: string): Promise<User | null> {
    const result = await this.userReposity.findOneBy({ user_id });
    return result;
  }

  async saveUser(user: UpdateUserDto): Promise<User> {
    return await this.userReposity.save(user);
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser = await this.userReposity.create(userDto);
    return await this.userReposity.save(newUser);
  }

  async createOAuthUser(data: OAuthData): Promise<User> {
      
    const newUser = await this.userReposity.create({...data.user,
       oauth_accessToken:data.access_token, 
       oauth_refreshToken:data.refresh_token
      });
    return await this.userReposity.save(newUser);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userReposity.delete(id);
  }

  async updateUser(id: number, updateData: Partial<User>) {
    return await this.userReposity.update(id, updateData);
  }
}
