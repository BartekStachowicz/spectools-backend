import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { OfferModule } from './offer/offer.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { PromoModule } from './promo/promo.module';

const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE_DEV;

@Module({
  imports: [
    OfferModule,
    MongooseModule.forRoot(
      `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.6eelvtt.mongodb.net/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    ),
    ServeStaticModule.forRoot({
      rootPath: 'assets',
      serveRoot: '/assets',
    }),
    AuthModule,
    UsersModule,
    PromoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
