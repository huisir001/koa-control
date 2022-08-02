# koa-control

> A koa2 front-end and back-end separate interface development middleware based on the decorator.       

> !!!Note: must be written in typescript to support decorators.      

> Built-in router and bodyparser related functions, no need to install middleware such as `koa- router` and `koa-body`.      

> Related dependencies: [koa-router](https://www.npmjs.com/package/koa-router), [koa-body-2](https://www.npmjs.com/package/koa-body-2), you can go to view the relevant documentation.        

## Install
> Install with [npm](https://github.com/npm/npm)        

```sh
npm install koa koa-control
```

## Example

```ts
// controller/dto/index.ts
import { useClassDecorators, usePropDecorators, type KoaControl } from 'koa-control'

const { Dto } = useClassDecorators()
const { Require, Body, Files, Param, IsString } = usePropDecorators()

@Dto
export class SignupDto {
    @Require
    @Body
    @IsString
    username: string

    @Require
    @Body
    @IsString
    password: string
}

@Dto
export class TestDto {
    @Require
    @Param
    id: string

    @Require
    @Files
    file: KoaControl.File

    @Require
    @Raw
    md5: string
}
```

```ts
// controller/User.ts
import {
    useResult,
    useResponseError,
    useClassDecorators,
    useMethodDecorators,
    useParameterDecorators,
    type KoaControl
} from 'koa-control'
import { SignupDto, TestDto } from './dto/index.js'
const { succ } = useResult()
const { Controller } = useClassDecorators()
const { Bind, Post } = useMethodDecorators()
const { Body, Params, Files, Raw } = useParameterDecorators()

@Controller()
export default class User {

    @Post('/signup')
    @Bind(SignupDto)
    async signup(@Body() body: SignupDto) {
        const { username, password } = body

        // CURD of the database can be done here.

        // Return the result to the front end
        return succ({ data: { username }, msg: 'success' })
    }

    @Get('/test/:id')
    @Bind(TestDto)
    async test(@Params('id') id: TestDto['id'], @Files('file') file: TestDto['file'], @Raw('md5') md5: TestDto['md5']) {
        // ...
    }
}
```

```ts
// main.ts
import Koa from 'koa'
import control from 'koa-control'
import User from './controller/User.js'

const app = new Koa();

app.use(koaControl(app, {
    // controller: [User], // Multiple controllers can use arrays
    controller: User,
    bodyParserOpts: { multipart: true }
}))

app.listen(8080);
```

> For more usage, please refer to: https://gitee.com/huisir001/koa-ts-micro-service-cli/tree/master/http-services/service-file      