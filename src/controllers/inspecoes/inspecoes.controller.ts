import { Controller, Get } from '@nestjs/common'

import { ServiceInspecoes } from '@/services/index.services'

@Controller()
export class ControllerInspecoes {
  constructor(private readonly service: ServiceInspecoes) {}

  @Get('/inspecoes')
  getHello(): string {
    return this.service.get()
  }
}
