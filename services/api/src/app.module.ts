import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";

import { ClientModule } from "./client/client.module";
import { RequestContextModule } from "./client/context/request-context.module";
import { ErrorHandlingModule } from "./core/error-handling/error-handling.module";
import { HealthChecksModule } from "./core/health-checks/health-checks.module";
import { JournalModule } from "./core/journal/journal.module";
import { WingmanModule } from "./features/wingman/wingman.module";
import { dataSourceOptions } from "./infrastructure/database/data-source.config";
import { minioOptions } from "./infrastructure/objectStorage/minio.config";

@Module({
  imports: [
    ErrorHandlingModule,
    JournalModule,
    HealthChecksModule,
    ScheduleModule.forRoot(),
    RequestContextModule,
    MinioModule.register({ ...minioOptions, isGlobal: true }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    ClientModule,
    WingmanModule,
  ],
  providers: [],
})
export class AppModule {}
