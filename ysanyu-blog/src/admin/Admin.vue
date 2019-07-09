<template>
  <div class="main">
    <admin-nav />
    <admin-content />
  </div>
</template>

<script>
import AdminNav from './components/AdminNav'
import AdminContent from './components/AdminContent'

export default {
  name: 'Admin',
  components: {
    AdminNav,
    AdminContent
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
