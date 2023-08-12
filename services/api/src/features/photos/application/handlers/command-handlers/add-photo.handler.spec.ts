import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { ObjectStorageService } from "src/core/object-storage";
import { createObjectStorageServiceMock } from "src/core/object-storage/test/mocks/object-storage.service.mock";
import { CurrentProfileService } from "src/features/profiles";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { ProfilePhoto } from "../../../infrastructure/entities/profile-photo.entity";
import { AddPhotoCommand } from "../../contracts/commands/add-photo.command";
import { AddPhotoHandler } from "./add-photo.handler";

describe(AddPhotoHandler.name, () => {
  let currentProfileService: CurrentProfileService;
  let commandHandler: AddPhotoHandler;
  let objectStorageService: ObjectStorageService;
  let profilePhotos: Repository<ProfilePhoto>;

  beforeEach(() => {
    currentProfileService = { fetchCurrentProfile: jest.fn() } as any;
    objectStorageService = createObjectStorageServiceMock();
    profilePhotos = createMockRepository<ProfilePhoto>();

    commandHandler = new AddPhotoHandler(
      currentProfileService,
      objectStorageService,
      profilePhotos,
    );
  });

  describe("can add new profile photo", () => {
    it("should save new profile photo", async () => {
      const newProfile = {
        photo: Buffer.from(new ArrayBuffer(1)),
        userId: "my-user-id",
      };

      const findOneFn =
        currentProfileService.fetchCurrentProfile as unknown as jest.Mock;
      findOneFn.mockImplementation(() => ({ id: "my-profile-id" }));

      const command = map(AddPhotoCommand, newProfile);

      await commandHandler.execute(command);

      expect(profilePhotos.save).toHaveBeenCalledWith({
        objectId: "my-object-id",
        profileId: "my-profile-id",
      });
    });
  });
});
