import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {
    this.postRepo = postRepo;
  }

  async create(createPostDto: CreatePostDto): Promise<void> {
    const newPost = this.postRepo.create(createPostDto);
    await this.postRepo.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    const posts = this.postRepo.find();
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findOneBy({ id });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<void> {
    await this.postRepo.update(id, { ...updatePostDto });
    return;
  }

  async remove(id: number): Promise<void> {
    const removedPosts = this.findOne(id).then((res) => {
      this.postRepo.remove(res);
    });
    return removedPosts;
  }
}
