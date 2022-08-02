/*
 * @Description: 常量申明
 * @Autor: HuiSir<www.zuifengyun.com>
 * @Date: 2022-07-04 16:53:44
 * @LastEditTime: 2022-07-07 11:32:59
 */
// class元数据key
// 属性装饰器：传参分组 'body' | 'query' | 'params' | 'raw' | 'files' | 'cookie' | 'header'
export const PROP_GROUP_METADATA_KEY = Symbol("PROP_GROUP");
// 属性装饰器：是否必传
export const PROP_REQUIRE_METADATA_KEY = Symbol("PROP_REQUIRE");
// 属性装饰器：参数数据类型
export const PROP_TYPE_METADATA_KEY = Symbol("PROP_TYPE");
// 参数装饰器
export const PARAMETR_METADATA_KEY = Symbol("PARAMETR");
// 方法装饰器使用检测
export const METHOD_DEC_METADATA_KEY = Symbol("METHOD_DEC");
// 方法装饰器：data整体缓存
export const METHOD_DATA_CACH_METADATA_KEY = Symbol("METHOD_DATA_CACH");
// 方法装饰器：缓存方法路由PATH
export const METHOD_PATH_METADATA_KEY = Symbol("METHOD_PARAMKEYARR");
// 属性装饰器使用检测
export const PROP_DEC_METADATA_KEY = Symbol("PROP_DEC");
// 类装饰器：类标识
export const CLASS_SIGN_METADATA_KEY = Symbol("CLASS_SIGN");
// 类装饰器：控制器路径前缀
export const CLASS_PREFIX_METADATA_KEY = Symbol("CLASS_PREFIX");
//# sourceMappingURL=constants.js.map