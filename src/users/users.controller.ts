import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { RolesGuard } from '../common/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post(':id/role')
  @UseGuards(RolesGuard)
  async updateRole(@Param('id') id: number, @Body() role: string) {
    const user = await this.userService.findById(id);
    user.role = role;
    await this.userService.save(user);
    return user;
  }
}
