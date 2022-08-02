import type Koa from 'Koa';
import { type bodyParser } from 'koa-body-2';
import type Control from './common/types';
interface IControlOpts {
    controller: Control.Controller | Control.Controller[];
    bodyParserOpts?: bodyParser.IOptions;
}
/**
 * 控制器，含路由分发，无须再使用koa-router等路由管理中间件
 */
declare const _default: (app: Koa<Koa.DefaultState, Koa.DefaultContext>, { controller, bodyParserOpts }: IControlOpts) => Koa.Middleware<Promise<void>>;
export default _default;
