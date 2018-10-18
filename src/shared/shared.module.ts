import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { HttpErrorFilter } from './http/httpError.filter';

Global()
@Module({
  providers: [DatabaseService, HttpErrorFilter],
  exports: [DatabaseService, HttpErrorFilter]
})

export class SharedModule {}
