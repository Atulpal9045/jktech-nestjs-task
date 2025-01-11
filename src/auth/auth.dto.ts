import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'The user\'s email address',
        example: 'user@example.com',
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'The user\'s password',
        example: 'password123',
    })
    @IsString()
    @MinLength(6)
    password: string;
}

export class RegisterDto {
    @ApiProperty({
      description: 'The user\'s email address',
      example: 'user@example.com',
    })
    @IsEmail()
    @IsString()
    email: string;
  
    @ApiProperty({
      description: 'The user\'s password',
      example: 'password123',
    })
    @IsString()
    @MinLength(6)
    password: string;
  
    @ApiProperty({
      description: 'The role of the user (e.g., admin, editor, viewer)',
      example: 'admin',
      enum: ['admin', 'editor', 'viewer'], // This ensures Swagger shows the possible enum values
    })
    @IsString()
    @IsIn(['admin', 'editor', 'viewer'])
    role: string;
  }