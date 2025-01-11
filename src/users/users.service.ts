import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, role: string) {
    const user = this.usersRepository.create({ email, password, role });
    await this.usersRepository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }
}
