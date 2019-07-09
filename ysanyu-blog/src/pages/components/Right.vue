<template>
  <div class="main">
    <div class="content">
      <router-view />
    </div>
    <div class="copyright">
      <i class="iconfont icon-copyright"></i>
      <span>2019-2020 All Rights Reserved.</span>
      <span class="hidden">Designed by ysanyu.鄂ICP备19006863号.</span>
    </div>
  </div>
</template>

<script>
import Login from '@/pages/Login'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
  .copyright {
    margin: 10px 0;
    height: 20px;
    text-align: center;
    @media screen and (max-width: 768px) {
      width: 100%;
      .hidden {
        display: none;
      }
    }
  }
}
</style>
