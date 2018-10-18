import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { DatabaseService } from '../shared/database/database.service';

const ObjectId = require('mongodb').ObjectId

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
    let result = await db.collection("users").find({"_id": ObjectId(id)}).toArray();
    return result;
  }

  public async createUser(data: Partial<UserDTO>): Promise <any> {
    let db = await this.db.connect();
    let insert = await db.collection("users").insert(data);
    return insert
  }

  public async updateUser(id: string, data: Partial<UserDTO>): Promise <any> {
    let db = await this.db.connect();
    let update = await db.collection("users").update({ "_id": ObjectId(id) }, { $set: data  });
    return update
  }

  public async deleteUserById(id: string): Promise <any> {
    let db = await this.db.connect();
    let rm = await db.collection("users").deleteOne({"_id": ObjectId(id)});
    return rm
  }

}
