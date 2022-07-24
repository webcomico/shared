import {ClientsModule, Transport} from "@nestjs/microservices";
import {Module} from "@nestjs/common";

export const AUTH_SERVICE = ClientsModule.register([
    {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: ['USER_RMQ=amqp://localhost:5672'],
            queue: 'users_queue',
            queueOptions: {
                durable: false
            }
        }
    }
])

@Module({
    imports: [AUTH_SERVICE]
})
export class AuthModule {}
