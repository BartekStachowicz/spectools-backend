import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';

import { OfferController } from './offer.controller';
import { OfferSchema } from './offer.model';
import { OfferService } from './offer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Offer', schema: OfferSchema }]),
  ],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
