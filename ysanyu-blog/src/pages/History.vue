<template>
  <div class="main">
    <div class="history">
      <div class="border animated fadeInRight"
           v-for="(blog,index) of history"
           :key="index">
        <div class="date">{{blog.year}}</div>
        <div class="color">
          <div class="content"
               v-for="(yearData,index) of blog.data"
               :key="index">
            <span class="month">{{yearData.month}}</span>
            <ul class="title">
              <li v-for="(monthData,index) of yearData.data"
                  :key="index"
                  @click="getBlog(monthData._id)">{{monthData.title}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { historyBlog } from '@/utils/http'

export default {
  name: 'History',
  data () {
    return {
      history: []
    }
  },
  created () {
    historyBlog().then(res => {
      this.history = res.data.data
    })
  },
  methods: {
    getBlog (id) {
      this.$router.push({
        path: '/blog',
        query: {
          id: id,
          current: 1,
          from: this.$route.path
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 10px;
  .history {
    margin: 10px 150px;
    -webkit-overflow-scrolling: touch;
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      margin: 10px 50px;
    }
    @media screen and (max-width: 768px) {
      margin: 10px 10px;
    }
    .border {
      border-radius: 10px;
      overflow: hidden;
      color: #333;
      .date {
        padding: 20px 15px 7px 43px;
        font-size: 50px;
        text-align: right;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        @media screen and (min-width: 768px) and (max-width: 1023px) {
          font-size: 40px;
        }
        @media screen and (max-width: 768px) {
          font-size: 30px;
        }
      }
      .color {
        .content {
          padding: 15px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          .month {
            text-align: right;
            padding-right: 20px;
            text-shadow: 1px 1px 0 #fff;
            font-size: 24px;
            font-weight: 500;
            @media screen and (min-width: 1024px) {
              width: 150px;
            }
            @media screen and (min-width: 768px) and (max-width: 1023px) {
              width: 100px;
              font-size: 22px;
            }
            @media screen and (max-width: 768px) {
              padding: 0 10px;
              font-size: 20px;
            }
          }
          .title {
            width: calc(100% - 234px);
            padding-left: 32px;
            border-left: 1px solid #ddd;
            @media screen and (min-width: 768px) and (max-width: 1023px) {
              padding-left: 22px;
              width: calc(100% - 164px);
            }
            @media screen and (max-width: 767px) {
              padding-left: 10px;
              width: calc(100% - 80px);
            }
            li {
              height: 28px;
              line-height: 28px;
              font-size: 16px;
              color: #565a5f;
              cursor: pointer;
              list-style-position: inside;
              list-style-type: square;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              @media screen and (min-width: 768px) and (max-width: 1023px) {
                padding-left: 22px;
              }
              @media screen and (max-width: 767px) {
                list-style-type: none;
                font-size: 14px;
              }
            }
            li:hover {
              color: #38b7ea;
            }
          }
        }
        .content:nth-child(2n-1) {
          background: #fff;
        }
        .content:nth-child(2n) {
          background: #f5f5f5;
        }
      }
    }
  }
}
</style>
