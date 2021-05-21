<template>
  <v-app id="box" >
    <v-main id="app">
      <router-view app></router-view>
      <tips></tips>
    </v-main>
  </v-app>

</template>
<script>
import  Tips from './plug-in/tips';
import setTime from "./components/setTime";
import {text} from "./api/base"
  export default {
  name:'app',

  components:{
    setTime,Tips
  },
    data(){
    return{
      context:"",
      isshow:"1",
    }
    },
    methods:{
      is_show(){
     this.isshow == "1" ? this.isshow="":this.isshow="1"
      }
    },
    loop(){

    },
    destroyed(){
      console.log("2555")
      location.href = "/"
    },
    mounted() {
      document.oncontextmenu = new Function("return false;");
      document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 123) {
          alert('禁止打开控制台');
          e.returnValue = false; return (false);
        }
      }
      let that = this
      text().then((res)=>{
        console.log(res)
        that.$store.state.long_text = res.data
      })
    }
  }
</script>
<style>
.care_num{

}
body{
  user-select: none;

}

  #box_app_flex{
    /*border: 1px solid gray;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #box_app_big{
    /*border: 1px solid gray;*/
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .col{
    height: 100%;
    border: 1px solid red;
  }
  .rule_card{
    margin-top: 10px;
  }

  #box{
    background: rgba(230,230,230,0.64) ;
    /*background:url("assets/img/background.png");*/
    /*background-repeat:no-repeat ;*/
    /*background-size:cover*/
  }

</style>
