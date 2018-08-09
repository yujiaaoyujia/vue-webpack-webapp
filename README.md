# Vue-webpack-webapp-template

> 定制化构建, 仿 vue-cli 2.0 目录结构, 移动端单页面webapp

> webpack4.0, vue, stylus, mint-ui, axios, zepto, eslint .etc

## 构建说明

``` bash
# 安装依赖
npm install

# 开发模式：在本地启动一个带热重载的服务 localhost:2333
npm run dev

# 生产模式：打包代码
npm run build

```

``` bash
# 推荐使用nrm，帮助更快更高效地切换npm代理
npm install nrm -g --registry=https://registry.npm.taobao.org

项目地址：https://github.com/Pana/nrm

```

## 目录结构

- build/             => webpack 编译任务及配置文件
- static/            => 静态文件-构建时不会对代码作处理
- static/img         => 动态渲染路径的图片文件
- src/assets/        => 静态文件
- src/components/    => 组件
- src/router/        => 页面路由配置
- src/views/         => 页面视图
- package.json       => 项目基本信息

## webpack 使用文档

- [指南](https://webpack.js.org/guides/)
- [vue-loader 文档](http://vuejs.github.io/vue-loader)
