import { User } from './user.schema';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
export declare class UsersSeeder implements Seeder {
    private userRepo;
    constructor(userRepo: Repository<User>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
