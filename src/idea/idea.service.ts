import { Injectable } from '@nestjs/common';
import { IdeaDTO } from './idea.dto';
import { DatabaseService } from "../shared/database/database.service";

const ObjectId = require('mongodb').ObjectId;
const COLLECTION: string = "ideas";

@Injectable()
export class IdeaService {

  constructor(private db: DatabaseService) {}

  public async getIdeas(): Promise <string[]> {
    let db = await this.db.connect();
    let result = await db.collection(COLLECTION).find().toArray();
    this.db.desconnect();
    return result;
  }

  public async getIdeaById(id: string): Promise <any> {
    let db = await this.db.connect();
    let result = await db.collection(COLLECTION).find({"_id": ObjectId(id)}).toArray();
    return result;
  }

  public async getIdeasByUserId(id: string): Promise <any> {
    let db = await this.db.connect();
    let result = await db.collection(COLLECTION).find({"user_id": id}).toArray();
    return result;
  }

  public async createIdea(data: any): Promise <any> {
    let db = await this.db.connect();
    let insert = await db.collection(COLLECTION).insert(data);
    return insert;
  }

  public async updateIdea(id: string, data: Partial<IdeaDTO>): Promise <any> {
    let db = await this.db.connect();
    let update = await db.collection(COLLECTION).update({ "_id": ObjectId(id) }, { $set: data });
    return update;
  }

  public async deleteIdeaById(id: string): Promise <any> {
    let db = await this.db.connect();
    let rm = await db.collection(COLLECTION).deleteOne({"_id": ObjectId(id)});
    return rm;
  }

}
