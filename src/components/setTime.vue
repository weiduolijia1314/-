<template>
  <div id="box_flex">
    <span class="box_margin" v-if="$store.state.is_time">
      <v-chip
              close-icon="mdi-delete"
      >剩余时间:</v-chip><span style="color: red"> {{minute}}:{{second}}</span>
    </span>
    <span class="box_margin" v-if="$store.state.is_time">
     <v-chip
             close-icon="mdi-delete"
     > 正确字频率:</v-chip><span style="color: red">{{$store.state.Accuracy+"字/分"}}</span>
   </span>
  </div>
</template>

<script>
  import {heart, score} from '../api/base.js'

  export default {
    name: "setTune",
    data() {
      return {
        second: 10,
        minute: 20,
        second_s: 0,
      }
    },
    created() {
      let r = setInterval(() => {
        if (this.$store.state.is_go == 1) {
          this.gotime() //控制时间
          clearInterval(r)
        }
      }, 1000)
      let loopl = setInterval(() => {
        if (this.minute == 0 && this.second < 1) {
          clearInterval(loopl)
        }
        heart({
          id: this.$store.state.userinfo.sid,
          speed: this.$store.state.Accuracy,
        }).then(res => {
          if (res.code == 101) {
            this.$router.push("")
          }
        })
      }, 3000)
    },
    methods: {

      gotime() {
        let jsq = setInterval(() => {
          if (this.minute == 0 && this.second == 1) {
            clearInterval(jsq)
            this.$store.state.is_end = 1
            //最终结果提交
            score({
              uid: this.$store.state.userinfo.uid,
              token: this.$store.state.userinfo.token,
              speed: this.$store.state.Accuracy,
              word: this.$store.state.count
            }).then(res => {
              if (res.data.code == 101) {
                this.$router.push("")
              }
            }).catch(error => {
            })

            location.href = "/end"

          }
          if (this.second === 0) {
            this.second = 60
            this.minute--
          }
          this.second--
          this.second_s++
          this.$store.state.Accuracy = ((this.$store.state.count / (this.second_s / 60)).toFixed(0))
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  #box_flex {
    /*margin-top: 10px;*/
    /*display: flex;*/
    height: 55%;
    /*border: 1px solid red;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*justify-content: right;*/
    /*align-items: center;*/
    text-align: right;
    /*flex-direction: column;*/
    /*justify-content: right;*/
    /*float: right;*/
    /*border: 1px solid red;*/
    /*align-items: center;*/
  }

  .box_margin {
    margin-top: 20px;
    margin-right: 20px;
  }
</style>