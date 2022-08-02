import type Control from '../common/types';
/**
 * 答复返回参数
 */
interface ISuccArgResult {
    msg?: string;
    data?: any;
    token?: string;
}
/**
 * 答复返回参数
 */
interface IErrArgResult {
    msg?: string;
    status?: any;
}
declare const _default: () => {
    /**
     * 成功
     */
    succ: (arg: ISuccArgResult | string) => Control.Result;
    /**
     * 失败
     */
    fail: (msg?: string) => Control.Result;
    /**
     * 出错
     */
    error: (arg?: IErrArgResult | string) => Control.Result;
};
export default _default;
