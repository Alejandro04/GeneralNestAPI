import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://alejo:12345@cluster0.w9odzkm.mongodb.net/?retryWrites=true&w=majority'), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
