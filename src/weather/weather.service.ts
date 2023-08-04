import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { forwardGeocode } from './util/forwardGeocode';
import { forecast } from './util/forecast';

import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class WeatherService {
  constructor() {}

  async currentWeather(location: string) {
    console.log('Location searched by user is : ', location);

    const data = await forwardGeocode(location);

    // forecast(lat,long)
    try {
      const forcast = await forecast(data.lat, data.long);
      return {
        location: location,
        data,
        forcast,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
