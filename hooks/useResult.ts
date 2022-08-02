/*
 * @Description: 答复
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-26 11:03:01
 * @LastEditTime: 2022-07-07 16:41:49
 */

import type Control from '../common/types'

/**
 * 答复返回参数
 */
interface ISuccArgResult {
    msg?: string
    data?: any
    token?: string
}

/**
 * 答复返回参数
 */
interface IErrArgResult {
    msg?: string
    status?: any
}

export default () => {
    /**
     * 成功 
     */
    const succ = (arg: ISuccArgResult | string): Control.Result => {
        let res
        if (typeof arg == 'string') {
            res = {
                ok: 1,
                msg: arg,
            }
        } else {
            const { msg = '成功', data, token } = arg || {}
            res = {
                ok: 1,
                msg: msg,
                ...(data ? { data } : {}),
                ...(token ? { token } : {})
            }
        }
        return res
    }

    /**
     * 失败
     */
    const fail = (msg = '未知错误'): Control.Result => ({
        ok: 0,
        msg,
    })

    /**
     * 报错
     */
    const error = (arg?: IErrArgResult | string): Control.Result => {
        if (arg) {
            if (typeof arg == 'string') {
                return {
                    ok: -1,
                    status: 500,
                    msg: arg,
                }
            } else {
                return {
                    ok: -1,
                    status: arg.status || 500,
                    msg: arg.msg || '未知错误',
                }
            }
        } else {
            return {
                ok: -1,
                status: 500,
                msg: '未知错误',
            }
        }
    }


    return {
        /**
         * 成功
         */
        succ,
        /**
         * 失败
         */
        fail,
        /**
         * 出错
         */
        error
    }
}