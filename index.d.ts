import Control from './control.js';
import KoaControl from './common/types';
import useResponseError from './hooks/useResponseError.js';
import useResult from './hooks/useResult.js';
import useClassDecorators from './decorators/useClassDecorators.js';
import useMethodDecorators from './decorators/useMethodDecorators.js';
import useParameterDecorators from './decorators/useParameterDecorators.js';
import usePropDecorators from './decorators/usePropDecorators.js';
/**
 * 控制器，含路由分发，无须再使用koa-router等路由管理中间件
 */
export default Control;
export { KoaControl, useResponseError, useResult, useClassDecorators, useMethodDecorators, useParameterDecorators, usePropDecorators };
