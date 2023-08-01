import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
@Module({
    imports : [
        forwardRef(() => AuthModule), // 순환참조 방지
        TypeOrmModule.forFeature([User]),],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
