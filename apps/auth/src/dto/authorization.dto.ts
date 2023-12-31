import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@app/user/entity/users.entity";

export class TokenInfoRequest {
  constructor(user: TokenInfoRequest) {
    this.id = user.id;
    this.user_id = user.user_id;
    this.role = user.role;
  }

  @ApiProperty({ description: "User indexed ID" })
  id: number;

  @ApiProperty({ description: "User ID" })
  user_id: string;

  @ApiProperty({ description: "Role" })
  role: Role;
}

export class TokenInfoResponse extends TokenInfoRequest {
  constructor(jwtResponse: TokenInfoResponse) {
    super({ ...jwtResponse });
    this.iat = jwtResponse.iat;
  }
  iat: string;
}
