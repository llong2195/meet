import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { QueryModule } from "src/core/query/query.module";
import { OrganizationModule } from "src/features/organizations/organization.module";
import { ProfileModule } from "src/features/profiles/profile.module";

import { CreateBlogPostHandler } from "./application/handlers/command-handlers/create-blog-post.handler";
import { UpdateBlogPostHandler } from "./application/handlers/command-handlers/update-blog-post-handler";
import { GetBlogPostsHandler } from "./application/handlers/query-handlers/get-blog-posts.handler";
import { BlogsController } from "./client/controllers/blogs.controller";
import { BlogPostService } from "./domain/services/blog-post.service";
import { BlogPost } from "./infrastructure/entities/blog-post.entity";

@Module({
  imports: [
    CqrsModule,
    OrganizationModule,
    ProfileModule,
    QueryModule,
    TypeOrmModule.forFeature([BlogPost]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogPostService,
    CreateBlogPostHandler,
    GetBlogPostsHandler,
    UpdateBlogPostHandler,
  ],
})
export class BlogsModule {}