import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promo } from './promo.model';

@Injectable()
export class PromoService {
  constructor(
    @InjectModel('Promo') private readonly promoModel: Model<Promo>,
  ) {}

  async insertPromoItem(files: any[], req: Request): Promise<string> {
    const imagePath1 = this.generateImagePath(
      files[0].filename,
      req.get('host'),
      req.protocol,
    );
    const imagePath2 = this.generateImagePath(
      files[1].filename,
      req.get('host'),
      req.protocol,
    );
    const newPromoItem = new this.promoModel({
      _name: 'main_promo',
      text1: req.body.text1,
      text2: req.body.text2,
      imagePath1: imagePath1,
      imagePath2: imagePath2,
      link1: req.body.link1,
      link2: req.body.link2,
      headerText: req.body.headerText,
    });
    const item = await newPromoItem.save();
    return item.id;
  }

  async updatePromoItem(files: any[], req: Request) {
    const updatedItem = await this.findByName('main_promo');
    let imagePath1: string;
    let imagePath2: string;

    if (files && files[0]) {
      imagePath1 = this.generateImagePath(
        files[0].filename,
        req.get('host'),
        req.protocol,
      );
    } else {
      imagePath1 = updatedItem.imagePath1;
    }

    if (files && files[1]) {
      imagePath2 = this.generateImagePath(
        files[1].filename,
        req.get('host'),
        req.protocol,
      );
    } else {
      imagePath2 = updatedItem.imagePath2;
    }

    updatedItem.text1 = req.body?.text1 || updatedItem.text1;
    updatedItem.text2 = req.body?.text2 || updatedItem.text2;
    updatedItem.imagePath1 = req.body.imagePath1
      ? req.body.imagePath1
      : imagePath1;
    updatedItem.imagePath2 = req.body.imagePath2
      ? req.body.imagePath2
      : imagePath2;
    updatedItem.link1 = req.body?.link1 || updatedItem.link1;
    updatedItem.link2 = req.body?.link2 || updatedItem.link2;
    updatedItem.headerText = req.body?.headerText || updatedItem.headerText;
    updatedItem.save();
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

  async findByName(_name: string): Promise<any> {
    return this.promoModel.findOne({ _name });
  }
}
