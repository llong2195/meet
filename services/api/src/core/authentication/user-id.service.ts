import { Inject, Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { IRequestContext, REQUEST_CONTEXT_KEY } from "src/core/request-context";

import { MissingUserIdError } from "./missing-user-id.error";

@Injectable()
export class UserIdService {
  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly als: AsyncLocalStorage<IRequestContext>,
  ) {}

  getUserId() {
    const store = this.als.getStore();

    if (!store) {
      throw new MissingUserIdError(
        "Unable to obtain user ID due to missing store",
      );
    }

    return store.userId;
  }
}