import { Get, Post, Put, Delete, Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  public getUsers(): any {
    return this.userService.getUsers();
  }

  @Get(':id')
  public getUser(id): any {
    return this.userService.getUser(id);
  }

  @Post()
  public createUser(): any {

  }

  @Put(':id')
  public updateUser() {

  }

  @Delete(':id')
  public deleteUserById() {

  }
}
