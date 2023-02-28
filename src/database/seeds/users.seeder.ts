import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(User).generate(10);

    // Insert into the database.
    return this.userRepo.upsert(users, []);
  }

  async drop(): Promise<any> {
    return this.userRepo.clear();
  }
}
