import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/core/organizations";

import { ChatConversationMember } from "./chat-conversation-member.entity";
import { ChatConversationPhoto } from "./chat-conversation-photo.entity";
import { ChatMessage } from "./chat-message.entity";

@Entity()
export class ChatConversation extends BaseEntity {
  @OneToMany(() => ChatConversationMember, (member) => member.conversation, {
    cascade: true,
  })
  members!: ChatConversationMember[];

  @OneToMany(() => ChatMessage, (message) => message.conversation, {
    cascade: true,
  })
  messages!: ChatMessage[];

  @Column({ type: "varchar", length: 256, default: "" })
  name!: string;

  @ManyToOne(() => Organization, { onDelete: "CASCADE" })
  organization!: Organization;

  @Column()
  organizationId!: number;

  @OneToOne(() => ChatConversationPhoto, (photo) => photo.conversation)
  @JoinColumn()
  photo?: ChatConversationPhoto;

  @Column({ nullable: true })
  photoId?: string;
}
