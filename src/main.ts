import 'dotenv/config'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { AppModule } from '@/app.module'
import { environment } from '@/config/index.config'
import { HttpExceptionFilter } from '@/filters/index.filters'

const Bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 1048576, // 1MB
      caseSensitive: false,
      requestIdHeader: 'x-request-id'
    }),
    {
      logger:
        process.env.NODE_ENV === 'production'
          ? ['error', 'warn']
          : ['log', 'debug', 'error', 'warn']
    }
  )

  // Quando trocar a versão, precisa validar onde o cache manager
  // esta armazenando valores com a versão atual.
  const globalPrefix = 'v1'

  const config = new DocumentBuilder()
    .setTitle('Deméter - Accreditation Farm')
    .setDescription(
      'Caching Layer com Redis para os serviços de credenciamento do time de RFC'
    )
    .setVersion('0.0.1')
    .build()

  app.enableCors()
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Tech Inspect - BFF',
    swaggerUrl: 'http://127.0.0.1'
  })

  writeFileSync(resolve('./', 'swagger.json'), JSON.stringify(document))

  await app.listen(environment.PORT)

  Logger.log(
    `Application is running on: http://localhost:${environment.PORT}/${globalPrefix}`,
    'NestApplication'
  )
}

Bootstrap()
