import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Validate } from 'class-validator'; // Optional: If you need to validate manually
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user and return a JWT token' })
  @ApiBody({
    description: 'The credentials required for login',
    type: LoginDto, // Reference the Login DTO
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'JWT_TOKEN_HERE' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user with a role' })
  @ApiBody({
    description: 'The details required for user registration',
    type: RegisterDto, // Reference the Register DTO
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User successfully registered' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or user already exists',
  })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.role);
  }
}
