import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {GqlExecutionContext} from "@nestjs/graphql"
import {Request} from 'express'
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY, IS_TEST_USER_KEY} from "../decorators";
import {lastValueFrom} from "rxjs";
import {Types} from "mongoose";

declare module "express" {
    export interface Request {
        user: any
    }
}

@Injectable()
export class MicroAuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_SERVICE') readonly client: ClientProxy,
        private reflector: Reflector
    ) {
    }

    async canActivate(context: ExecutionContext) {

        const request: Request = this.getRequest(context)

        if(this.isTest(context)) {
            request.user = {
                uid: 'awagmJPhJuNuodV99vO3mVXDDMH3',
                id: '62dd6bc10c06ac62f4f6e23f',
                _id: new Types.ObjectId('62dd6bc10c06ac62f4f6e23f')
            }
            return true
        }

        request.user = await this.validate(request)

        if(this.isPublic(context)) {
            return true
        }

        return !!request.user
    }

    async validate(req: Request) {
        if (!req?.headers?.authorization) {
            return false
        }

        const _token = req.headers.authorization.split(' ')[1]

        return lastValueFrom(this.client.send('users:verifyJWT', _token))
    }

    getRequest(context: ExecutionContext): Request {
        return GqlExecutionContext.create(context).getContext().req
    }

    isTest(context: ExecutionContext) {
        return this.reflector.getAllAndOverride<boolean>(IS_TEST_USER_KEY, [
            context.getHandler(),
            context.getClass()
        ])
    }

    isPublic(context: ExecutionContext) {
        return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
    }
}

