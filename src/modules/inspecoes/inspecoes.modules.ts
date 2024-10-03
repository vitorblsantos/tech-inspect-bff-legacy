import { Module } from '@nestjs/common'

import { ControllerInspecoes } from '../../controllers/index.controllers'
import { ServiceInspecoes } from '../../services/index.services'

@Module({
  controllers: [ControllerInspecoes],
  exports: [ServiceInspecoes],
  providers: [ServiceInspecoes]
})
export class ModuleInspecoes {}
