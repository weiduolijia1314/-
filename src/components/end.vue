<template>
  <div
          class="end_div"
  >
  <v-card
          elevation="9"
          class="end_card"
          shaped
  >
    {{msg}}
    <p></p>

    <v-btn
            color="primary"
            elevation="6"
            x-large
            @click="go_login"
    >
    返回登录
    </v-btn>
  </v-card>
  </div>
</template>

<script>
  export default {
    name: "end",
    data(){
      return{
        msg:"已结束,点击返回登录"
      }
    },
    methods:{
      go_login(){
        location.href = "/"
      }
    }
  }
</script>

<style scoped>
  .end_card{
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .end_div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>