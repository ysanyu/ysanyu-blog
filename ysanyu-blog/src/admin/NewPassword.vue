<template>
  <div class="main animated fadeInRight">
    <div class="border">
      <div class="box"
           v-for="(box,index) of boxs"
           :key="index">
        <span>{{box.txt}}</span>
        <input type="password"
               class="input"
               v-model="box.password"
               :placeholder="box.plceholder">
      </div>
      <div class="save btn"
           @click="newPass">保存修改</div>
    </div>
  </div>
</template>

<script>
import { changePass } from '@/utils/http'

export default {
  name: 'NewPassword',
  data () {
    return {
      boxs: [
        {
          txt: '原密码',
          password: '',
          plceholder: '请输入原密码'
        },
        {
          txt: '新密码',
          password: '',
          plceholder: '请输入新密码'
        },
        {
          txt: '再次输入',
          password: '',
          plceholder: '请再次输入新密码'
        }
      ]
    }
  },
  computed: {
    userName () {
      return this.$store.state.author
    }
  },
  methods: {
    change (data) {
      changePass(data).then(res => {
        if (res.data.code === 0) {
          this.$store.commit('changeLogin', false)
          this.$toast.success(res.data.msg)
          this.$router.push(res.data.path)
        }
      })
    },
    newPass () {
      if (this.userName === '') {
        this.$toast.fail('登录状态失效')
      } else {
        if (this.boxs[0].password !== '' && this.boxs[1].password !== '' && this.boxs[2].password !== '') {
          if (this.boxs[1].password !== this.boxs[2].password) {
            this.$toast('两次输入不一致！')
          } else {
            const upData = {
              userName: this.userName,
              origin: this.boxs[0].password,
              change: this.boxs[2].password
            }
            this.change(upData)
          }
        } else {
          this.$toast('请填写完整！')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 60px auto;
  width: 400px;
  padding: 70px;
  display: flex;
  flex-direction: column;
  .border {
    padding: 30px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    text-align: center;
    .box {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      span {
        margin: 10px 0;
        width: 200px;
        line-height: 36px;
        height: 36px;
        font-size: 20px;
      }
    }
    .save {
      margin: 20px 0 0 0;
      width: 100px;
      background-color: #38b7ea;
      -webkit-transition: all ease 300ms;
      transition: all ease 300ms;
      color: #fff;
    }
  }
}
</style>
