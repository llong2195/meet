import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentOrganizationService } from "src/features/organizations/domain/services/current-organization.service";
import { OrganizationMembership } from "src/features/organizations/infrastructure/entities/organization-membership.entity";

import { UpdateMemberRoleCommand } from "../../contracts/commands/update-member-role.command";

@CommandHandler(UpdateMemberRoleCommand)
export class UpdateMemberRoleHandler
  implements ICommandHandler<UpdateMemberRoleCommand, void>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(OrganizationMembership)
    private readonly memberships: Repository<OrganizationMembership>,
  ) {}

  async execute(command: UpdateMemberRoleCommand) {
    const organizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const membership = await this.memberships.findOne({
      where: {
        id: command.id,
        organizationId,
      },
    });

    if (!membership) {
      throw new NotFoundException("Membership not found");
    }

    membership.role = command.role;

    this.memberships.save(membership);
  }
}