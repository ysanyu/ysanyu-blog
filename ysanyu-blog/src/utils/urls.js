export const Url = {
  baseURL: 'http://xxx.com/api/', // 正式环境
  // baseURL: '/api/', // 代理

  /* 登陆注册 */
  login: 'user/login',
  register: 'user/register',
  changePass: 'user/changePass',

  /* 博客内容 */
  write: 'blog/write',
  read: 'blog/read',
  delete: 'blog/delete',
  whichBlog: 'blog/detail',
  count: 'blog/count',
  updateBlog: 'blog/update',
  history: 'blog/history',
  upBlog: 'blog/upBlog',

  /* 上传图片 */
  uploadImg: 'uploadImg',

  /* 个人介绍 */
  readAuthor: 'author/read',
  writeAuthor: 'author/write',
  updateAuthor: 'author/update'
}
