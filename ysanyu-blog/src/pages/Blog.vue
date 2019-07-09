<template>
  <div class="main">
    <div class="blog">
      <header class="header">
        <div class="title">
          <div class="title-btns">
            <span class="title-btn"
                  @click="goBack">主页</span>
            <span class="title-btn">/</span>
            <span class="title-btn"
                  @click="goTag">归档</span>
          </div>
          <h1>{{blog.title}}</h1>
        </div>
        <div class="info">
          <div class="left">
            <i class="iconfont icon-shijian font"></i>
            <span class="font">{{blog.time}}</span>
          </div>
          <div v-for="(tag,index) of blog.tags"
               :key="index"
               class="left">
            <i class="iconfont icon-biaoqian font"></i>
            <span class="font">{{tag}}</span>
          </div>
          <div class="left">
            <i class="iconfont icon-yuedushu font"></i>
            <span class="font">{{blog.count}}</span>
          </div>
        </div>
      </header>
      <article class="article">
        <mavon-editor class="content"
                      :value="blog.content"
                      :subfield="prop.subfield"
                      :defaultOpen="prop.defaultOpen"
                      :toolbarsFlag="prop.toolbarsFlag"
                      :codeStyle="prop.codeStyle"
                      :scrollStyle="prop.scrollStyle"></mavon-editor>
      </article>
    </div>
    <div class="back">
      <i class="iconfont icon-houtui"
         @click="goBack"></i>
    </div>
  </div>
</template>

<script>
import { whichBlog } from '@/utils/http'

export default {
  name: 'Blog',
  data () {
    return {
      blog: {}
    }
  },
  created () {
    const id = this.$route.query.id
    this.path = this.$route.query.from
    this.current = this.$route.query.current
    whichBlog({ _id: id }).then(res => {
      if (res.data.code === 0) {
        this.blog = res.data.blog
        this.blog.tags = this.blog.tags.split(';')
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
  },
  methods: {
    goBack () {
      this.$router.push({
        path: this.path,
        query: { current: this.current }
      })
    },
    goTag () {
      this.$router.push({
        path: '/history',
        query: { current: 1 }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .blog {
    background: rgba(235, 235, 235, 1);
    display: flex;
    flex-direction: column;
    color: #383a42;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    @media screen and (min-width: 1024px) {
      border-radius: 16px;
      margin: 30px auto;
      width: 80vw;
      height: 90vh;
    }
    @media screen and (max-width: 1023px) {
      font-size: 16px;
      width: 100vw;
      height: 100vh;
    }
    .header {
      height: 200px;
      display: flex;
      flex-direction: column;
      .title {
        height: 150px;
        text-align: center;
        line-height: 150px;
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 0 30px;
        h1 {
          flex: 1;
          font-size: 3rem;
          font-weight: bold;
          @media screen and (max-width: 1023px) and (min-width: 768px) {
            font-size: 1.5rem;
          }
          @media screen and (max-width: 768px) {
            font-size: 1rem;
            text-align: right;
          }
        }
        @media screen and (max-width: 1023px) and (min-width: 768px) {
          text-align: right;
          padding: 0 20px;
        }
        .title-btns {
          display: none;
          @media screen and (max-width: 1023px) {
            display: flex;
            position: absolute;
            height: 20px;
            top: 10px;
            left: 10px;
            // text-align: left;
            .title-btn {
              line-height: 20px;
              font-size: 16px;
              margin: 0 5px;
              color: #38b7ea;
              cursor: pointer;
            }
            .title-btn:active {
              opacity: 0.6;
            }
          }
        }
      }
      .info {
        height: 50px;
        background: rgba(0, 0, 0, 0.6);
        color: rgba(235, 235, 235, 1);
        flex: 1;
        text-align: right;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        .left {
          margin-right: 20px;
          .font {
            margin-right: 5px;
            font-size: 18px;
            @media screen and (min-width: 768px) and (max-width: 1023px) {
              font-size: 16px;
            }
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
        }
        :first-child {
          flex: 1;
        }
      }
    }
    .article {
      flex: 1;
      height: calc(90vh - 200px);
      @media screen and (max-width: 1023px) {
        flex: 1;
        height: calc(100vh - 250px);
        padding-bottom: 50px;
      }
      .content {
        min-height: calc(90vh - 200px);
        @media screen and (max-width: 1023px) {
          min-height: calc(100vh - 210px);
          padding-bottom: 10px;
        }
      }
    }
  }
  .blog::-webkit-scrollbar {
    display: none;
  }
  .back {
    position: absolute;
    left: 30px;
    bottom: 60px;
    text-align: center;
    text-shadow: 10px 2px 6px #38b7ea;
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}
</style>
