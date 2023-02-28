import { User } from './user.schema';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Factory((faker) => faker.lorem.words())
  @Column({ length: 100 })
  title: string;
  @Factory((faker) => faker.lorem.paragraph())
  @Column({ length: 2000 })
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
