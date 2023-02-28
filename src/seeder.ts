import { seeder } from 'nestjs-seeder';
import { User } from './database/seeds/user.schema';
import { UsersSeeder } from './database/seeds/users.seeder';
import { PostsSeeder } from './database/seeds/posts.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './database/seeds/post.schema';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'jack',
      password: 'password',
      database: 'board',
      entities: [User, Post],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Post]),
  ],
}).run([UsersSeeder, PostsSeeder]);
