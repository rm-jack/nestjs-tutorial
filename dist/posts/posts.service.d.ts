import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private readonly postRepo;
    private readonly userRepo;
    constructor(postRepo: Repository<Post>, userRepo: Repository<User>);
    create(createPostDto: CreatePostDto): Promise<void>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<void>;
    remove(id: number): Promise<void>;
}
