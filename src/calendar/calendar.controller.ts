import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CalendarService } from './calendar.service';
import { Request } from 'express';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @UseGuards(JwtGuard)
  @Patch()
  async insertPromoItem(@Req() req: Request) {
    await this.calendarService.updatePromoItem(req);
  }

  @Get()
  async getCalendarEvents(@Req() req: Request) {
    const calendar = await this.calendarService.findByName(req.body.idItem);
    return {
      idItem: calendar.idItem,
      events: calendar.events,
    };
  }
}
