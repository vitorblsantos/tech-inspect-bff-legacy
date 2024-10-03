import { Injectable } from '@nestjs/common'

@Injectable()
export class ServiceInspecoes {
  public get(): string {
    return 'Hello World!'
  }
}
