import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { ComicoAdapterKey, IncCountersPayload } from '@app/shared'
import { CounterFragments } from '@app/shared/entities'

@Injectable()
export class CountersProxy {
  readonly logger = new Logger(CountersProxy.name)

  constructor(
    @Inject(ComicoAdapterKey.COUNTERS) readonly client: ClientProxy
  ) {}

  async inc(input: IncCountersPayload): Promise<CounterFragments> {
    this.logger.debug(`inc counters: ${input.target}`)

    try {
      return lastValueFrom(
        this.client.send<undefined, IncCountersPayload>('counters:inc', input)
      )
    } catch (e) {
      this.logger.error(`counters:inc: ${e}`)
    }
  }
}
