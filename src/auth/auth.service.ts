import { BadRequestException, ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(()=> UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const match = await bcrypt.compare(password, user.password);
    console.log('match---', password, user.password)
    if (!match) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }

  async register(email: string, password: string, role: string) {
    const user = await this.userService.findByEmail(email)
    if(user) throw new ConflictException('User already exists!');
    const newUser = await this.userService.create(email, password, role);
    return { message: 'User created successfully', user: newUser };
  }
}
