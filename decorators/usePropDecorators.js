import "reflect-metadata";
import { PROP_GROUP_METADATA_KEY, PROP_REQUIRE_METADATA_KEY, PROP_TYPE_METADATA_KEY, PROP_DEC_METADATA_KEY } from '../common/constants.js';
/**
 * 属性装饰器
 */
export default () => {
    return {
        /**
         * 属性装饰器：必传项
         * @example `@Require`
         */
        Require: (target, key) => {
            targetVerify(target, key);
            definePropDecMetadata(target, key, 'require');
            // 暂存必传状态
            Reflect.defineMetadata(PROP_REQUIRE_METADATA_KEY, true, target, key);
        },
        /**
         * 属性装饰器：String类型绑定
         * @example `@IsString`
         */
        IsString: typeBind('String'),
        /**
         * 属性装饰器：Boolean类型绑定
         * @example `@IsBoolean`
         */
        IsBoolean: typeBind('Boolean'),
        /**
         * 属性装饰器：Number类型绑定
         * @example `@IsNumber`
         */
        IsNumber: typeBind('Number'),
        /**
         * 属性装饰器：Object类型绑定
         * @example `@IsObject`
         */
        IsObject: typeBind('Object'),
        /**
         * 属性装饰器：Array类型绑定
         * @example `@IsArray`
         */
        IsArray: typeBind('Array'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Body`
         */
        Body: dataGrouping('body'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Query`
         */
        Query: dataGrouping('query'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Param`
         */
        Param: dataGrouping('params'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Raw`
         */
        Raw: dataGrouping('raw'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Files`
         */
        Files: dataGrouping('files'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Cookie`
         */
        Cookie: dataGrouping('cookie'),
        /**
         * 属性装饰器：属性(接口传参)分组
         * 此类属性装饰器必用
         * @example `@Header`
         */
        Header: dataGrouping('header')
    };
};
/**
 * 非属性使用验证，报错
 */
function targetVerify(target, key) {
    if (typeof target[key] === 'function') {
        throw new Error('This decorator is a property decorator and can only be used for properties.');
    }
}
/**
 * 缓存装饰器信息
 */
function definePropDecMetadata(target, propertyKey, propDecKey) {
    const propDecMetadata = Reflect.getMetadata(PROP_DEC_METADATA_KEY, target, propertyKey) || [];
    if (!propDecMetadata.includes(propDecKey)) {
        propDecMetadata.push(propDecKey);
        Reflect.defineMetadata(PROP_DEC_METADATA_KEY, propDecMetadata, target, propertyKey);
    }
    else {
        // 如果已经有了，不允许多次使用
        throw new Error(`The type of \`${propDecKey}\` property decorator is already been used!`);
    }
}
/**
 * 属性（接口传参）所属分组
 * 分组包含：'body' | 'query' | 'params' | 'raw' | 'files' | 'cookie' | 'header'
 */
function dataGrouping(group) {
    return (target, key) => {
        targetVerify(target, key);
        definePropDecMetadata(target, key, 'dataGrouping');
        // 暂存分组
        Reflect.defineMetadata(PROP_GROUP_METADATA_KEY, group, target, key);
    };
}
/**
 * 类型绑定
 */
function typeBind(type) {
    return function (target, key) {
        targetVerify(target, key);
        definePropDecMetadata(target, key, 'typeBind');
        // 暂存类型
        Reflect.defineMetadata(PROP_TYPE_METADATA_KEY, type, target, key);
    };
}
//# sourceMappingURL=usePropDecorators.js.map