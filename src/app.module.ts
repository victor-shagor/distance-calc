import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LocationModule } from './location/location.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LocationModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
