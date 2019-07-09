<template>
  <div class="main animated fadeInDown">
    <img src="//cdn.ysanyu.com/wechat.jpg"
         class="wechat">
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="less" scoped>
.main {
  .wechat {
    border-radius: 16px;
    margin: 100px auto;
    width: 300px;
    @media screen and (max-width: 768px) {
      width: 250px;
    }
  }
}
</style>
