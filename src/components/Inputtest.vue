<template>
  <div id="body">
    <meta name="referrer" content="no-referrer"/>
    <h1 style="text-align: center">
    </h1>
    <div style="margin: 0 auto; ">
      <set-time/>
    </div>

    <div style="height: 90%;width:450px;float: left">
      <div style="height: 35%;width: 100%">
        <div style="text-align: center">
          <img :src="$store.state.userinfo.face" referrer="no-referrer" style="border-radius: 100%;width: 50%">
        </div>
        <div style="text-align: center;font-size: 40px"> {{$store.state.userinfo.name}}</div>
      </div>

      <div style="height: 65%;width: 100%">

        <v-card
                max-width="500"
                tile
                style="background: rgba(0,0,0,0)"
        >
          <h1 style=" text-align: center;font-size: 50px;color:red;">规则</h1>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="rule"> 1.默认电脑上所有的打字软件都可以使用</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="rule">2.最终结果只计算正确的个数，不计算打字速度，打字速度只作为参考</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="rule">3.不允许登录输入法账号</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="rule">4.禁止使用复制粘贴</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="rule">5.保持赛场安静，不得交头接耳</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="rule">6.比赛时长30分钟，可以提前离场，若电脑出现故障，联系当前赛场工作人员更换机器</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


        </v-card>

        <div style="height: 100px;text-align: center ">
          <v-btn
                  @click="word_submit"
                  style="margin-top:55px "
                  color="#1abc9c"
                  elevation="4"
          >提交结果
          </v-btn>
        </div>


      </div>
    </div>
    <div
            style="margin-top: 20px; "
            class="card_word"

    >
      <v-card
              id="back_card"
              class="in_right"
              max-width="853"
              max-height="500"
              elevation="1"
      >
        <div>
          <div id="word">
            <div v-for="(item,index) in AnsArr">
              <a :name="(item[0].anchor)"/>
              <span v-for="(value,key) in item" :class="{'word-on':value.state!=0,'word-error':value.state==0} ">{{value.word}}</span>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div
            id="input"
            class="card_word in_right"
    >
      <div class="in_test">


        <v-textarea
                no-resize
                background-color="rgba(215,255,231,0.3)"
                id="textarea_id"
                counter
                label="点击输入"
                v-model="code"
                @blur="rotation"
                rows="14"
                class="card_text"
                @input="textchange"
        />
      </div>
    </div>

  </div>
</template>

<script>
  import setTime from "./setTime";
  import {score} from "../api/base"

  export default {
    name: "Inputtest",
    metaInfo: {
      title: 'This is the test',
      meta: [
        {charset: 'utf-8'},
        {name: 'referrer', content: 'no-referrer'}
      ]
    },
    data() {
      return {
        code: "",
        is_go: 0,
        count: 0,
        word_count: 38,
        result: ""
      }
    },
    components: {
      setTime
    },

    computed: {
      codeArr() {
        let arr = [];
        // let num = 0;
        for (let val in this.result) {
          arr[val] = {
            word: this.code[val],
          }
          // num++
        }
        return this.InputArrTrans(this.word_count, arr);
      },
      AnsArr() {
        let arr = [];
        // let num = 0;
        for (let val in this.result) {
          arr[val] = {
            word: this.result[val],
            state: 0,
            anchor: 0,
          }
          // num++
        }
        return this.arrTrans(this.word_count, arr);
      },
    },
    created() {
      this.result = this.$store.state.long_text

      document.oncontextmenu = function () {
        return false;
      }
      document.onselectstart = function () {
        return false;
      }
      document.oncopy = function () {
        return false;
      }

    },
    //页面销毁自动提交
    destroyed() {
      this.word_submit()
    },
    methods: {
      word_submit() {
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
      },
      loop() {
      },
      InputArrTrans(num, arr) {
        const newArr = [];
        while (arr.length > 0) {
          newArr.push(arr.splice(0, num));
        }
        return newArr;
      },
      rotation() {
        document.getElementById('textarea_id').focus()

      },
      arrTrans(num, arr) {
        const newArr = [];
        let count = 0;
        while (arr.length > 0) {
          newArr.push(arr.splice(0, num));
          newArr[count][0].anchor = count
          count++;
        }
        return newArr;
      },
      textchange() {

        if (this.is_go == 0) {
          this.is_go = 1
          this.$store.state.is_go = 1
        }
        this.$store.state.count = 0
        for (let item in this.codeArr) {
          for (let val in this.codeArr[item]) {
            if (this.codeArr[item][val].word == this.AnsArr[item][val].word) {
              this.AnsArr[item][val].state = 1;
              this.$store.state.count++;
            } else {
              this.AnsArr[item][val].state = 0;
            }
          }
        }


      },
    },
    beforeCreate() {
      if (this.$store.state.userinfo.token == "" || this.$store.state.userinfo.uid == "" || this.$store.state.userinfo.id == "") {
        location.href = "/"
      }
    },
    mounted() {
      this.$store.state.is_time = true
      // this.word_count = (document.getElementById("word").offsetWidth/25.5).toFixed(0)-1
      document.getElementById("textarea_id").onkeypress = function (code) {

        if (code.keyCode == 13) {
          return false
        }
      }
    }
  }


</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  #body {

    background: url("../assets/img/background.png");
    background-repeat: no-repeat;
    width: 70%;
    height: 935px;
    /*padding-top:36px ;*/
    margin: 0 auto;
  }

  #word {
    background: rgba(215, 255, 231, 0.5);
    /*margin-top: 93px;*/
    /*width: 230px;*/
    height: 300px;
    font-size: 22px;
    /*border: 1px solid red;*/
    overflow-y: auto;
    /*background-color:#EFEBE9;*/
    /*padding-top: 32px;*/
    /*padding-right: 16px;*/
    /*padding-left: 16px;*/

  }

  .in_test {
    background: url("../assets/img/wordbg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  #input {

    margin-top: 65px;
    /*border: 1px solid blue;*/
    width: 853px;
    height: 472px;

  }

  #textarea_id {

    /*padding-right: -40px;*/
    /*width: 50%;*/
  }

  .word-error {
    color: #0288D1;
  }

  .word-on {
    color: #546E7A;
  }

  .card_word {
    /*width: 100%;*/
  }

  .in_right {
    margin: 0 auto;
    margin-right: 0px;
  }

  .card_text {
    font-size: 22px;
  }

  #back_card {
    background: url("../assets/img/wordbg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .rule {
    font-size: 20px;
    color: red;
  }
</style>