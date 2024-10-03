import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { environment } from './src/config/index.config'

Sentry.init({
  dsn: environment.SENTRY_DSN,
  environment: 'production',
  release: 'tech-inspect-bff@1.0.0',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1,
  profilesSampleRate: 1
})

Sentry.setTag('app-name', 'tech-inspect-bff')
