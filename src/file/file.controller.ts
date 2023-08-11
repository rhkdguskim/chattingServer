import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
@UseGuards(AuthGuard())
@ApiTags('파일업로드')
export class FileController {
    constructor(private readonly fileService: FileService) {}
    @Post('upload')
    @ApiOperation({ summary: '파일업로드 API', description: '프로필, 배경화면에 설정할 이미지를 업로드 합니다.' })
    @ApiCreatedResponse({ description: '프로필, 배경화면에 설정할 이미지를 업로드 합니다.'})
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.fileService.uploadFile(file);
    }
}
