<template>
  <div class="main animated fadeInLeftBig">
    <h1 class="title">后台管理系统</h1>
    <ul>
      <li v-for="(btn,index) of btns"
          :key="index"
          @click="clickIndex(btn.path)">{{btn.txt}}</li>
    </ul>
    <div class="back">
      <i class="iconfont icon-houtui"
         @click="goBack"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  data () {
    return {
      btns: [
        {
          txt: '查看文章',
          path: '/admin/allArticle'
        },
        {
          txt: '写入文章',
          path: '/admin/writeBlog'
        },
        {
          txt: '个人信息',
          path: '/admin/author'
        },
        {
          txt: '修改密码',
          path: '/admin/newPassword'
        }
      ]
    }
  },
  methods: {
    clickIndex (path) {
      this.$router.push(path)
    },
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 20%;
  height: 100%;
  padding: 20% 0;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 10px 2px 6px #38b7ea;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 30px;
    text-align: center;
  }
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    li {
      flex: 1;
      text-align: center;
      cursor: pointer;
    }
  }
  .back {
    width: 100%;
    position: absolute;
    bottom: 30px;
    text-align: center;
  }
}
</style>
