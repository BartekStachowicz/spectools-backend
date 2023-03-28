import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarController } from './calendar.controller';
import { CalendarSchema } from './calendar.model';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Calendar', schema: CalendarSchema }]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
