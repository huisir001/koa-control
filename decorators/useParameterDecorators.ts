/*
 * @Description: 参数装饰器
 * @Autor: HuiSir<www.zuifengyun.com>
 * @Date: 2022-07-05 09:56:41
 * @LastEditTime: 2022-07-07 17:53:40
 */
import "reflect-metadata"
import type Control from '../common/types'
import { PARAMETR_METADATA_KEY } from '../common/constants.js'

export default () => {
    return {
        /**
         * application/json、text/*、application/x-www-form-urlencoded, 对象
         * @param field {string} 传参字段，则只返回该字段值
         */
        Body: parametersDefine('body'),
        /**
         * query对象
         * @param field {string} 传参字段，则只返回该字段值
         */
        Query: parametersDefine('query'),
        /**
         * multipart/form-data, 对象, 其中不包含file
         * @param field {string} 传参字段，则只返回该字段值
         */
        Raw: parametersDefine('raw'),
        /**
         * multipart/form-data, 所有文件对象，使用`files`字段，对象格式例`{a:{},b:[{},{}]}`
         * @param field {string} 传参字段，则只返回该字段值
         */
        Files: parametersDefine('files'),
        /**
         * param对象
         * @param field {string} 传参字段，则只返回该字段值
         */
        Params: parametersDefine('params'),
        /**
         * cookies对象
         * @param field {string} 传参字段，则只返回该字段值
         */
        Cookies: parametersDefine('cookies'),
        /**
         * headers对象
         * @param field {string} 传参字段，则只返回该字段值
         */
        Header: parametersDefine('header'),
        /**
         * 主机地址
         */
        Host: parametersDefine('host'),
        /**
         * ip地址
         */
        Ip: parametersDefine('ip'),
        /**
         * 响应方法
         */
        Response: parametersDefine('response')
    }
}

/**
 * 非参数使用验证，报错
 */
function targetVerify(index: number) {
    if (index == void 0 || typeof index != 'number') {
        throw new Error('This decorator is a parameter decorator and can only be used for parameters.')
    }
}

/**
 * 缓存参数信息
 */
function parametersDefine(groupKey: 'body' | 'query' | 'params' | 'raw' | 'files' | 'cookies' | 'header'): (field?: string) =>
    (target: Control.Obj, key: string, index: number) => void
function parametersDefine(groupKey: 'host' | 'ip' | 'response'): () =>
    (target: Control.Obj, key: string, index: number) => void
function parametersDefine(
    groupKey: 'body' | 'query' | 'params' | 'raw' | 'files' | 'cookies' | 'header' | 'host' | 'ip' | 'response') {

    if (['host', 'ip', 'response'].includes(groupKey)) {
        return () => {
            return (target: Control.Obj, key: string, index: number) => {
                targetVerify(index)
                const parametersMetadata = Reflect.getMetadata(PARAMETR_METADATA_KEY, target, key) || []
                parametersMetadata[index] = { groupKey }
                Reflect.defineMetadata(PARAMETR_METADATA_KEY, parametersMetadata, target, key)
            }
        }
    }

    return (field?: string) => {
        return (target: Control.Obj, key: string, index: number) => {
            targetVerify(index)
            const parametersMetadata = Reflect.getMetadata(PARAMETR_METADATA_KEY, target, key) || []
            parametersMetadata[index] = { groupKey, field }
            Reflect.defineMetadata(PARAMETR_METADATA_KEY, parametersMetadata, target, key)
        }
    }
}