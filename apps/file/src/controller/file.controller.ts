import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { FileService } from "../providers/file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { Response } from "express";
import { JwtGuard } from "@lib/common/guard/authorization.jwt.guard";
import { SelfGuard } from "@lib/common/guard/authorization.self.guard";

@Controller("file")
@UseGuards(JwtGuard, SelfGuard)
@ApiSecurity("authentication")
@ApiTags("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post("")
  @ApiOperation({
    summary: "파일업로드 API",
    description: "프로필, 배경화면에 설정할 이미지를 업로드 합니다.",
  })
  @ApiCreatedResponse({
    description: "프로필, 배경화면에 설정할 이미지를 업로드 합니다.",
  })
  @UseInterceptors(FileInterceptor("image"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fullfilename = await this.fileService.uploadFile(file);
    const filepath = path.basename(fullfilename);
    return filepath;
  }

  @Get("/:fileName")
  async serveFile(@Param("fileName") fileName: string, @Res() res: Response) {
    const filePath = path.join(__dirname, "uploads", fileName);
    Logger.log(filePath);
    res.sendFile(filePath);
  }
}
