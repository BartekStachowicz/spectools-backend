import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt.guard';
import { multerOptions } from 'src/multer.config';
import { OfferItem } from './offer.model';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  //new offer item
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async insertOfferItem(@Req() req: Request): Promise<{ id: string }> {
    const databaseItemID = await this.offerService.insertOfferItem(req);
    return { id: databaseItemID };
  }

  //get all offer items
  @Get()
  async getOffer() {
    const offer = await this.offerService.getOffer();
    return offer.map((item) => {
      return {
        id: item._id,
        name: item.name,
        itemPathId: item.itemPathId,
        priceRent: item.priceRent,
        priceCaution: item.priceCaution,
        description: item.description,
        shortDescription: item.shortDescription,
        technicalCondition: item.technicalCondition,
        imagePath: item.imagePath,
        minRentalPeriod: item.minRentalPeriod,
        rentOnlineURL: item.rentOnlineURL,
        calendarFlag: item.calendarFlag,
      };
    });
  }

  //get one offer item
  @Get(':id')
  async getOfferItem(@Param('id') id: string): Promise<OfferItem> {
    const item = await this.offerService.getOfferItem(id);
    return item;
  }

  //update offer item
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Patch(':id')
  async updateOfferItem(@Param('id') id: string, @Req() req: Request) {
    console.log(req);
    await this.offerService.updateOfferItem(id, req);
    return true;
  }

  //delete offer item
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteOfferItem(@Param('id') id: string) {
    await this.offerService.deleteOfferItem(id);
    return true;
  }
}
