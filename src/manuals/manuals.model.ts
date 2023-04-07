import * as mongoose from 'mongoose';

export const ManualSchema = new mongoose.Schema({
  itemId: { type: String, require: true },
  manualPath: { type: String, require: true },
});

export interface Manual extends mongoose.Document {
  itemId: string;
  manualPath: string;
}
