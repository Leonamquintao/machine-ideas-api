import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

declare const module: any;
const port: number = parseInt(process.env.PORT) || 9090;
const host: string = process.env.HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);

  Logger.log(`Server running on ${host}:${port}`, 'Main.ts');

  if(module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
