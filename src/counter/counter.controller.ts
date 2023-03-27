import { Controller, Get, Patch, Req } from '@nestjs/common';
import { CounterService } from './counter.service';
import { Request } from 'express';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Patch('unique')
  async insertCounterUnique(@Req() req: Request): Promise<{ id: string }> {
    const isExist = await this.counterService.findByName('unique');

    if (!isExist) {
      const counterId = await this.counterService.insertCounterUnique(req);
      return { id: counterId };
    } else {
      await this.counterService.updateCounterUnique(req);
    }
  }

  @Patch('all')
  async insertCounterAll(@Req() req: Request): Promise<{ id: string }> {
    const isExist = await this.counterService.findByName('all');

    if (!isExist) {
      const counterId = await this.counterService.insertCounterAll(req);
      return { id: counterId };
    } else {
      await this.counterService.updateCounterAll(req);
    }
  }

  @Get('unique')
  async getCounterUnique() {
    const counter = await this.counterService.findByName('unique');
    return {
      counter: counter.counter,
    };
  }

  @Get('all')
  async getCounterAll() {
    const counter = await this.counterService.findByName('all');
    return {
      counter: counter.counter,
    };
  }
}
