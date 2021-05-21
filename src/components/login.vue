<template>
  <v-card style="max-width: 500px; margin: 0 auto; margin-top: 200px">
    <v-card-text>
      <h1 class="ma-4" style="text-align: center; padding-bottom: 24px">
        管理员登录
      </h1>
      <v-text-field v-model="data.name" label="姓名"/>
      <v-text-field v-model="data.stuno" label="学号"/>
      <v-card-actions class="justify-center">
        <v-btn color="primary" width="160" @click="login"
        >登录
        </v-btn
        >
      </v-card-actions
      >
    </v-card-text>
  </v-card>
</template>

<script>
  import {login} from "../api/base";

  export default {
    data() {
      return {
        data: {
          name: "",
          stuno: ""
        },
      };
    },
    methods: {
      login: function () {
        if (true) {
          this.$store.commit("pushAlert", {
            title: '登录失败',
            value: 'res.msg',
          });
        }
      },
    },
    mounted() {

    }

  };
</script>

<style scoped>

</style>
