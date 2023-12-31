import { Injectable } from "@nestjs/common";
import {
  ServerException,
  ServerExceptionCode,
} from "@lib/common/exception/server.exception";

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new ServerException({
        code: ServerExceptionCode.NotFound,
        message: "파일이 존재하지 않습니다.",
      });
    }

    return file.path;
  }

  uploadFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new ServerException({
        code: ServerExceptionCode.NotFound,
        message: "파일이 존재하지 않습니다.",
      });
    }

    const filePaths = files.map((file) => file.path);
    return { filePaths };
  }
}
