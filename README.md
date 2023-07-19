# nav-website

## 目录结构
```
├── public 公共文件目录
├── serve express服务器
│   ├── common 图片资源
│   ├── config 配置文件
│   ├── public 资源目录
│   ├── rotuer express路由文件
│   ├── util 工具类
│   ├── serve.js express入口文件
│   ├── dict.json 字典数据
│   └── website.json 导航数据
├── src
│   ├── api 接口api
│   ├── assets 静态资源存放目录，打包时会对该目录下的文件压缩
│   ├── components 公共组件
│   ├── libs 第三方文件
│   ├── network http请求
│   ├── router 路由管理目录
│   ├── utils 工具类
│   └── views 页面组件
│   ├── App.vue vue根组件
│   ├── main.ts vue入口文件，加载各种公共组件，及第三方资源
├── .prettierrc.js 代码风格
├── babel.config.js
├── package-lock.json 描述 node_modules 文件中所有模块的版本信息，模块来源及依赖的小版本信息。
├── package.json 项目配置文件，包含基本信息，包依赖信息等
├── README.md 项目说明，包括项目如何启动、构建
├── tsconfig.json ts配置文件
└── vue.config.js 是一个可选的配置文件，包含了大部分的vue项目配置
```
## 环境搭建
1. 安装nodejs@12.18.3[下载地址](http://nodejs.cn/download/)，安装教程自行百度。
2. 从gitlab上clone项目

## Project setup
下列命令需要在项目根目录下执行
### 安装依赖
```
npm install
```

### 启动node服务
```
npm run serve:express
```

### 启动vue开发环境服务
```
npm run serve
```

### 构建vue生产环境
```
npm run build
```

### 执行代码检查
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 开发规范

### css规范
- 项目使用normalize.css初始化样式
- 项目使用bootstrap4的[工具类](https://v4.bootcss.com/docs/utilities/borders/)（详见工具类API）
- 自定义样式类名建议统一使用t-作为前缀，如t-container、t-button

### vue组件开发规范
- 参考[vue风格指南](https://cn.vuejs.org/v2/style-guide/)
- 建议使用[类风格组件语法](https://class-component.vuejs.org/guide/class-component.html#data)
- 使用[TS语法规范](https://blog.csdn.net/weixin_45548211/article/details/99842393)

### 接口开发规范
- 建议采用RESTful接口规范，详见[RESTful API 设计指南](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)

