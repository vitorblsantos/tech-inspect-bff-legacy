import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SentryModule } from '@sentry/nestjs/setup'

import { ModuleInspecoes } from './modules/index.modules'
import { ControllerInspecoes } from './controllers/index.controllers'

@Module({
  controllers: [ControllerInspecoes],
  imports: [HttpModule, ModuleInspecoes, SentryModule.forRoot()]
})
export class AppModule {}
