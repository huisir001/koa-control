/*
 * @Description: types
 * @Autor: HuiSir<www.zuifengyun.com>
 * @Date: 2022-06-27 10:57:24
 * @LastEditTime: 2022-07-21 16:13:06
 */
import { type IncomingHttpHeaders } from 'node:http'
import type ReqCookies from 'cookies'
import * as contentDisposition from 'content-disposition'
import { type bodyParser } from 'koa-body-2'

/**
 * Koa路由转发控制器
 */
declare namespace Control {
    /**
     * 可引索对象
     */
    export interface Obj extends Object {
        [key: string]: any
    }

    /**
     * 文件存储对象
     */
    export type File = bodyParser.File

    /**
     * 多文件
     */
    export type Files = bodyParser.Files

    /**
     * cookie方法
     */
    export interface Cookies {
        /**
         * This extracts the cookie with the given name
         * from the Cookie header in the request.
         * If such a cookie exists, its value is returned. Otherwise, nothing is returned.
         */
        get: (name: string, opts?: ReqCookies.GetOption) => string
        /**
         * This sets the given cookie in the response and returns
         * the current context to allow chaining.If the value is omitted,
         * an outbound header with an expired date is used to delete the cookie.
         */
        set: (name: string, value?: string | null, opts?: ReqCookies.SetOption) => void
    }

    /**
     * Response方法
     */
    export interface Response {
        /**
         * Perform a 302 redirect to `url`.
         *
         * The string "back" is special-cased
         * to provide Referrer support, when Referrer
         * is not present `alt` or "/" is used.
         *
         * Examples:
         *
         *    this.redirect('back');
         *    this.redirect('back', '/index.html');
         *    this.redirect('/login');
         *    this.redirect('http://google.com');
         */
        redirect(url: string, alt?: string): void;

        /**
         * Set Content-Disposition to "attachment" to signal the client to prompt for download.
         * Optionally specify the filename of the download and some options.
         */
        attachment(filename?: string, options?: contentDisposition.Options): void;

        /**
         * Set header `field` to `val`, or pass
         * an object of header fields.
         *
         * Examples:
         *
         *    this.set('Foo', ['bar', 'baz']);
         *    this.set('Accept', 'application/json');
         *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
         */
        set(field: { [key: string]: string | string[] }): void;
        set(field: string, val: string | string[]): void;

        /**
         * Append additional header `field` with value `val`.
         *
         * Examples:
         *
         * ```
         * this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
         * this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
         * this.append('Warning', '199 Miscellaneous warning');
         * ```
         */
        append(field: string, val: string | string[]): void;

        /**
         * Remove header `field`.
         */
        remove(field: string): void;

        /**
         * Flush any set headers, and begin the body
         */
        flushHeaders(): void;
    }

    /**
     * 传参数据
     */
    export interface Data {
        /**
         * Request method
         */
        method: string
        /**
         * API链接参数
         */
        params?: Obj
        /**
         * GET Query 参数
         */
        query?: Obj
        /**
         * json、text/*、application/x-www-form-urlencoded
         */
        body?: Obj
        /**
         * multipart/form-data，不含file
         */
        raw?: Obj
        /**
         * multipart/form-data 中的文件
         */
        files?: Files

        /**
         * header
         */
        header?: IncomingHttpHeaders

        /**
         * ctx.ip
         */
        ip?: string

        /**
         * ctx.host
         */
        host?: string

        /**
         * cookies
         */
        cookies: Cookies

        /**
         * Response methods
         */
        response: Response
    }

    /**
     * 数据传参对象
     */
    export interface Dto {
        new(): Object
    }

    /**
     * Controller类
     */
    export interface Controller {
        new(): Object
    }

    /**
     * 返回结果
     */
    export interface Result {
        ok: 0 | 1 | -1 | number // 成功1，失败0，报错-1
        msg: string //提示信息
        status?: 200 | 401 | 403 | 404 | 500 | 502 | 504 | number
        data?: any
    }

    /**
     * 抛出錯誤
     */
    export interface ResErrCatch {
        message: string
        statusCode: 200 | 301 | 400 | 401 | 403 | 404 | 500 | 502 | 504
    }
}

export default Control