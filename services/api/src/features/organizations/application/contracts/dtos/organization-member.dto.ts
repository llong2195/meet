import { OrganizationMembershipRole } from "../../../infrastructure/entities/organization-membership.entity";

export class OrganizationMemberDetails {
  joinedAt!: string;
  name!: string;
  imageUrl?: string;
  profileId!: number;
  role!: OrganizationMembershipRole;
}
