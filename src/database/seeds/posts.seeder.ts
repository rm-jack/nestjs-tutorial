import { Injectable } from '@nestjs/common';
import { Post } from './post.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsSeeder implements Seeder {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const posts = DataFactory.createForClass(Post).generate(10);

    // Insert into the database.
    return this.postRepo.upsert(posts, []);
  }

  async drop(): Promise<any> {
    return this.postRepo.clear();
  }
}
