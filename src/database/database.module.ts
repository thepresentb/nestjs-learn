import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenvConfig from 'dotenv';

dotenvConfig.config();

import * as dbEntities from './entities';

const entities = (
  Object.keys(dbEntities) as Array<keyof typeof dbEntities>
).map((key) => dbEntities[key]);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.USER_DATABASE_HOST,
        port: +process.env.USER_DATABASE_PORT,
        username: process.env.USER_DATABASE_USERNAME,
        password: process.env.USER_DATABASE_PASSWORD,
        database: process.env.USER_DATABASE_NAME,
        entities,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
