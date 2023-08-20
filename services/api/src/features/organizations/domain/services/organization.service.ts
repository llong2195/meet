import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";
import { Organization } from "../../infrastructure/entities/organization.entity";
import { OrganizationCreatedEvent } from "../events/organization-created.event";

interface CreateOrganizationProps {
  name: string;
  ownerId: number;
  personal: boolean;
}

@Injectable()
export class OrganizationService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(OrganizationMembership)
    private readonly organizationMemberships: Repository<OrganizationMembership>,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async checkIfMember(
    profileId: number,
    organizationId: number,
  ): Promise<boolean> {
    return this.organizationMemberships.exist({
      where: { profileId, organizationId },
    });
  }

  async createOrganization(props: CreateOrganizationProps): Promise<void> {
    const organization = new Organization();

    organization.name = props.name;
    organization.personal = props.personal;

    const membership = await this.createMembership(organization, props.ownerId);
    organization.memberships = [membership];

    const createdOrganization = await this.organizations.save(organization);

    const event = map(OrganizationCreatedEvent, {
      id: createdOrganization.id,
      description: createdOrganization.description,
      name: createdOrganization.name,
    });

    this.eventBus.publish(event);
  }

  async updateOrganization(organization: Organization): Promise<void> {
    await this.organizations.save(organization);
  }

  private async createMembership(
    organization: Organization,
    profileId: number,
  ): Promise<OrganizationMembership> {
    const membership = new OrganizationMembership();

    membership.organization = organization;
    membership.profileId = profileId;

    return membership;
  }
}
