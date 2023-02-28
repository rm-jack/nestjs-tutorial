import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource,
  ) {
    this.userRepo = userRepo;
    this.dataSource = dataSource;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepo.save(createUserDto);
  }
  async createMany(createUsersDto: CreateUserDto[]): Promise<void> {
    await this.userRepo.save(createUsersDto);
  }
  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email: email } });
    return user;
  }
  async findOneByName(name: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { name: name } });
    return user;
  }
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete({ id });
  }
}
