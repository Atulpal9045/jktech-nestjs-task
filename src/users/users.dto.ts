import { IsEmail, IsString, IsIn, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strongpassword123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The role of the user (admin, editor, viewer)',
    example: 'admin',
    enum: ['admin', 'editor', 'viewer'],
  })
  @IsIn(['admin', 'editor', 'viewer'])
  role: string;
}

export class UpdateUserRoleDto {
    @ApiProperty({
      description: 'The new role of the user (admin, editor, viewer)',
      example: 'editor',
      enum: ['admin', 'editor', 'viewer'],
    })
    @IsIn(['admin', 'editor', 'viewer'])
    role: string;
  }