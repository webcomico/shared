import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { ComicoAdapterKey } from '@app/shared'
import { CategoryFragments } from '@app/shared/entities'

@Injectable()
export class CategoriesProxy {
  readonly logger = new Logger(CategoriesProxy.name)

  constructor(
    @Inject(ComicoAdapterKey.CATEGORIES) readonly client: ClientProxy
  ) {}

  async getCategories(input: string[]): Promise<CategoryFragments[]> {
    try {
      return lastValueFrom(
        this.client.send<CategoryFragments[], string[]>(
          'categories:findMany',
          input
        )
      )
    } catch (e) {
      this.logger.error(`categories:findMany: ${e}`)
    }

    return []
  }
}
