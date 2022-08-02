import {MicroserviceOptions, Transport} from "@nestjs/microservices"
import {ClientProviderOptions} from "@nestjs/microservices/module/interfaces/clients-module.interface";

export enum ComicoQueue {
    BOOKMARKS = 'bookmarks_queue',
    CATEGORIES = 'categories_queue',
    CHAPTERS = 'chapters_queue',
    HISTORIES = 'histories_queue',
    STORIES = 'stories_queue',
    USERS = 'users_queue',
    COUNTERS = 'counters_queue',
    REVIEWS = 'reviews_queue',
    COMMENTS = 'comments_queue'
}

export interface ComicoQueueOptions {
    queue: ComicoQueue
    urls: string | string[]
}

export const buildRMQ = ({ urls, queue }: ComicoQueueOptions): MicroserviceOptions => {
    return {
        transport: Transport.RMQ,
        options: {
            urls: typeof urls === 'string' ? [urls] : urls,
            queue,
            queueOptions: {
                durable: false
            }
        }
    }
}

export enum ComicoAdapterKey {
    BOOKMARKS = 'BOOKMARKS_SERVICE',
    CATEGORIES = 'CATEGORIES_SERVICE',
    CHAPTERS = 'CHAPTERS_SERVICE',
    HISTORIES = 'HISTORIES_SERVICE',
    STORIES = 'STORIES_SERVICE',
    USERS = 'USERS_SERVICE',
    COUNTERS = 'COUNTERS_SERVICE',
    REVIEWS = 'REVIEWS_SERVICE',
    COMMENTS = 'COMMENTS_SERVICE'
}

export type ComicoAdapterOptions = ComicoQueueOptions & {
    name: ComicoAdapterKey | string | symbol
}

export class ComicoAdapter {

    static bookmarks(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.BOOKMARKS,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.BOOKMARKS
        })
    }

    static categories(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.CATEGORIES,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.CATEGORIES
        })
    }

    static chapters(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.CHAPTERS,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.CHAPTERS
        })
    }

    static histories(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.HISTORIES,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.HISTORIES
        })
    }

    static stories(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.STORIES,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.STORIES
        })
    }

    static users(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.USERS,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.USERS
        })
    }

    static counters(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.COUNTERS,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.COUNTERS
        })
    }

    static reviews(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.REVIEWS,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.REVIEWS
        })
    }

    static comments(urls?: string | string[]): ClientProviderOptions {
        return ComicoAdapter.build({
            name: ComicoAdapterKey.COMMENTS,
            urls: urls || ['amqp://localhost:5672'],
            queue: ComicoQueue.COMMENTS
        })
    }


    static build({ name, urls, queue }: ComicoAdapterOptions): ClientProviderOptions {
       return {
           name,
           transport: Transport.RMQ,
           options: {
               urls: typeof urls === 'string' ? [urls] : urls,
               queue,
               queueOptions: {
                   durable: false
               }
           }
       }
    }
}
