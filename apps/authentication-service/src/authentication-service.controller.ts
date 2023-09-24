import { Controller, Get } from '@nestjs/common';
import { AuthenticationServiceService } from './authentication-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationServiceController {
  constructor(private readonly authenticationServiceService: AuthenticationServiceService) {}

  @Get()
  getHello(): string {
    return this.authenticationServiceService.getHello();
  }

  @MessagePattern("AUTH")
  test() {

  }
}
