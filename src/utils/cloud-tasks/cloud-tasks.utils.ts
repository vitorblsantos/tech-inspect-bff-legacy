import { v2 } from '@google-cloud/tasks'
import { google } from '@google-cloud/tasks/build/protos/protos'
import { InternalServerErrorException } from '@nestjs/common'
import { environment } from '../../config/index.config'

const { CloudTasksClient } = v2

const client = new CloudTasksClient()

const location = 'southamerica-east1'
const project = environment.PROJECT_ID

export const createQueue = async (name: string) => {
  try {
    const [queue] = await client.createQueue({
      parent: client.locationPath(project, location),
      queue: {
        name: client.queuePath(project, location, name),
        retryConfig: { maxAttempts: 6, minBackoff: { seconds: 300 } },
        rateLimits: { maxConcurrentDispatches: 5, maxDispatchesPerSecond: 10 },
        state: 'RUNNING'
      }
    })

    return queue
  } catch (err) {
    // 6 - Queue already exists
    if (err.code === 6) return getQueue(name)

    throw new InternalServerErrorException(err)
  }
}

export const createTask = async (
  request: google.cloud.tasks.v2.ICreateTaskRequest
) => {
  try {
    return await client.createTask(request)
  } catch (err) {
    throw new InternalServerErrorException(err)
  }
}

export const getQueue = async (name: string) => {
  const [queue] = await client.getQueue({
    name: client.queuePath(project, location, name)
  })

  return queue
}
