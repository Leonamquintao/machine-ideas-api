import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpErrorFilter } from './shared/http/httpError.filter';
import { APP_FILTER } from '@nestjs/core';

import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [SharedModule, UserModule, IdeaModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpErrorFilter }],
})

export class AppModule {}
