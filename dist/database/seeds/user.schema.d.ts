import { Post } from './post.schema';
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
