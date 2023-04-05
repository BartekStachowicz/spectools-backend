import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return console.log('Hello. Something works. Fuck you!!!');
  }
}
