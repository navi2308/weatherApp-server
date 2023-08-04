import { Controller, Body, Param, Post, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

import { AuthGuard } from '../guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // Get the location for the user based on their prefered location.
  @Get()
  @UseGuards(AuthGuard)
  async currentWeather(@CurrentUser() user: User) {
    //     return this.weatherService.currentWeather();

    // If prefered location is not set, then set it to Surat, Gujarat
    const preferedLocation = user.preferedLocation || 'Surat, Gujarat';

    const weatherData = await this.weatherService.currentWeather(
      preferedLocation,
    );
    return weatherData;
  }

  @Get(':location')
  @UseGuards(AuthGuard)
  async getCurrentWeather(@Param('location') location: string) {
    if (!location) {
      throw new Error('Location is required');
    }
    return this.weatherService.currentWeather(location);
  }
}
