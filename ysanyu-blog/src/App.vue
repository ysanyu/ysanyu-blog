<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  position: fixed;
  width: 100vw;
  height: 100%;
  color: rgba(255, 255, 255, 1);
  background-image: url("//cdn.ysanyu.com/blog-bg%20-%20L.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    background-image: url("//cdn.ysanyu.com/blog-bg%20-%20M.jpg");
  }
  @media screen and (max-width: 768px) {
    background-image: url("//cdn.ysanyu.com/blog-bg%20-%20S.jpg");
  }
  .van-dialog {
    width: 200px;
  }
}
</style>
