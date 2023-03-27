import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
  @Prop()
  counter: number;
  @Prop()
  type: string;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
