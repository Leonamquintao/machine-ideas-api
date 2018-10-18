import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';

@Injectable()
export class UserService {

  constructor(private db: DatabaseService) {}

  public async getUsers(): Promise <string[]> {
    let db = await this.db.connect();
    let result = await db.collection("users").find().toArray();
    return result;
  }

  public async getUser(id: string): Promise <any> {
    let db = await this.db.connect();
    let result = await db.collection("users").find({"_id": id}).toArray();
    return result;
  }

  public async createUser(data: any): Promise <any> {

  }

  public async updateUser(id: string, data: any): Promise <any> {

  }

  public async deleteUserById(id: string): Promise <any> {

  }

}
