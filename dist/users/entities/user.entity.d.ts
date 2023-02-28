import { Post } from 'src/posts/entities/post.entity';
export declare class User {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
}
