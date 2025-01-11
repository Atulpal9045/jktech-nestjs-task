import { Controller, Get, Post, Param, Body, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserRoleDto } from './users.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)  // Protect all routes with JWT and Roles Guard
@ApiTags('Users')  // Group endpoints under 'Users' in Swagger
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')  // Only accessible by users with 'admin' role
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users.',
    type: [User],  // Array of User entities
  })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post('create')
  @Roles('admin')  // Only accessible by users with 'admin' role
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation Errors)',
  })
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData.email, userData.password, userData.role);
  }

  @Post(':id/role')
  @Roles('admin')  // Only accessible by users with 'admin' role
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the user\'s role' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: Number,
  })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the user\'s role.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation Errors)',
  })
  async updateUserRole(@Param('id') id: number, @Body() updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    return this.usersService.updateRole(id, updateUserRoleDto.role);
  }

  @Delete(':id')
  @Roles('admin')  // Only accessible by users with 'admin' role
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the user.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
