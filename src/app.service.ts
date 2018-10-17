import { Injectable } from '@nestjs/common';
import { DatabaseService } from './shared/database/database.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(private db: DatabaseService) {}

  public async root(): Promise <any> {
    let db = await this.db.connect();

    let result = await db.collection("users").find().toArray();

    return result;
  }
}
