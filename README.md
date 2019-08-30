> Ysanyu-Blog
>
> 文档目的旨在让想学习 Vue 或者 Node 或者想开发个人博客的兄弟们借鉴下，碰到错误的地方还望指正
> 有什么问题或者建议随时 issues
>
> 博客地址：[The blog of ysanyu](http://blog.ysanyu.com)

### 说明（Instructions）

- 本项目后台基于 express+mongodb，前台基于 Vue2.0 全家桶
- 项目前台代码在 ysanyu-blog 里面，后台代码在 api 里面

#### 启动（Start）

#### 前端（ysanyu-blog）

```
cd ysanyu-blog
npm install
npm start #开发环境
npm run build #构建
```

#### 后端（api）

```
cd api
npm install
npm start
```

#### 配置（Config）

#### 前端（ysanyu-blog）

**src/utils/url.js**:

- 配置 baseUrl 为你的接口地址。
- 如果使用 localhost:3000，则需开启代理。即设置 changeOrigin: true

#### 前端（ysanyu-blog）

**/routes/uploadImg.js**:

- 上传图片的配置。相关配置参考使用文档

# 参考文档

- [Vue2.0 文档](https://cn.vuejs.org/v2/api/)
- [WebPack 中文文档](https://doc.webpack-china.org/)
- [MongooseAPI 参考手册](http://www.nodeclass.com/api/mongoose.html)
- [Express 4.x API 手册](http://www.expressjs.com.cn/4x/api.html)
- ...
