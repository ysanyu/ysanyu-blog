<template>
  <div class="home">
    <left class="left" />
    <right class="right" />
  </div>
</template>

<script>
import Left from '@/pages/components/Left'
import Right from '@/pages/components/Right'
export default {
  name: 'Home',
  components: {
    Left,
    Right
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  .left {
    width: 20%;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 60px;
    }
    background: rgba(0, 0, 0, 0.4);
  }
  .right {
    flex: 1;
    -webkit-overflow-scrolling: touch;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: calc(100vh - 100px);
    }
  }
}
</style>
