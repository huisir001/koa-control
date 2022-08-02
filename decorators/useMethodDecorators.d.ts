import "reflect-metadata";
import type Control from '../common/types';
declare const _default: () => {
    /**
     * 请求方式:GET
     * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
     * @example `@Get('/user')` `@Get('/user/:cat/:id')`
     */
    Get: (path: string | RegExp) => (target: Control.Obj, propertyKey: string, desc: PropertyDescriptor) => void;
    /**
     * 请求方式:Post
     * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
     * @example `@Post('/user')` `@Post('/user/:cat/:id')`
     */
    Post: (path: string | RegExp) => (target: Control.Obj, propertyKey: string, desc: PropertyDescriptor) => void;
    /**
     * 请求方式:Put
     * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
     * @example `@Put('/user')` `@Put('/user/:cat/:id')`
     */
    Put: (path: string | RegExp) => (target: Control.Obj, propertyKey: string, desc: PropertyDescriptor) => void;
    /**
     * 请求方式:Delete
     * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
     * @example `@Delete('/user')` `@Delete('/user/:cat/:id')`
     */
    Delete: (path: string | RegExp) => (target: Control.Obj, propertyKey: string, desc: PropertyDescriptor) => void;
    /**
     * @description: 参数绑定
     * @param Dto {Control.Dto} 传参类
     * @author: HuiSir
     * @example `@Bind(Dto:Control.Dto)`
     */
    Bind: (Dto: Control.Dto) => (target: Control.Obj, propertyKey: string, desc: PropertyDescriptor) => void;
};
export default _default;
