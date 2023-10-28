import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/features/organizations";
import { Profile } from "src/features/profiles";

@Entity()
export class Notification extends BaseEntity {
  @Column({ type: "varchar", length: 4096, default: "" })
  description!: string;

  @Column({ type: "varchar", length: 2048, default: "" })
  message!: string;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  organizationId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column()
  read!: boolean;

  @Column({
    type: "timestamp without time zone",
  })
  readAt!: Date;

  @Column({ type: "varchar", length: 2048, default: "" })
  resourcePath!: string;

  @Column({ type: "varchar", length: 256, default: "" })
  type!: string;
}
