import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Match } from "src/infrastructure/database/views/matches.view";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";
import { mapArray } from "src/utils/mapper";

import { GetMatchesQuery } from "../contracts/get-matches.query";
import { MatchDetails } from "../contracts/match.dto";

@QueryHandler(GetMatchesQuery)
export class GetMatchesHandler
  implements IQueryHandler<GetMatchesQuery, MatchDetails[]>
{
  constructor(
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute() {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      select: {
        id: true,
      },
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException();
    }

    const foundMatches = await this.matches.find({
      where: { profileId: profile.id },
    });

    return mapArray(MatchDetails, foundMatches, (match) => ({
      imageUrl:
        match.photoObjectId &&
        this.objectStorageService.getUrl("profile-photos", match.photoObjectId),
      lastMessage: match.lastMessage,
      name: match.name,
      profileId: match.shownProfileId,
    }));
  }
}
