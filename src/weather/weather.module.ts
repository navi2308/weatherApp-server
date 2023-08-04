import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
