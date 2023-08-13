import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return file.path
  }

  uploadFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    const filePaths = files.map(file => file.path);
    return { filePaths };
  }
}