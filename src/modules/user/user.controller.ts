import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO } from './dto/user-create.dto';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  listAll() {
    return this.userService.listAll();
  }

  @Post('/')
  createUser(@Body() payload: UserCreateDTO) {
    return this.userService.createUser(payload);
  }

  @Get('/:id')
  findUserById(@Param('id') id: number) {
    return this.userService.getById(id);
  }
}
