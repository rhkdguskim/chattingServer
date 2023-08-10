import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { multerOptionsFactory } from 'src/util/multer.options.factory';


@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}