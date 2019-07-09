<template>
  <div class="home">
    <mavon-editor ref=md
                  @imgAdd="$imgAdd"
                  @imgDel="$imgDel"
                  v-model="content"
                  class="node"></mavon-editor>

    <div class="btns">
      <div class="btn button"
           @click="save">{{update?'修改':'提交'}}</div>
    </div>
  </div>
</template>

<script>
import { uploadImg, writeAuthor, getAuthor, updateAuthor } from '@/utils/http'

export default {
  name: 'AuthorWrite',
  data () {
    return {
      content: '',
      update: false
    }
  },
  created () {
    getAuthor().then(res => {
      if (res.data.code === 0) {
        this.content = res.data.data[0].content
        this.update = true
      }
    })
  },
  computed: {
    author () {
      return this.$store.state.author
    }
  },
  methods: {
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

    },
    save () {
      if (this.author === '') {
        this.$toast.fail('登录状态失效')
      } else {
        if (this.content !== '') {
          const data = {
            author: this.author,
            content: this.content
          }
          if (this.update) {
            this.updateMsg(data)
          } else {
            this.writeMsg(data)
          }
        } else {
          this.$toast('请填写完整！')
        }
      }
    },
    updateMsg (data) {
      updateAuthor(data)
        .then(res => {
          if (res.data.code === 0) {
            this.$toast(res.data.msg)
            getAuthor().then(res => {
              if (res.data.code === 0) {
                this.content = res.data.data[0].content
              }
            })
          } else {
            this.$toast(res.data.msg)
          }
        })
    },
    writeMsg (data) {
      writeAuthor(data)
        .then(res => {
          if (res.code === 0) {
            this.$toast.success(res.data.msg)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  .node {
    margin: 30px;
    height: 80%;
    overflow: auto;
    word-wrap: break-word;
    text-overflow: clip;
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
  }
}
</style>
