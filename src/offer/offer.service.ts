import { Injectable, NotFoundException } from '@nestjs/common';
import { InputOfferItemDTO, OfferItem } from './offer.model';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel('Offer') private readonly offerModel: Model<OfferItem>,
  ) {}

  async insertOfferItem(req: Request): Promise<string> {
    const offerItem: InputOfferItemDTO = req.body;
    const imagePath = this.generateImagePath(
      req.file.filename,
      req.get('host'),
      req.protocol,
    );
    const itemPathId = this.generatePathId(offerItem.name);
    const newOfferItem = new this.offerModel({
      ...offerItem,
      itemPathId: itemPathId,
      imagePath: imagePath,
    });
    const item = await newOfferItem.save();
    return item.id;
  }

  async getOffer(): Promise<OfferItem[]> {
    const offer = await this.offerModel.find().exec();

    return offer;
  }

  async getOfferItem(id: string): Promise<OfferItem> {
    const item = await this.findItem(id);
    return item;
  }

  async updateOfferItem(id: string, req: Request) {
    const offerItem: InputOfferItemDTO = req.body;
    const updatedItem = await this.findItem(id);

    let imagePath: string;

    if (req.file) {
      imagePath = this.generateImagePath(
        req.file.filename,
        req.get('host'),
        req.protocol,
      );
    } else {
      imagePath = updatedItem.imagePath;
    }

    updatedItem.name = offerItem?.name || updatedItem.name;
    updatedItem.itemPathId =
      this.generatePathId(offerItem.name) || updatedItem.itemPathId;
    updatedItem.priceRent = offerItem?.priceRent || updatedItem.priceRent;
    updatedItem.priceCaution =
      offerItem?.priceCaution || updatedItem.priceCaution;
    updatedItem.description = offerItem?.description || updatedItem.description;
    updatedItem.shortDescription =
      offerItem?.shortDescription || updatedItem.shortDescription;
    updatedItem.technicalCondition =
      offerItem?.technicalCondition || updatedItem.technicalCondition;
    updatedItem.imagePath = imagePath || updatedItem.imagePath;
    updatedItem.minRentalPeriod =
      offerItem?.minRentalPeriod || updatedItem.minRentalPeriod;
    updatedItem.rentOnlineURL =
      offerItem?.rentOnlineURL || updatedItem.rentOnlineURL;
    updatedItem.calendarFlag =
      offerItem?.calendarFlag || updatedItem.calendarFlag;
    updatedItem.save();
  }

  async deleteOfferItem(id: string) {
    try {
      const result = await this.offerModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Item not found!');
      }
    } catch {
      throw new NotFoundException('Item not found!');
    }
  }

  private async findItem(id: string): Promise<OfferItem> {
    let item: OfferItem;
    try {
      item = await this.offerModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Item not found!');
    }
    if (!item) {
      throw new NotFoundException('Item not found!');
    }
    return item;
  }

  private generateImagePath(
    filename: string,
    host: string,
    protocol: string,
  ): string {
    const url = `${protocol}://${host}`;
    const path = `${url}/assets/${filename}`;
    return path;
  }

  private generatePathId(name: string): string {
    const pathId = name
      .toLowerCase()
      // .replaceAll('/', ' ')
      // .replaceAll('#', ' ')
      // .replaceAll('?', ' ')
      // .replaceAll('!', ' ')
      // .replaceAll('$', ' ')
      // .replaceAll("'", ' ')
      // .replaceAll('(', ' ')
      // .replaceAll(')', ' ')
      // .replaceAll('*', ' ')
      // .replaceAll('+', ' ')
      // .replaceAll(',', ' ')
      // .replaceAll(':', ' ')
      // .replaceAll(';', ' ')
      // .replaceAll('=', ' ')
      // .replaceAll('@', ' ')
      // .replaceAll('[', ' ')
      // .replaceAll(']', ' ')
      .split(' ')
      .join('-');
    return pathId;
  }
}
