import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateDto } from './create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createDto: CreateDto): Promise<void> {
    await this.userService.createAsync(createDto);
  }
}
