import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from './counter.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }]),
  ],
  providers: [CounterService],
  controllers: [CounterController],
})
export class CounterModule {}
