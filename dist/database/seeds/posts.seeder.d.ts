import { Post } from './post.schema';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
export declare class PostsSeeder implements Seeder {
    private postRepo;
    constructor(postRepo: Repository<Post>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
