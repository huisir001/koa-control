/*
 * @Description: 方法装饰器
 * @Autor: HuiSir<www.zuifengyun.com>
 * @Date: 2022-07-04 15:54:21
 * @LastEditTime: 2022-07-08 10:46:18
 */
import "reflect-metadata";
import useResponseError from '../hooks/useResponseError.js';
import { PROP_GROUP_METADATA_KEY, PROP_REQUIRE_METADATA_KEY, PROP_TYPE_METADATA_KEY, METHOD_DEC_METADATA_KEY, METHOD_DATA_CACH_METADATA_KEY, PARAMETR_METADATA_KEY, CLASS_SIGN_METADATA_KEY, METHOD_PATH_METADATA_KEY } from '../common/constants.js';
const { e400, e405 } = useResponseError();
export default () => {
    return {
        /**
         * 请求方式:GET
         * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
         * @example `@Get('/user')` `@Get('/user/:cat/:id')`
         */
        Get: methodRestrict('GET'),
        /**
         * 请求方式:Post
         * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
         * @example `@Post('/user')` `@Post('/user/:cat/:id')`
         */
        Post: methodRestrict('POST'),
        /**
         * 请求方式:Put
         * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
         * @example `@Put('/user')` `@Put('/user/:cat/:id')`
         */
        Put: methodRestrict('PUT'),
        /**
         * 请求方式:Delete
         * @param path {string|RegExp} path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
         * @example `@Delete('/user')` `@Delete('/user/:cat/:id')`
         */
        Delete: methodRestrict('DELETE'),
        /**
         * @description: 参数绑定
         * @param Dto {Control.Dto} 传参类
         * @author: HuiSir
         * @example `@Bind(Dto:Control.Dto)`
         */
        Bind: (Dto) => {
            const { name, prototype } = Dto;
            const classSign = Reflect.getMetadata(CLASS_SIGN_METADATA_KEY, prototype, name);
            // 非Dto类报错
            if (!classSign || classSign !== 'Dto') {
                throw new Error(`Class \`${name}\` is not a Dto class, please use the class decorator \`@Dto\`!`);
            }
            return (target, propertyKey, desc) => {
                // 验证
                targetVerify(desc);
                // 缓存装饰器信息
                defineMethodDecMetadata(target, propertyKey, 'bind');
                // 修改原方法
                let curr = desc.value;
                desc.value = (mydata) => {
                    // 读取data
                    const data = defineDataCach(target, propertyKey, mydata, 'bind');
                    // 遍历属性类
                    const propertyNames = Object.getOwnPropertyNames(new Dto());
                    for (let prop of propertyNames) {
                        // 获取所属分组
                        const groupKey = Reflect.getMetadata(PROP_GROUP_METADATA_KEY, prototype, prop);
                        // 没有配置分组
                        if (!groupKey) {
                            e400(`Parameter '${prop}' is not grouped!`);
                        }
                        // 必填状态
                        const requireStatus = Reflect.getMetadata(PROP_REQUIRE_METADATA_KEY, prototype, prop) || false;
                        // 类型获取
                        const propType = Reflect.getMetadata(PROP_TYPE_METADATA_KEY, prototype, prop);
                        // 必填项验证
                        if (requireStatus) {
                            if (groupKey === 'cookie') {
                                if (data.cookies.get(prop) == void 0) {
                                    e400(`Cookie '${prop}' is required!`);
                                }
                            }
                            else if (!data[groupKey] || data[groupKey][prop] == void 0) {
                                e400(`Parameter '${prop}' is required!`);
                            }
                        }
                        // 类型错误验证
                        if (propType && groupKey != 'cookie' && data[groupKey] && data[groupKey][prop] != void 0 && data[groupKey][prop].constructor.name !== propType) {
                            e400(`The parameter type of '${prop}' is wrong! Expected ${propType}, Actually ${data[groupKey][prop].constructor.name}.`);
                        }
                    }
                    return curr.apply(target, argumentsReset(target, propertyKey, data));
                };
            };
        }
    };
};
/**
 * 非方法使用验证，报错
 */
function targetVerify(desc) {
    if (desc == void 0 || !desc.value || typeof desc.value !== 'function') {
        throw new Error('This decorator is a method decorator and can only be used for methods.');
    }
}
/**
 * 缓存装饰器信息
 */
function defineMethodDecMetadata(target, propertyKey, methodDecKey) {
    const methodDecMetadata = Reflect.getMetadata(METHOD_DEC_METADATA_KEY, target, propertyKey) || [];
    if (!methodDecMetadata.includes(methodDecKey)) {
        methodDecMetadata.push(methodDecKey);
        Reflect.defineMetadata(METHOD_DEC_METADATA_KEY, methodDecMetadata, target, propertyKey);
    }
    else {
        // 如果已经有了，不允许多次使用
        throw new Error(`The type of \`${methodDecKey}\` method decorator is already been used!`);
    }
}
/**
 * 缓存参数DATA
 * 由于修改方法之后，参数会改变，所以这里需要缓存一下原始参数
 */
function defineDataCach(target, propertyKey, data, key) {
    let dataCach = Reflect.getMetadata(METHOD_DATA_CACH_METADATA_KEY, target, propertyKey);
    if (!dataCach || dataCach.key === key) {
        Reflect.defineMetadata(METHOD_DATA_CACH_METADATA_KEY, { data, key }, target, propertyKey);
        dataCach = { data, key };
    }
    return dataCach.data;
}
/**
 * 参数重置
 * 根据参数装饰器对方法参数进行重置
 */
function argumentsReset(target, key, data) {
    // 获取参数装饰器元信息
    const parametersMetadata = Reflect.getMetadata(PARAMETR_METADATA_KEY, target, key);
    if (parametersMetadata) {
        return parametersMetadata.map(({ groupKey, field }) => {
            if (groupKey === 'cookies') {
                return field ? data.cookies.get(field) : data.cookies;
            }
            else {
                return field && data[groupKey] ? data[groupKey][field] : data[groupKey];
            }
        });
    }
    else {
        return [data];
    }
}
/**
 * 方法验证
 * 此装饰器必用
 */
function methodRestrict(m) {
    /**
     * 请求方式
     * @param path path参数，与Koa-router中`get()`、`post()`等方法中的path参数类型一致
     * @example `@Get('/userInfo')` `@Get('/userInfo/:id')` `@Post('/file/:cat/:id')`
     */
    return (path) => {
        return (target, propertyKey, desc) => {
            // 验证
            targetVerify(desc);
            // 缓存装饰器信息
            defineMethodDecMetadata(target, propertyKey, 'methodRestrict');
            // 缓存path参数,用于koa-router分发
            Reflect.defineMetadata(METHOD_PATH_METADATA_KEY, path, target, propertyKey);
            // 修改原方法
            let curr = desc.value;
            desc.value = (mydata) => {
                // 读取data
                const data = defineDataCach(target, propertyKey, mydata, 'methodRestrict');
                if (data.method.toUpperCase() !== m) {
                    e405();
                }
                return curr.apply(target, argumentsReset(target, propertyKey, data));
            };
        };
    };
}
//# sourceMappingURL=useMethodDecorators.js.map