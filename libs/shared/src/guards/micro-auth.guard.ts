import {ExecutionContext, Inject, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GqlExecutionContext} from "@nestjs/graphql";
import {Observable} from "rxjs";
import {Types} from "mongoose";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY, IS_TEST_USER_KEY} from "@app/shared/decorators";

@Injectable()
export class MicroAuthGuard extends AuthGuard('micro-auth') {

    constructor(readonly reflector: Reflector) {
        super()
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = this.getRequest(context)
        // Request bình thường
        if (req) {
            return super.canActivate(context)
        }
        // Subscription user
        const ctx = GqlExecutionContext.create(context).getContext()
        return !!ctx?.user
    }

    getRequest(context: ExecutionContext) {
        /**
         * nếu từ subscription thì ctx sẽ ko có req và có user
         */
        const ctx = GqlExecutionContext.create(context).getContext()
        if (ctx.isSubscription)
            return {
                headers: {
                    authorization: ctx._token
                }
            }
        return ctx.req
    }

    handleRequest(err: any, user: any, info: any, context: any, status?: any) {
        if (user) return user

        const isTestUser = this.reflector.getAllAndOverride<boolean>(
            IS_TEST_USER_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (isTestUser) {
            return {
                uid: 'awagmJPhJuNuodV99vO3mVXDDMH3',
                _id: new Types.ObjectId('62c798b92baae3f41f41dde3')
            }
        }

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (isPublic) {
            return user
        }
        return super.handleRequest(err, user, info, context, status)
    }

}
