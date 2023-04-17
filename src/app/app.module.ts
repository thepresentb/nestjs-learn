import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProductModule } from 'src/component/product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
