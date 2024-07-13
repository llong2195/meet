import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { ChatConversationService } from "../../../domain/services/chat-conversation.service";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { CreateChatCommand } from "../../contracts/commands/create-chat.command";
import { CreateChatHandler } from "./create-chat-handler";

describe(CreateChatHandler.name, () => {
  let chatConversations: Repository<ChatConversation>;

  let chatConversationService: ChatConversationService;
  let commandHandler: CreateChatHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    chatConversations = createMockRepository<ChatConversation>();

    chatConversationService = new ChatConversationService(
      chatConversations,
      testSuite.eventBus,
    );

    commandHandler = new CreateChatHandler(
      chatConversationService,
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
    );
  });

  describe("execute", () => {
    it("should save new conversation", async () => {
      const command = map(CreateChatCommand, { profileIds: [] });

      await commandHandler.execute(command);

      const savedConversations = await chatConversations.find();
      expect(savedConversations).toHaveLength(1);
    });

    it("should throw if profiles not part of organization", async () => {
      const command = map(CreateChatCommand, {
        profileIds: [100],
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Profile not found in current organization",
      );
    });
  });
});
