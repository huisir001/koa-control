import "reflect-metadata";
import type Control from '../common/types';
declare const _default: () => {
    /**
     * application/json、text/*、application/x-www-form-urlencoded, 对象
     * @param field {string} 传参字段，则只返回该字段值
     */
    Body: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * query对象
     * @param field {string} 传参字段，则只返回该字段值
     */
    Query: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * multipart/form-data, 对象, 其中不包含file
     * @param field {string} 传参字段，则只返回该字段值
     */
    Raw: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * multipart/form-data, 所有文件对象，使用`files`字段，对象格式例`{a:{},b:[{},{}]}`
     * @param field {string} 传参字段，则只返回该字段值
     */
    Files: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * param对象
     * @param field {string} 传参字段，则只返回该字段值
     */
    Params: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * cookies对象
     * @param field {string} 传参字段，则只返回该字段值
     */
    Cookies: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * headers对象
     * @param field {string} 传参字段，则只返回该字段值
     */
    Header: (field?: string) => (target: Control.Obj, key: string, index: number) => void;
    /**
     * 主机地址
     */
    Host: () => (target: Control.Obj, key: string, index: number) => void;
    /**
     * ip地址
     */
    Ip: () => (target: Control.Obj, key: string, index: number) => void;
    /**
     * 响应方法
     */
    Response: () => (target: Control.Obj, key: string, index: number) => void;
};
export default _default;
