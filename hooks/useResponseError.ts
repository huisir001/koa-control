/*
 * @Description: 错误响应信息
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-26 14:09:24
 * @LastEditTime: 2022-05-26 10:47:20
 */
export default () => {
    return {
        e200(message = 'Request failed') {
            throw { message, statusCode: 200 }
        },
        /**
         * 请求错误：参数缺失、参数语法错误
         */
        e400(message = 'Bad Request') {
            throw { message, statusCode: 400 }
        },
        e401(message = 'Login timeout') {
            throw { message, statusCode: 401 }
        },
        e403(message = 'Sorry, you didn\'t log in.') {
            throw { message, statusCode: 403 }
        },
        e404(message = 'Not Found') {
            throw { message, statusCode: 404 }
        },
        e405(message = 'Method Not Allowed') {
            throw { message, statusCode: 404 }
        },
        e500(message = 'Internal server error') {
            throw { message, statusCode: 500 }
        },
        e502(message = 'Database error') {
            throw { message, statusCode: 502 }
        },
        e504(message = 'Database request timed out') {
            throw { message, statusCode: 504 }
        }
    }
}