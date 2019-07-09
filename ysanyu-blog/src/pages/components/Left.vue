<template>
  <div class="main animated fadeInLeft">
    <div class="photo activePhoto">
      <img src="//cdn.ysanyu.com/blog-photo.jpg"
           class="img">
    </div>
    <div class="nav">
      <span v-for="(tab,index) of tabs"
            :key="index"
            :class="current===index?'tabActive':'tab'"
            @click="clickTab(index)">{{tab.btn}}</span>
    </div>
    <div class="btn">
      <img src="@/assets/icon/wechat.svg"
           class="icon"
           @click="weChat">
      <img src="@/assets/icon/github.svg"
           class="icon"
           @click="gitHub">
    </div>
    <div class="login">
      <i class="iconfont icon-denglu enter"
         @click="login()"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      current: 0,
      next: true,
      tabs: [
        {
          btn: '文章',
          link: '/article'
        },
        {
          btn: '归档',
          link: '/history'
        },
        {
          btn: '关于',
          link: '/author'
        }
      ]
    }
  },
  created () {
    if (this.$route.query.current) {
      this.current = this.$route.query.current
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.login
    }
  },
  methods: {
    login () {
      this.current = -1
      if (this.isLogin) {
        this.$router.push('/admin')
      } else {
        this.$router.push('/login')
      }
    },
    weChat () {
      this.current = -1
      this.$router.push('/wechat')
    },
    gitHub () {
      this.current = 0
      window.open('https://github.com/ysanyu', '_blank')
    },
    clickTab (index) {
      this.current = index
      this.$router.push(this.tabs[index].link)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  text-shadow: 10px 2px 6px #38b7ea;
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
  .photo {
    @media screen and (min-width: 1024px) {
      margin: 50px auto 0 auto;
      width: 120px;
      height: 120px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      margin: 40px auto 0 auto;
      width: 100px;
      height: 100px;
    }
    @media screen and (max-height: 470px) and (min-width: 768px) and (max-width: 1023px) {
      margin: 20px auto 0 auto;
      width: 80px;
      height: 80px;
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
    border-radius: 50%;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .nav {
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
      flex-direction: row;
      flex: 1;
      margin: 0 auto;
      text-align: center;
    }
    .tab {
      font-size: 24px;
      line-height: 60px;
      @media screen and (max-width: 768px) {
        flex: 1;
        font-size: 18px;
      }
    }
    .tab:hover {
      cursor: pointer;
      color: rgba(204, 204, 204, 1);
    }

    .tabActive {
      font-size: 24px;
      line-height: 60px;
      color: #38b7ea;
      @media screen and (max-width: 768px) {
        flex: 1;
        font-size: 18px;
      }
    }
    @media screen and (min-width: 769px) {
      .tabActive:after {
        content: "";
        display: block;
        width: 48px;
        margin-top: 0;
        border-bottom: 2px solid #38b7ea;
      }
    }
  }
  .btn {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    @media screen and (max-height: 470px) {
      display: none;
    }
    .icon {
      cursor: pointer;
      @media screen and (min-width: 1024px) {
        width: 50px;
        height: 50px;
        margin: 0 20px;
      }
      @media screen and (min-width: 768px) and (max-width: 1023px) {
        width: 40px;
        height: 40px;
        margin: 0 15px;
      }
      @media screen and (max-width: 768px) {
        width: 30px;
        margin: 0 10px;
        line-height: 60px;
      }
    }
  }
  .login {
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
    @media screen and (max-height: 470px) {
      display: none;
    }
    .enter {
      font-size: 50px;
      @media screen and (min-width: 768px) and (max-width: 1023px) {
        font-size: 40px;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
}
</style>
