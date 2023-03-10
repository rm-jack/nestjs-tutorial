"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const user_schema_1 = require("./user.schema");
const typeorm_1 = require("typeorm");
const nestjs_seeder_1 = require("nestjs-seeder");
let Post = class Post {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, nestjs_seeder_1.Factory)((faker) => faker.lorem.words()),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, nestjs_seeder_1.Factory)((faker) => faker.lorem.paragraph()),
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_schema_1.User, (user) => user.id),
    __metadata("design:type", user_schema_1.User)
], Post.prototype, "user", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.schema.js.map