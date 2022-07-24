import { PassportStrategy } from '@nestjs/passport'
import {Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-firebase-jwt'
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

@Injectable()
export class MicroAuthStrategy extends PassportStrategy(
    Strategy,
    'micro-auth'
) {
    private readonly logger = new Logger(MicroAuthStrategy.name)

    constructor(
        @Inject('AUTH_SERVICE') readonly client: ClientProxy
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(token: string) {
        const user = await lastValueFrom(this.client.send('users:verifyJWT', token))
        if (!user) {
            throw new UnauthorizedException()
        }
        this.logger.log(`User: ${user.name} has been successfully logged in`)
        return user
    }
}
