/*
 * @Description: 类装饰器
 * @Autor: HuiSir<www.zuifengyun.com>
 * @Date: 2022-07-04 15:55:02
 * @LastEditTime: 2022-07-07 18:51:07
 */
import "reflect-metadata"
import {
    PROP_DEC_METADATA_KEY,
    METHOD_DEC_METADATA_KEY,
    CLASS_SIGN_METADATA_KEY,
    CLASS_PREFIX_METADATA_KEY
} from '../common/constants.js'

export default () => {
    return {
        /**
         * 数据传参对象
         * @example `@Dto`
         */
        Dto: (constructor: { new(): any }) => {
            const { name, prototype } = constructor

            // 验证必用装饰器
            const propertyNames = Object.getOwnPropertyNames(new constructor())

            if (propertyNames.length === 0) {
                throw new Error(`Dto \`${name}\` is no propertys!`)
            }

            propertyNames.forEach(propKey => {
                const propDecMetadata = Reflect.getMetadata(PROP_DEC_METADATA_KEY, prototype, propKey) || []
                if (!propDecMetadata.includes('dataGrouping')) {
                    throw new Error(`Prop \`${propKey}\` of Dto \`${name}\` must use the property decorator as '@Body','@Query', '@Param', '@Raw', '@Files', '@Cookie' or '@Header'!`)
                }
            })

            // 标记此类为参数对象
            Reflect.defineMetadata(CLASS_SIGN_METADATA_KEY, 'Dto', prototype, name)
        },


        /**
         * 控制器
         * @param prefix ?{string} 路由前缀
         * @example `@Controller()` `@Controller('/cats')` `@Controller('/cats/huahua')`
         */
        Controller: (prefix?: string) => {
            // 验证prefix
            if (prefix != void 0 && (typeof prefix !== 'string' || !(/^(\/\w+([A-Za-z0-9_-]+\w+)?)+$/.test(prefix)))) {
                throw new Error(`The parameter \`${prefix}\` of class decorator \`@Controller()\` is not available! Refer to the rule \`^(\/\w+([A-Za-z0-9_-]+\w+)?)+$\`.`)
            }

            return (constructor: { new(): any }) => {
                const { name, prototype } = constructor

                // 验证必用装饰器
                const propertyNames = Object.getOwnPropertyNames(prototype)

                if (propertyNames.length === 0) {
                    throw new Error(`Controller \`${name}\` is no methods!`)
                }

                propertyNames.forEach(methodKey => {
                    if (methodKey !== 'constructor') {
                        const methodDecMetadata = Reflect.getMetadata(METHOD_DEC_METADATA_KEY, prototype, methodKey) || [];
                        if (!methodDecMetadata.includes('methodRestrict')) {
                            throw new Error(`Controller method \`${methodKey}\` must use the method restrict decorator as \`@Get()\`,\`@Post()\`,\`@Put()\` or \`@Delete()\`!`);
                        }
                    }
                })

                // 标记此类为控制器
                Reflect.defineMetadata(CLASS_SIGN_METADATA_KEY, 'Controller', prototype, name)
                // 缓存前缀
                prefix && Reflect.defineMetadata(CLASS_PREFIX_METADATA_KEY, prefix, prototype, name)
            }
        }
    }
}