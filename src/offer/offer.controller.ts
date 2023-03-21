import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { multerOptions } from 'src/multer.config';
import { InputOfferItem, OfferItem } from './offer.model';
import { OfferService } from './offer.service';

@Controller('api/offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  //new offer item
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async insertOfferItem(
    @Req() req: Request,
    @UploadedFile() file: any,
  ): Promise<{ [k: string]: string }> {
    const databaseItemID = await this.offerService.insertOfferItem(file, req);
    return { id: databaseItemID };
  }

  //get all offer items
  @Get()
  async getOffer(): Promise<OfferItem[]> {
    const offer = await this.offerService.getOffer();
    return offer;
  }

  //get one offer item
  @Get(':id')
  async getOfferItem(@Param('id') id: string): Promise<OfferItem> {
    const item = await this.offerService.getOfferItem(id);
    return item;
  }

  //update offer item
  @Patch(':id')
  async updateOfferItem(
    @Param('id') id: string,
    @Body() offerItem: InputOfferItem,
  ) {
    await this.offerService.updateOfferItem(id, offerItem);
    return null;
  }

  //delete offer item
  @Delete(':id')
  async deleteOfferItem(@Param('id') id: string) {
    await this.offerService.deleteOfferItem(id);
    return null;
  }
}
