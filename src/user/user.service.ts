import { Injectable, Logger } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { DatabaseService } from '../shared/database/database.service';

import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const ObjectId = require('mongodb').ObjectId;
const COLLECTION: string = "users";

@Injectable()
export class UserService {

  constructor(private db: DatabaseService) {}

  public async login(data: any): Promise <any> {
    let db = await this.db.connect();
    let user = await db.collection(COLLECTION).find({ "email": data.email }).toArray();

    if(!user || !(await this.comparePassword(data.password, user[0].password))) {
      return { status: 401, message: 'Invalid user/password!' }
    } else {
      user[0].token = await this.geToken(user[0]._id)
      return this.userResponseObject(user);
    }
  }

  public async getUsers(): Promise <UserDTO[]> {
    let db = await this.db.connect();
    let result = await db.collection(COLLECTION).find().toArray();
    this.db.desconnect();
    return this.userResponseObject(result);
  }


  public async getUser(id: string): Promise <any> {
    let db = await this.db.connect();
    let result = await db.collection(COLLECTION).find({"_id": ObjectId(id)}).toArray();
    return this.userResponseObject(result);
  }

  public async createUser(data: Partial<UserDTO>): Promise <any> {
    let db = await this.db.connect();
    data.password = await this.hashPassword(data.password);

    let userPromise = new Promise((resolve, reject) => {
      db.collection(COLLECTION).insertOne(data, (err, rows) => {
        if(err) reject(err);
        else resolve(rows.ops);
      });
    })
    
    return userPromise;
  }

  public async updateUser(id: string, data: Partial<UserDTO>): Promise <any> {
    let db = await this.db.connect();
    let update = await db.collection(COLLECTION).update({ "_id": ObjectId(id) }, { $set: data  });
    return update;
  }

  public async deleteUserById(id: string): Promise <any> {
    let db = await this.db.connect();
    let rm = await db.collection(COLLECTION).deleteOne({"_id": ObjectId(id)});
    return rm;
  }

  private async hashPassword(pass: string): Promise <string> {
    return await bcrypt.hash(pass, 10);
  }

  private async comparePassword(attempt: string, passHash: string): Promise <boolean> {
    return await bcrypt.compareSync(attempt, passHash);
  }

  private async userResponseObject(data: any): Promise <any> {
    data.forEach(usr => delete usr.password);
    return data;
  }

  private async geToken(id): Promise <any> {
    let token = await jwt.sign({ data: id }, process.env.SECRET, { expiresIn: '7d' });
    return token
  }

}
