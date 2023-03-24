import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoSchema } from './promo.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Promo', schema: PromoSchema }]),
  ],
  providers: [PromoService],
  controllers: [PromoController],
})
export class PromoModule {}
