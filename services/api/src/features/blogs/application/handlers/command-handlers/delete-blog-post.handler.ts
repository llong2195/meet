import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/features/profiles";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { DeleteBlogPostCommand } from "../../contracts/commands/delete-blog-post.command";

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler
  implements ICommandHandler<DeleteBlogPostCommand, void>
{
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly currentProfileId: CurrentProfileService,
  ) {}

  async execute(command: DeleteBlogPostCommand) {
    const currentProfileId =
      await this.currentProfileId.fetchCurrentProfileId();

    const blogPost = await this.blogPosts.findOne({
      where: {
        id: command.id,
        profileId: currentProfileId,
      },
    });

    if (!blogPost) {
      throw new NotFoundException("Blog post not found");
    }

    // TODO: Handle removal and cleanup of blog photos
    await this.blogPosts.remove(blogPost);
  }
}
