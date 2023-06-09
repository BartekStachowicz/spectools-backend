import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromoDocument = Promo & Document;

@Schema()
export class Promo {
  @Prop()
  _name: string;
  @Prop()
  text1: string;
  @Prop()
  text2: string;
  @Prop()
  imagePath1: string;
  @Prop()
  imagePath2: string;
  @Prop()
  link1: string;
  @Prop()
  link2: string;
  @Prop()
  headerText: string;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);
