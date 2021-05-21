<template>
  <div>
    <v-stepper v-model="e6" vertical style="width: 70%;margin: 0 auto;margin-top: 72px">
      <v-stepper-step :complete="e6 > 1" step="1">
        参赛须知
        <small style="margin-top: 10px">请仔细阅读并确认</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <p class="text-justify text--secondary">
          1.时间从开始输入的第一个字开始计算,模板文字无换行符模板文字换行时无需自己手动输入换行符
          <br/>
          2.输入的每个字包括标点都必须与模板文字对应才算入成绩
          <br/>
          3.时间结束后会自动提交无需手动提交
          <br>
          4.登录之后中途不要关闭窗口,窗口关闭默认为提交
          <br/>
          5.最终提交的结果为正确字数,下方将会显示正确字数、时间和每分钟正确字频率
        </p>
        <v-btn color="accent" @click="e6 = 2"> 同意</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        账号登录
        <small style="margin-top: 10px">姓名和学号</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <div style="width: 30%">
          <v-text-field label="姓名" v-model="data.name"></v-text-field>
          <v-text-field
                  label="学号"
                  v-model="data.pwd"
                  type="password"
          />
          <v-btn color="accent" @click="login"> 登录</v-btn>
        </div>

      </v-stepper-content>


    </v-stepper>
  </div>

</template>

<script>
  import {login} from "../api/base";

  export default {
    data() {
      return {
        e6: 1,
        data: {
          name: "",
          pwd: ""
        }

      };
    },

    methods: {
      login: function () {
        if (
            this.data.name == "" ||
            this.data.pwd == ""
        ) {
          this.$dialog.error({
            text: "请填写完所有信息！",
            title: "Error",
          });
          return;
        }
        const that = this;
        login(
            // that.data
            {
              name: that.data.name,
              pwd: that.data.pwd
            }
        )
            .then(res => {
              if (res.code != 1) {
                that.$store.commit("pushAlert", {
                  title: '登录失败',
                  value: res.msg,
                });

              } else {
                this.$store.state.userinfo.token = res.data.token
                this.$store.state.userinfo.sid = res.data.sid
                this.$store.state.userinfo.uid = res.data.uid
                this.$store.state.userinfo.face = res.data.face
                this.$store.state.userinfo.name = res.data.name


                that.$router.push('/input');
              }
            })
            .catch(function (error) {

            });
      },
    },
  };
</script>

<style>
  .card-login {
    margin-top: 60px;
  }
</style>
