import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { ComicoAdapterKey } from '@app/shared'
import { StoryFragments } from '@app/shared/entities'

@Injectable()
export class StoriesProxy {
  readonly logger = new Logger(StoriesProxy.name)

  constructor(@Inject(ComicoAdapterKey.STORIES) readonly client: ClientProxy) {}

  async findOne(id: string): Promise<StoryFragments | void> {
    try {
      return lastValueFrom(
        this.client.send<StoryFragments, string>('stories:findOne', id)
      )
    } catch (e) {
      this.logger.error(`stories:findOne: ${e}`)
    }
  }
}
