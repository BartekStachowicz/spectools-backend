import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calendar } from './calendar.model';
import { Request } from 'express';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel('Calendar') private readonly calendarModel: Model<Calendar>,
  ) {}

  async updatePromoItem(req: Request) {
    const updatedItem = await this.findByName(req.body.idItem);

    if (updatedItem) {
      updatedItem.idItem = req.body?.idItem || updatedItem.idItem;
      updatedItem.events = req.body?.events || updatedItem.events;

      updatedItem.save();
    } else {
      const newCalendarItem = new this.calendarModel({
        ...req.body,
      });
      const calendarItem = await newCalendarItem.save();
      return calendarItem;
    }
  }

  async findByName(idItem: string): Promise<any> {
    return this.calendarModel.findOne({ idItem });
  }
}
