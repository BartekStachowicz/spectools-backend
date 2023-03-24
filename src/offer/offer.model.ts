import * as mongoose from 'mongoose';

export const OfferSchema = new mongoose.Schema({
  name: { type: String, require: true },
  itemPathId: { type: String, require: true },
  priceRent: { type: Number, require: true },
  priceCaution: { type: Number, require: true },
  description: { type: String, require: true },
  shortDescription: { type: String, require: true },
  technicalCondition: { type: String, require: true },
  imagePath: { type: String, require: true },
  minRentalPeriod: { type: String, require: true },
  rentOnlineURL: { type: String, require: true },
});

export interface OfferItem extends mongoose.Document {
  id: string;
  name: string;
  itemPathId: string;
  priceRent: number;
  priceCaution: number;
  description: string;
  shortDescription: string;
  technicalCondition: string;
  imagePath: string;
  minRentalPeriod: string;
  rentOnlineURL: string;
}

export interface InputOfferItemDTO {
  name: string;
  priceRent: number;
  priceCaution: number;
  description: string;
  shortDescription: string;
  technicalCondition: string;
  minRentalPeriod: string;
  rentOnlineURL: string;
  image: any;
}
