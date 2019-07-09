<template>
  <div class="main animated fadeInRight">
    <ul class="border">
      <li v-for="(blog,index) of list"
          :key="index">
        <p>{{blog.title}}</p>
        <span class="btn blue"
              @click="getUpBlog(index)">{{blog.up?'已置顶':'置顶'}}</span>
        <span class="btn blue"
              @click="update(blog._id)">修改</span>
        <span class="btn blue"
              @click="remove(blog._id)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { readBlog, deleteBlog, upBlog } from '@/utils/http'

export default {
  name: 'AllArticle',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    readBlog().then(res => {
      this.list = res.data.list
    })
  },
  computed: {
    author () {
      return this.$store.state.author
    }
  },
  methods: {
    update (id) {
      this.$router.push({
        path: '/admin/writeBlog',
        query: {
          update: true,
          id: id
        }
      })
    },
    getUpBlog (index) {
      let upData = {
        author: this.author,
        _id: this.list[index]._id,
        up: !this.list[index].up
      }
      upBlog(upData)
        .then(res => {
          this.list[index].up = !this.list[index].up
        })
    },
    remove (id) {
      this.$dialog.alert({
        title: '删除提醒',
        message: '将删除此条博客，谨慎操作！',
        showCancelButton: true
      }).then(res => {
        if (res.cancel) {
        } else {
          deleteBlog({ _id: id }).then(res => {
            if (res.data.code === 0) {
              this.list = res.data.list
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  .border {
    margin: 100px auto;
    width: 60%;
    height: 80%;
    padding: 30px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    li {
      height: 60px;
      line-height: 60px;
      display: flex;
      flex-direction: row;
      border-bottom: 2px solid rgba(235, 235, 235, 1);
      p {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .blue {
        margin: 10px 0 10px 10px;
        width: 100px;
        background-color: #38b7ea;
      }
    }
  }
}
</style>
