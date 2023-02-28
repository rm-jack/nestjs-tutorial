import { Post } from './post.schema';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Factory } from 'nestjs-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Factory((faker) => faker.name.fullName())
  @Column()
  name: string;

  @Factory((faker) => faker.random.numeric())
  @Column()
  age: number;

  @Factory((faker) => faker.internet.email())
  @Column()
  email: string;

  @Factory((faker) => faker.internet.password())
  @Column()
  password: string;

  @Factory((faker) => faker.date.past(10, '2020-01-01T00:00:00.000Z'))
  @Column()
  createdAt: Date;

  @Factory((faker) =>
    faker.date.between('2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
  )
  @Column()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
