/*
 * @Description: 控制器分发
 * @Autor: HuiSir<www.zuifengyun.com>
 * @Date: 2022-05-25 13:48:57
 * @LastEditTime: 2022-07-22 18:22:26
 */
import type Koa from 'Koa'
import Router from '@koa/router'
import koaBody2, { type bodyParser } from 'koa-body-2'
import type Control from './common/types'
import useResponseError from './hooks/useResponseError.js'
import {
    CLASS_PREFIX_METADATA_KEY,
    CLASS_SIGN_METADATA_KEY,
    METHOD_PATH_METADATA_KEY
} from "./common/constants.js"

const { e404 } = useResponseError()

interface IControlOpts {
    controller: Control.Controller | Control.Controller[]
    bodyParserOpts?: bodyParser.IOptions
}

/**
 * 控制器，含路由分发，无须再使用koa-router等路由管理中间件
 */
export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>, { controller, bodyParserOpts }: IControlOpts): Koa.Middleware<Promise<void>> => {
    // 路由中转
    const routerBus = new Router()

    // 缓存路径验证
    const fullRoutePathsTemp: string[] = []

    // 验证控制器
    const controllers = Array.isArray(controller) ? controller : [controller]

    // 验证非空
    if (!controllers.length) {
        throw new Error(`Parameter 'Controller' cannot be an empty array!`)
    }

    controllers.forEach((Contro, index) => {
        const { name, prototype } = Contro

        // 非构造函数报错
        if (!(name && prototype)) {
            throw new Error(`Uncaught TypeError: The index of the ${index}'th parameter '${Contro}' is not a controller!`)
        }

        // 非Controller类报错
        const classSign = Reflect.getMetadata(CLASS_SIGN_METADATA_KEY, prototype, name)
        if (!classSign || classSign !== 'Controller') {
            throw new Error(`Class \`${name}\` is not a controller class, please use the class decorator \`@Controller()\`!`)
        }

        // 前缀
        const prefix = Reflect.getMetadata(CLASS_PREFIX_METADATA_KEY, prototype, name)

        // 实例化路由
        const router = new Router({
            ...(prefix ? { prefix } : {})
        })

        // 路径检测
        Object.getOwnPropertyNames(prototype).forEach((methodKey) => {
            if (methodKey !== 'constructor') {
                const path = Reflect.getMetadata(METHOD_PATH_METADATA_KEY, prototype, methodKey)
                const fullRoutePath = `${prefix || ''}${path}`
                // 检测是否有相同的路径
                if (fullRoutePathsTemp.includes(fullRoutePath)) {
                    throw new Error(`Already have the same path '${path}' in the current or the other controller!`)
                }
                // 缓存
                fullRoutePathsTemp.push(fullRoutePath)

                // 路由分发
                router.all(path, async (ctx) => {
                    // 参数整理
                    const { request, cookies: _cookies, response: _response } = ctx
                    const { method, header, body, query, raw, files, host, ip } = request
                    const params = ctx.params
                    const cookies = {
                        get: _cookies.get.bind(_cookies),
                        set: _cookies.set.bind(_cookies)
                    }
                    const response = {
                        redirect: _response.redirect.bind(_response),
                        attachment: _response.attachment.bind(_response),
                        set: _response.set.bind(_response),
                        append: _response.append.bind(_response),
                        remove: _response.remove.bind(_response),
                        flushHeaders: _response.flushHeaders.bind(_response),
                    }

                    const Data: Control.Data = {
                        params,
                        raw,
                        files,
                        method,
                        header,
                        response,
                        cookies,
                        query,
                        body,
                        host,
                        ip,
                    }

                    const fn = prototype[methodKey].bind(prototype)

                    if (!fn || typeof fn !== 'function') {
                        e404()
                    } else {
                        ctx.body = await fn(Data)
                    }
                })

            }
        })

        // 中转挂载
        routerBus.use(router.routes(), router.allowedMethods())
    })

    app
        // bodyParser
        .use(koaBody2(bodyParserOpts))
        // 路由挂载
        .use(routerBus.routes()).use(routerBus.allowedMethods())

    return async (_ctx, next) => {
        // 继续
        await next()
    }
}