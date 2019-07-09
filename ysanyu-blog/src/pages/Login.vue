<template>
  <div class="main animated bounce">
    <div class="body">
      <span class="title"><i class="blue">后台</i>管理</span>
      <input type="text"
             class="input"
             v-model="userName"
             placeholder="用户名">
      <input type="password"
             class="input"
             v-model="password"
             placeholder="密码">
      <div class="login-btn">
        <div class="login btn"
             @click="login">登录</div>
      </div>
    </div>
    <div class="tip">为了更好的体验，请使用电脑登录</div>
  </div>
</template>

<script>
import { postLogin, postRegister } from '@/utils/http'

export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.login
    }
  },
  methods: {
    register (data) {
      postRegister(data).then(res => {
        if (res.data.code === 0) {
          this.$toast.success(res.data.msg)
        }
      })
    },
    login () {
      const that = this
      const userName = that.userName
      const password = that.password
      const loginData = {
        userName: userName,
        password: password
      }
      if (userName !== '' && password !== '') {
        postLogin(loginData).then(res => {
          if (res.data.code === 1) {
            that.$dialog.alert({
              title: '注册提示',
              message: res.data.msg,
              showCancelButton: true
            }).then(res => {
              if (res.cancel) {
              } else {
                that.register(loginData)
              }
            })
          } else if (res.data.code === 0) {
            that.$toast.success(res.data.msg)
            that.$store.commit('changeLogin', true)
            that.$store.commit('writeAuthor', that.userName)
            that.$router.push(res.data.path)
          } else if (res.data.code === 2) {
            that.$dialog.alert({
              title: '登录提示',
              message: res.data.msg
            })
          }
        }).catch(err => {
          this.$toast(err.data.msg)
        })
      } else {
        that.$dialog.alert({
          title: '登录提示',
          message: '请输入账号密码！'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 200px auto;
  width: 400px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 2px 10px 0px rgba(74, 74, 74, 0.16);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  .body {
    @media screen and (max-width: 767px) {
      display: none;
    }
    .title {
      text-align: center;
      font-size: 50px;
      .blue {
        font-size: 50px;
        color: #38b7ea;
      }
    }
    .login-btn {
      width: 100%;
      text-align: right;
      .login {
        margin: 10px 0;
        width: 100px;
        background-color: #38b7ea;
        -webkit-transition: all ease 300ms;
        transition: all ease 300ms;
        color: #fff;
      }
    }
  }
  .tip {
    display: none;
    @media screen and (max-width: 767px) {
      display: inline-block;
      margin: 0 auto;
    }
  }
}
</style>
