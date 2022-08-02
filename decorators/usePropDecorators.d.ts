import type Control from '../common/types';
import "reflect-metadata";
/**
 * 属性装饰器
 */
declare const _default: () => {
    /**
     * 属性装饰器：必传项
     * @example `@Require`
     */
    Require: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：String类型绑定
     * @example `@IsString`
     */
    IsString: (target: Control.Obj, key: string) => void;
    /**
     * 属性装饰器：Boolean类型绑定
     * @example `@IsBoolean`
     */
    IsBoolean: (target: Control.Obj, key: string) => void;
    /**
     * 属性装饰器：Number类型绑定
     * @example `@IsNumber`
     */
    IsNumber: (target: Control.Obj, key: string) => void;
    /**
     * 属性装饰器：Object类型绑定
     * @example `@IsObject`
     */
    IsObject: (target: Control.Obj, key: string) => void;
    /**
     * 属性装饰器：Array类型绑定
     * @example `@IsArray`
     */
    IsArray: (target: Control.Obj, key: string) => void;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Body`
     */
    Body: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Query`
     */
    Query: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Param`
     */
    Param: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Raw`
     */
    Raw: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Files`
     */
    Files: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Cookie`
     */
    Cookie: (target: Control.Obj, key: string) => any;
    /**
     * 属性装饰器：属性(接口传参)分组
     * 此类属性装饰器必用
     * @example `@Header`
     */
    Header: (target: Control.Obj, key: string) => any;
};
export default _default;
