import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepo;
    private dataSource;
    constructor(userRepo: Repository<User>, dataSource: DataSource);
    create(createUserDto: CreateUserDto): Promise<void>;
    createMany(createUsersDto: CreateUserDto[]): Promise<void>;
    findAll(): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    findOneByName(name: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
    remove(id: number): Promise<void>;
}
