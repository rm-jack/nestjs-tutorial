"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const user_schema_1 = require("./database/seeds/user.schema");
const users_seeder_1 = require("./database/seeds/users.seeder");
const posts_seeder_1 = require("./database/seeds/posts.seeder");
const typeorm_1 = require("@nestjs/typeorm");
const post_schema_1 = require("./database/seeds/post.schema");
(0, nestjs_seeder_1.seeder)({
    imports: [
        typeorm_1.TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'jack',
            password: 'password',
            database: 'board',
            entities: [user_schema_1.User, post_schema_1.Post],
            synchronize: true,
            autoLoadEntities: true,
        }),
        typeorm_1.TypeOrmModule.forFeature([user_schema_1.User, post_schema_1.Post]),
    ],
}).run([users_seeder_1.UsersSeeder, posts_seeder_1.PostsSeeder]);
//# sourceMappingURL=seeder.js.map