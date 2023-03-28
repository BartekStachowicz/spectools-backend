import * as mongoose from 'mongoose';

export const CalendarSchema = new mongoose.Schema({
  idItem: { type: String, require: true },
  events: {
    type: {
      title: String,
      start: String,
      end: String,
      color: { primary: String, secondary: String },
      draggable: Boolean,
      resizable: { beforeStart: Boolean, afterEnd: Boolean },
    },
  },
});

export interface Calendar extends mongoose.Document {
  idItem: string;
  events: {
    title: string;
    start: string;
    end: string;
    color: { primary: string; secondary: string };
    draggable: boolean;
    resizable: { beforeStart: boolean; afterEnd: boolean };
  };
}
