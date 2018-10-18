import { Get, Post, Put, Delete, Param, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  public getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  public createUser(@Body() data: Partial<UserDTO>) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  public updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  public deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
