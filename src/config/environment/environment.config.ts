import { envsafe, str, port, url, num } from 'envsafe'

export const environment = envsafe({
  CACHE_TTL: num({
    devDefault: 300,
    allowEmpty: false
  }),
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'test', 'production']
  }),
  PORT: port({
    devDefault: 8080,
    desc: 'The port the app is running on',
    example: 80
  }),
  PROJECT_ID: str({
    devDefault: 'vitorblsantos',
    allowEmpty: false
  }),
  REDIS_URL: url({
    devDefault: 'redis://127.0.0.1:6379'
  }),
  SENTRY_DSN: str({
    allowEmpty: false
  })
})
