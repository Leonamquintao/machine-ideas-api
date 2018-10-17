import 'dotenv/config';
import {  MongoClient, Db } from "mongodb";
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class DatabaseService {

  public db: any = Db;
  private url: string = process.env.MONGO_URI;

  public async connect(): Promise <any> {
    try {
      this.db = await MongoClient.connect(this.url ,{ useNewUrlParser: true });
      Logger.log(`Connected to mongodb`, 'SUCCESS');
      return this.db.db('machine-ideas');
    } catch (err) {
      Logger.log(`Unable to connect to Mongo Database ${err}`, 'DatabaseService');
    }
  }
}
