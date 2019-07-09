<template>
  <div class="list">
    <div class="blogs">
      <article class="article animated fadeInRight"
               v-for="(blog,index) of list"
               :key="index"
               @click="readMore(blog._id)">
        <h1 class="title">{{blog.title}}</h1>
        <div v-show="blog.up"
             class="up btn">置顶</div>
        <div class="body">
          <mavon-editor class="txt"
                        :value="blog.content"
                        :subfield="prop.subfield"
                        :defaultOpen="prop.defaultOpen"
                        :toolbarsFlag="prop.toolbarsFlag"
                        :editable="prop.editable"
                        :scrollStyle="prop.scrollStyle"></mavon-editor>
        </div>
        <div class="footer">
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
          </div>
          <button class="btn footer-btn font">阅读更多</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { readBlog, getCount } from '@/utils/http'

export default {
  name: 'Article',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    readBlog().then(res => {
      this.list = res.data.list
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].tags = this.list[i].tags.split(';')
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
        scrollStyle: true
      }
      return data
    }
  },
  methods: {
    readMore (id) {
      getCount({ _id: id }).then(res => {
        this.$router.push({
          path: '/blog',
          query: {
            id: id,
            current: 0,
            from: this.$route.path
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  padding: 10px 0;
  height: 100%;
  .blogs {
    width: 90%;
    height: calc(100vh - 80px);
    margin: 30px auto 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: 100%;
      margin: 0 auto;
    }
    .article {
      padding: 30px;
      margin: 0 0 20px 0;
      background: #ffffff;
      color: #383a42;
      border-radius: 16px;
      position: relative;
      @media screen and (max-width: 767px) {
        margin: 0 5px 10px 5px;
      }
      .up {
        position: absolute;
        top: 30px;
        left: 30px;
        background-color: rgba(240, 66, 67, 1);
        color: #ffffff;
      }
      .title {
        text-align: right;
        transition: color 0.1s ease;
        position: relative;
        padding-bottom: 20px;
        font-size: 28px;
        font-weight: 500;
        line-height: 1.2;
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media screen and (min-width: 768px) and (max-width: 1023px) {
          font-size: 20px;
        }
        @media screen and (max-width: 768px) {
          font-size: 16px;
          box-shadow: 10px 2px 0px 0px rgba(74, 74, 74, 0.16);
        }
      }
      .body {
        width: auto;
        line-height: 24px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 100px;
        @media screen and (min-width: 768px) and (max-width: 1023px) {
          font-size: 14px;
          line-height: 22px;
          height: 80px;
        }
        @media screen and (max-width: 767px) {
          font-size: 12px;
          line-height: 20px;
          height: 30px;
        }
        .txt {
          width: 100%;
          height: 100%;
        }
      }
      .footer {
        display: flex;
        flex-direction: row;
        padding-top: 20px;
        border-top: 2px solid rgba(235, 235, 235, 1);
        .info {
          flex: 1;
          line-height: 33px;
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
        }
        .footer-btn {
          text-align: right;
          color: #ffffff;
          background-color: #38b7ea;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }
  }
  .blogs::-webkit-scrollbar {
    display: none;
  }
}
</style>
