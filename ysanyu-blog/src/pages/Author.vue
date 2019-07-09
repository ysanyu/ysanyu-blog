<template>
  <div class="main">
    <div class="body">
      <mavon-editor class="content"
                    :value="content"
                    :subfield="prop.subfield"
                    :defaultOpen="prop.defaultOpen"
                    :toolbarsFlag="prop.toolbarsFlag"
                    :codeStyle="prop.codeStyle"
                    :scrollStyle="prop.scrollStyle"></mavon-editor>
    </div>
  </div>
</template>

<script>
import { getAuthor } from '@/utils/http'

export default {
  name: 'Author',
  data () {
    return {
      content: ''
    }
  },
  created () {
    getAuthor().then(res => {
      if (res.data.code === 0) {
        this.content = res.data.data[0].content
      }
    })
  },
  computed: {
    prop () {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        codeStyle: 'code-atelier-plateau-light'
      }
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 40px 10px;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 30px 20px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px 5px 0 5px;
  }
  .body {
    margin: 0 auto;
    width: 800px;
    height: 100%;
    border-radius: 16px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      width: 600px;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    .content {
      width: 100%;
      margin: 0 auto;
      height: 100%;
      background: white;
      border-radius: 16px;
      word-wrap: break-word;
      text-align: center;
    }
  }
}
</style>
