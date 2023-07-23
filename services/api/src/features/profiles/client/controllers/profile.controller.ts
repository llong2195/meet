import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateProfileCommand } from "../../application/contracts/commands/create-profile.command";
import { UpdateProfileCommand } from "../../application/contracts/commands/update-profile.command";
import { ProfileDetails } from "../../application/contracts/dtos/profile.dto";
import { CheckIfProfileExistsQuery } from "../../application/contracts/queries/check-if-profile-exists.query";
import { GetProfileQuery } from "../../application/contracts/queries/get-profile.query";
import { GetProfilesNearbyQuery } from "../../application/contracts/queries/get-profiles-nearby.query";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentProfile(): Promise<ProfileDetails> {
    const query = new GetProfileQuery();
    return await this.queryBus.execute(query);
  }

  @Get("/exists")
  async checkIfFileExists(): Promise<boolean> {
    const query = new CheckIfProfileExistsQuery();
    return await this.queryBus.execute(query);
  }

  @Get("/nearby")
  async getProfilesNearby(): Promise<ProfileDetails[]> {
    const query = new GetProfilesNearbyQuery();
    return await this.queryBus.execute(query);
  }

  @Post("/create")
  async createCurrentProfile(
    @Body() command: CreateProfileCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post("/update")
  async updateCurrentProfile(
    @Body() command: UpdateProfileCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}