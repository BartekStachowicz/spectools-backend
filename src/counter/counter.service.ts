import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './counter.model';
import { Request } from 'express';

@Injectable()
export class CounterService {
  constructor(
    @InjectModel('Counter') private readonly counterModel: Model<Counter>,
  ) {}

  async insertCounterUnique(req: Request): Promise<string> {
    const newCounterUnique = new this.counterModel({
      counter: req.body.counter,
      type: 'unique',
    });
    const cnt = await newCounterUnique.save();
    return cnt.id;
  }

  async insertCounterAll(req: Request): Promise<string> {
    const newCounterAll = new this.counterModel({
      counter: req.body.counter,
      type: 'all',
    });
    const cnt = await newCounterAll.save();
    return cnt.id;
  }

  async updateCounterUnique(req: Request) {
    const updatedItem = await this.findByName('unique');
    updatedItem.counter = req.body?.counter || updatedItem.counter;
    updatedItem.save();
  }

  async updateCounterAll(req: Request) {
    const updatedItem = await this.findByName('all');
    updatedItem.counter = req.body?.counter || updatedItem.counter;
    updatedItem.save();
  }

  async findByName(type: string): Promise<any> {
    return this.counterModel.findOne({ type });
  }
}
