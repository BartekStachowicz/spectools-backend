import { Controller, Get, Req, Patch } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { multerForPdfOptions } from 'src/multerForPdf.config';
import { Request } from 'express';
import { UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('devicemanuals')
export class ManualsController {
  constructor(private readonly manualsService: ManualsService) {}

  @UseGuards(JwtGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('pdfFile', multerForPdfOptions))
  async insertPromoItem(@Req() req: Request) {
    await this.manualsService.updateManuals(req);
    return true;
  }

  @Get()
  async getPromo() {
    const manuals = await this.manualsService.getAllManuals();
    return manuals;
  }
}
