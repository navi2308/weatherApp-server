import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

import { UpdateUserPreferenceDto } from './dtos/update-preference.dto';

import { User } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';

import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('/auth')
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get("/whoami")
  //  async whoAmI(@Session() session: any){
  //   return this.userService.findOne(session.userId);
  //  }

  @Post('/preference')
  @UseGuards(AuthGuard)
  async updateUserPreference(
    @CurrentUser() user: User,
    @Body() body: UpdateUserPreferenceDto,
  ) {
    const updatedUser = await this.userService.updatePreference(
      user.id,
      body.preferedLocation,
    );
    return updatedUser;
  }

  @Get('/whoami')
  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: any) {
    return user;
  }

  @Serialize(UserDto)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Serialize(UserDto)
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // Note : we are using CreateUserDto bec it satify our need.. we can create a signup user dto... for more clearity
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Serialize(UserDto)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
