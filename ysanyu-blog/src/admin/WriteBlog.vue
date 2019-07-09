<template>
  <div class="main">
    <div class="box"
         v-for="(box,index) of boxs"
         :key="index">
      <h1>{{box.txt}}</h1>
      <input type="text"
             class="input"
             v-model="box.value"
             :placeholder="box.placeholder">
    </div>
    <div class="content">
      <h1>正文</h1>
      <mavon-editor ref=md
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
                    v-model="content"
                    class="node"></mavon-editor>
    </div>
    <div class="btns">
      <div class="btn button"
           @click="saveBlog">{{update?'修改':'提交'}}</div>
      <div class="btn button"
           @click="clear">取消</div>
    </div>
  </div>
</template>

<script>
import { writeBlog, uploadImg, updateBlog, whichBlog } from '@/utils/http'

export default {
  name: 'WriteBlog',
  data () {
    return {
      update: false,
      boxs: [
        {
          txt: '标题',
          value: '',
          plceholder: '请输入标题'
        },
        {
          txt: '标签(多个标签用;隔开）',
          value: '',
          plceholder: '请输入标签'
        }
      ],
      content: '',
      blogBody: '',
      id: ''
    }
  },
  created () {
    if (this.$route.query.update) {
      this.update = true
      this.id = this.$route.query.id
      whichBlog({ _id: this.$route.query.id }).then(res => {
        if (res.data.code === 0) {
          this.boxs[0].value = res.data.blog.title
          this.boxs[1].value = res.data.blog.tags
          this.content = res.data.blog.content
        }
      })
    }
  },
  computed: {
    author () {
      return this.$store.state.author
    }
  },
  methods: {
    clear () {
      this.$dialog.alert({
        title: '清空提醒',
        message: '将清空内容，谨慎操作！',
        showCancelButton: true
      }).then(res => {
        if (res.cancel) {
        } else {
          this.content = ''
          for (let i in this.boxs) {
            this.boxs[i].value = ''
          }
        }
      })
    },
    postBlog (data) {
      writeBlog(data).then(res => {
        if (res.data.code === 0) {
          this.$toast.success(res.data.msg)
          this.$router.push({
            path: res.data.path,
            query: { current: 0 }
          })
        }
      })
    },
    updateBlog (data) {
      updateBlog(data).then(res => {
        if (res.data.code === 0) {
          this.$toast.success(res.data.msg)
          this.$router.push({
            path: res.data.path,
            query: { current: 0 }
          })
        }
      })
    },
    saveBlog () {
      if (this.author === '') {
        this.$toast.fail('登录状态失效')
      } else {
        if (this.boxs[0].value !== '' && this.boxs[1].value !== '' && this.content !== '') {
          const writeData = {
            _id: this.id,
            author: this.author,
            title: this.boxs[0].value,
            tags: this.boxs[1].value,
            content: this.content
          }
          if (this.update) {
            this.updateBlog(writeData)
          } else {
            this.postBlog(writeData)
          }
        } else {
          this.$toast('请填写完整！')
        }
      }
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      uploadImg(formdata).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        */
        this.$refs.md.$img2Url(pos, res.data.data)
      })
    },
    $imgDel () {

    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow-y: auto;
  h1 {
    margin: 10px 0;
    font-size: 32px;
  }
  .node {
    color: #555;
    background: #fff;
    height: 500px;
    overflow: auto;
  }
  .btns {
    text-align: right;
    .button {
      margin: 50px 40px 0 0;
      width: 100px;
      background-color: #38b7ea;
      -webkit-transition: all ease 300ms;
      transition: all ease 300ms;
      color: #fff;
    }
    :nth-child(2) {
      background-color: rgba(240, 66, 67, 1);
    }
  }
}
</style>
