import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('cache')
  async getCache() : Promise<number> {
    return this.appService.get();
  }

  @Get('cache/reset')
  async resetCache() : Promise<void> {
    return this.appService.reset();
  }

  @Post('cache')
  async setCache(@Body() number : number) : Promise<void> {
    return this.appService.set(number);
  }
  
}
