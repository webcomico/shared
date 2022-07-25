import {Global, Module} from '@nestjs/common'
import {ClientsModule, Transport} from "@nestjs/microservices";

export const AUTH_SERVICE = ClientsModule.register([
  {
    name: 'AUTH_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      }
    }
  }
])

@Global()
@Module({
  imports: [AUTH_SERVICE],
  providers: [],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
