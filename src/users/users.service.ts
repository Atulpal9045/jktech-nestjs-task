import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';  // Used for password hashing

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id}});
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({where: {email}});
  }

  async create(email: string, password: string, role: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    const user = this.usersRepository.create({ email, password: hashedPassword, role });
    return this.usersRepository.save(user);
  }

  async updateRole(id: number, role: string): Promise<User> {
    const user = await this.usersRepository.findOne({where: {id}});
    if (user) {
      user.role = role;
      await this.usersRepository.save(user);
      return user;
    }
    throw new Error('User not found');
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
