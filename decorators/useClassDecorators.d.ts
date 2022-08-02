import "reflect-metadata";
declare const _default: () => {
    /**
     * 数据传参对象
     * @example `@Dto`
     */
    Dto: (constructor: {
        new (): any;
    }) => void;
    /**
     * 控制器
     * @param prefix ?{string} 路由前缀
     * @example `@Controller()` `@Controller('/cats')` `@Controller('/cats/huahua')`
     */
    Controller: (prefix?: string) => (constructor: {
        new (): any;
    }) => void;
};
export default _default;
