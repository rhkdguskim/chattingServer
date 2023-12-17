
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    Post,
    Put,
    UseInterceptors
} from "@nestjs/common";
import {UsersController} from "@app/authentication/controller/authentication.controller.interface";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";
import {AuthenticationService} from "@app/authentication/providers/authentication.service.interface";
import {HttpCacheInterceptor} from "@src/common/interceptors/httpcache.interceptor";
import {CacheEvict} from "@src/common/decorator/cache-decorator";
import {ApiCreatedResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {CreateUserRequest, UpdateUserRequest, UserResponse} from "@app/authentication/dto/authenticaion.dto";
import {User} from "@app/authentication/entity/users.entity";

@Controller('users')
@ApiTags('Users')
export class UsersHttpController implements UsersController {
    constructor(
        @Inject(AUTHENTICATION_SERVICE)
        private readonly authenticationService: AuthenticationService
    ) {}

    @Get("")
    @ApiOperation({
        summary: "전체 사용자 검색",
        description: "전체 사용자를 검색합니다.",
    })
    findAllUsers(): Promise<User[]> {
        return this.authenticationService.findAll();
    }

    @UseInterceptors(HttpCacheInterceptor)
    @CacheEvict("/users")
    @Post("")
    @ApiOperation({
        summary: "사용자 생성",
        description: "사용자를 생성한다.",
    })
    @ApiCreatedResponse({
        description: "생성된 사용자 정보를 return 합니다.",
        type: UserResponse,
    })
    async signUp(@Body() user: CreateUserRequest): Promise<UserResponse> {
        return await this.authenticationService.signUp(user);
    }

    @Delete(":id")
    @ApiParam({ name: 'id', type: Number, description: '사용자 ID' })
    @ApiOperation({
        summary: "사용자 삭제",
        description: "사용자를 제거한다.",
    })
    deleteUser(@Param('id')payload: number): Promise<any> {
        return this.authenticationService.delete(payload);
    }

    @Get(":id")
    @ApiParam({ name: 'id', description: '사용자 ID, user_id, id 필드 둘다 가능' })
    @ApiOperation({
        summary: "사용자 ID 검색",
        description: "전체 사용자를 검색합니다.",
    })
    async findUser(@Param('id') id: string | number): Promise<User> {
        if (!isNaN(+id)) {
            return await this.authenticationService.findOne(+id);
        } else {
            return await this.authenticationService.findOneByID(String(id))
        }
    }

    @Put('')
    @ApiOperation({
        summary: "사용자 수정",
        description: "사용자 정보를 수정합니다.",
    })
    updateUser(@Body() payload: UpdateUserRequest): Promise<User | boolean> {
        return this.authenticationService.update(payload);
    }
}