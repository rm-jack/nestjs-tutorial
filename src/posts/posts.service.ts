import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    this.postRepo = postRepo;
  }

  async create(createPostDto: CreatePostDto): Promise<void> {
    const post = this.postRepo.create(createPostDto);
    const newPost = await this.postRepo.save(post);
    console.log(createPostDto.userId);
    let author = null;
    try {
      author = await this.userRepo.findOne({
        where: { id: createPostDto.userId },
        relations: ['posts'],
      });
      if (author === null) throw new BadRequestException();
    } catch (error) {
      console.log(error);
    }
    if (author) {
      author.posts.push(newPost);
      await this.userRepo.save(author);
      return null;
    }
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
