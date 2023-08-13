import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Response } from 'express';

@Controller('file')
@UseGuards(AuthGuard())
@ApiTags('파일업로드')
export class FileController {
    constructor(private readonly fileService: FileService) {}
    @Post('upload')
    @ApiOperation({ summary: '파일업로드 API', description: '프로필, 배경화면에 설정할 이미지를 업로드 합니다.' })
    @ApiCreatedResponse({ description: '프로필, 배경화면에 설정할 이미지를 업로드 합니다.'})
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fullfilename = await this.fileService.uploadFile(file)
        const filepath = path.basename(fullfilename);
      return filepath;
    }

    @Get(':fileName')
    async serveFile(@Param('fileName') fileName: string, @Res() res: Response) {
        const filePath = path.join(__dirname, 'uploads', fileName);
        res.sendFile(filePath);
    }
}
