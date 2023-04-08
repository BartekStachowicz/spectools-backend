import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Manual } from './manuals.model';

@Injectable()
export class ManualsService {
  constructor(
    @InjectModel('Manual') private readonly manualModel: Model<Manual>,
  ) {}

  async updateManuals(req: Request) {
    const updatedItem = await this.findByName(req.body.itemId);
    let filePath: string;

    if (req.file) {
      filePath = this.generateImagePath(req.file.filename, req.get('host'));
    } else {
      filePath = updatedItem.manualPath;
    }

    if (updatedItem) {
      updatedItem.itemId = req.body?.itemId || updatedItem.itemId;
      updatedItem.manualPath = filePath || updatedItem.manualPath;

      updatedItem.save();
    } else {
      const newManualItem = new this.manualModel({
        itemId: req.body.itemId,
        manualPath: filePath,
      });
      const manualItem = await newManualItem.save();
      return manualItem;
    }
  }

  async getAllManuals() {
    return this.manualModel.find();
  }

  async findByName(idItem: string): Promise<any> {
    return this.manualModel.findOne({ idItem });
  }

  private generateImagePath(filename: string, host: string): string {
    const url = `https://${host}`;
    const path = `${url}/devicemanuals/${filename}`;
    return path;
  }
}
