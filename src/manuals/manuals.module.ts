import { Module } from '@nestjs/common';
import { ManualsController } from './manuals.controller';
import { ManualsService } from './manuals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ManualSchema } from './manuals.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Manual', schema: ManualSchema }]),
  ],
  controllers: [ManualsController],
  providers: [ManualsService],
})
export class ManualsModule {}
