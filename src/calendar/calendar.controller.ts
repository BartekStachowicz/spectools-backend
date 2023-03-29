import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CalendarService } from './calendar.service';
import { Request } from 'express';
import { Calendar } from './calendar.model';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  async insertPromoItem(@Req() req: Request) {
    await this.calendarService.updatePromoItem(req);
    return true;
  }

  @Get()
  async getCalendarEvents(): Promise<Calendar[]> {
    const calendar = await this.calendarService.getAllEvents();
    return calendar;
  }
}
