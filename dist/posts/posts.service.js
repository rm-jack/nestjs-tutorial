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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
let PostsService = class PostsService {
    constructor(postRepo, userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }
    async create(createPostDto) {
        const post = this.postRepo.create(createPostDto);
        const newPost = await this.postRepo.save(post);
        console.log(createPostDto.userId);
        let author = null;
        try {
            author = await this.userRepo.findOne({
                where: { id: createPostDto.userId },
                relations: ['posts'],
            });
            if (author === null)
                throw new common_1.BadRequestException();
        }
        catch (error) {
            console.log(error);
        }
        if (author) {
            author.posts.push(newPost);
            await this.userRepo.save(author);
            return null;
        }
    }
    async findAll() {
        const posts = this.postRepo.find();
        return posts;
    }
    async findOne(id) {
        const post = await this.postRepo.findOneBy({ id });
        return post;
    }
    async update(id, updatePostDto) {
        await this.postRepo.update(id, Object.assign({}, updatePostDto));
        return;
    }
    async remove(id) {
        const removedPosts = this.findOne(id).then((res) => {
            this.postRepo.remove(res);
        });
        return removedPosts;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map