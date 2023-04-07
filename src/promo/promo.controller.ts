import {
  Controller,
  Get,
  Patch,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multer.config';
import { PromoService } from './promo.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @UseGuards(JwtGuard)
  @Patch()
  @UseInterceptors(FilesInterceptor('images[]', 2, multerOptions))
  async insertPromoItem(
    @Req() req: Request,
    @UploadedFiles() files: any[],
  ): Promise<{ id: string }> {
    const isExist = await this.promoService.findByName('main_promo');
    if (!isExist) {
      const databaseItemID = await this.promoService.insertPromoItem(
        files,
        req,
      );
      return { id: databaseItemID };
    } else {
      await this.promoService.updatePromoItem(files, req);
    }
  }

  @Get()
  async getPromo() {
    const promo = await this.promoService.findByName('main_promo');
    return {
      id: promo.id,
      text1: promo.text1,
      text2: promo.text2,
      imagePath1: promo.imagePath1,
      imagePath2: promo.imagePath2,
      link1: promo.link1,
      link2: promo.link2,
      headerText: promo.headerText,
    };
  }
}
