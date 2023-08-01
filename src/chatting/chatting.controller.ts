import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChattingService } from './chatting.service';


@Controller('chatting')

export class ChattingController {
    constructor(private chattingService : ChattingService) {}

}
