import { Controller, Get } from "@nestjs/common";
import { OpenaiService } from "./openai.service";

@Controller("openai")
export class OpenaiController {
  constructor(private openaiService: OpenaiService) {}
  @Get("")
  async test() {
    return this.openaiService.test();
  }
}
