<template>
  <div id="state_box">

    <div id="first" style="height: 60%;width:40%;padding:0px;margin: 0 auto"></div>
    <span style="position: absolute;top:400px;left: 950px;color: red">第一:{{tops[0].name}}</span>
    <div style="display: flex;justify-content: space-between;height: 100%;margin-top: -280px">
      <div id="second" style="height:40%;width:30%;">1</div>
      <span style="position: absolute;top: 550px;left:235px;color: red">第二:{{tops[1].name}}</span>
      <div id="third" style="height: 40%;width:30%;">1</div>
      <span style="position: absolute;top: 550px;right:235px;color: red"> 第三:{{tops[2].name}}</span>
    </div>

    <div style="width: 50%;margin: 0 auto;margin-top:-400px">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              score
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
                  v-for="item in tops"
                  :key="item.speed"
          >
            <td>{{ item.name }}</td>
            <td>
              <v-progress-linear
                      v-model="item.speed"
                      :buffer-value=tops[0].speed
                      color="deep-purple accent-4"
              />
            </td>
          </tr>

          </tbody>
        </template>
      </v-simple-table>

    </div>
  </div>

</template>

<script>
  import {state} from "../api/base";

  export default {
    data() {
      return {
        name: "",
        speed: "",
        len: "",
        tops: [{}],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 50,
          }]
      };
    },
    mounted() {
      this.$store.state.topabr = false
      const that = this;
      setInterval(() => {
        state().then((res) => {
          that.tops = []
          for (let i of res.data) {
            that.tops.push({
              name: i.name,
              speed: i.speed
            })
          }
        })

        this.drawChart()
      }, 5000)
    },
    methods: {
      drawChart() {
        //基于准备好的dom，初始化echarts实例

        let myChart = this.$echarts.init(document.getElementById('first'));
        let myChart2 = this.$echarts.init(document.getElementById('second'));
        let myChart3 = this.$echarts.init(document.getElementById('third'));
// 绘制图表
        myChart.setOption({
          series: [{
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 120,
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowOffsetY: 5
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 10,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 20
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              borderColor: '#999',
              borderWidth: 0,
              width: '100%',
              lineHeight: 50,
              height: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}{unit|字/分}';
              },
              rich: {
                value: {
                  fontSize: 25,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 20,
                  color: '#999',
                  padding: [0, 0, 0, 0]
                }
              }
            },
            data: [{
              value: this.tops[0].speed
            }]
          }]
        });
        myChart2.setOption({
          series: [{
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 120,
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowOffsetY: 5
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 10,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 10
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              borderColor: '#999',
              borderWidth: 0,
              width: '100%',
              lineHeight: 50,
              height: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}{unit|字/分}';
              },
              rich: {
                value: {
                  fontSize: 25,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 20,
                  color: '#999',
                  padding: [0, 0, 0, 0]
                }
              }
            },
            data: [{
              value: this.tops[1].speed
            }]
          }]
        });
        myChart3.setOption({
          series: [{
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 120,
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowOffsetY: 5
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 10,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 10
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              borderColor: '#999',
              borderWidth: 0,
              width: '100%',
              lineHeight: 50,
              height: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}{unit|字/分}';
              },
              rich: {
                value: {
                  fontSize: 25,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 20,
                  color: '#999',
                  padding: [0, 0, 0, 0]
                }
              }
            },
            data: [{
              value: this.tops[2].speed
            }]
          }]
        });
      }
    },


  };
</script>


<style>
  .Echarts {

  }

  #state_box {
    height: 100%;
  }

  body {
    background: rgb(230, 230, 230);
  }
</style>