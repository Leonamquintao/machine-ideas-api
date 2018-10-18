import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  public root(): string {
    return "Welcome to Machine Ideas!";
  }
}
