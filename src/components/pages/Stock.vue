<template>
    <div class="stock-list">
        <van-row>
            <van-col span="12"><van-button type="info" @click="startRequest" style="width:100%">开始</van-button></van-col>
            <van-col span="12"><van-button type="danger" @click="stopRequest" style="width:100%">停止</van-button></van-col>
        </van-row>
        <van-row style="font-weight:500;background:#ededed; padding:15px 2px;">
            <van-col span="4">股票名称</van-col>
            <van-col span="4">现价</van-col>
            <van-col span="4">买入价</van-col>
            <van-col span="4">最高价</van-col>
            <van-col span="4">获利幅度</van-col>
            <van-col span="4">距买入差</van-col>
        </van-row>
        <van-row v-for="(item,index) in dataList" :key="index" style="border-bottom: 1px solid #999; vertical-align:middle;">
            <div :style="item.remain <= 0 ? 'color:blue;':''">
            <van-col span="4">
                <van-row>
                {{item.name}}
                </van-row>
                <van-row>
                    {{item.code}}
                </van-row>
            </van-col>
            <van-col span="4">{{item.nowprice}}</van-col>
            <van-col span="4">{{item.lowprice}}</van-col>
            <van-col span="4">{{item.maxprice}}</van-col>
            <van-col span="4">{{item.rangerate}}</van-col>
            <van-col span="4">{{item.remain}}</van-col>
            </div>
        </van-row>


        <div class="slide" style="display:none;">
           <input name="slide-input" id="slide-input1" type="radio" value="0"><label for="slide-input1"></label>
           <input name="slide-input" id="slide-input2"  type="radio" value="1"><label for="slide-input2"></label>
            <input name="slide-input" id="slide-input3"  type="radio" value="3"><label for="slide-input3"></label>
               
            <ul class="slide-list">
                <li>slide 1</li>
                <li>slide 2</li>
                <li>slide 3</li>
            </ul>
        </div>
    </div>
</template>
<script>
import {Col,Row,Toast,Button} from 'vant'
import axios from 'axios'
export default {
    name: 'Stock',
    data(){
        return {
            dataList: [],
            interval: null
        }
    },
    created(){
        this.startRequest()
    },
    methods:{
        startRequest(){
            Toast.success('马上开始请求')
            try{
                this.interval = setInterval(() => {
                        this.computePrice()
                }, 5000);
            }catch(e){
                console.log(e)
            }
        },
        stopRequest(){
            Toast.fail('马上停止请求')
            clearInterval(this.interval)
        },
        async computePrice() {
        axios({
            url: 'http://localhost:7300/mock/5e70e23ba8a9d0b7fe971829/SmileVue/stock',
            method: 'get'
        }).then((resposne)=>{
             let newArr = []
             resposne.data.forEach((element,index) => {
                 let obj = element
                 this.getStockPrice(element).then((res)=>{
                 obj.nowprice = res.data.nowprice
                 obj.remain = ( parseFloat(obj.lowprice) - parseFloat(obj.nowprice)).toFixed(2)
                 obj.rangerate = (((parseFloat(obj.maxprice) - parseFloat(obj.lowprice))/parseFloat(obj.maxprice))*100).toFixed(2)+"%"
                 newArr.push(element)
                 })
             });
            // console.log(newArr)
            // newArr.sort((x,y)=>{
            //     return (parseFloat(x.remain) - parselFloat(y.remain) )  
            //  })
            //  console.log(newArr)
             this.dataList = newArr;
        }).catch(err=>{
            Toast.fail(err)
            console.log(err)
        })
        },
        getStockPrice(item){
            //console.log(item)
            return new Promise((resolve,reject)=>{
                axios({
                    url: 'http://localhost:3000/stock/getInfo',
                    method: 'get',
                    params: item
                }).then(response=>{
                    resolve(response.data)
                }).catch(err=>{
                    reject(err)
                })    
            })
        }
    }
}
</script>
<style scoped>
    .stock-list{
        font-size:.7rem;
    }
    .slide{
        position: relative;
        width: 600px;
        height: 300px;
        margin: auto;
        overflow: hidden;
    }
    .slide-list{
        height: 300px;
        width: calc(600px * 3);
        line-height: 300px;
        text-align: center;
        transition: all 0.5s;
    }
    .slide-list{
         animation: marginLeft 10.6s infinite;
    }
    .slide-list li{
        float: left;
        width: 600px;
        height: 300px;
        text-align: center;
        color:white;
        text-align: center;
    }
    .slide-list li:nth-child(1){ background: chocolate;}
    .slide-list li:nth-child(2){ background:darkcyan;}
    .slide-list li:nth-child(3){ background:darkorange;}
    @keyframes marginLeft {
        0%{
            margin-left: 0;
        }
        15%{
            margin-left: 0;
        }
        33%{
            margin-left: -600px;
        }
        66%{
            margin-left: -600px;
        }
        88%{
            margin-left: -1200px;
        }
        90%{
            margin-left: -1200px;
        }
        100%{
            margin-left: 0;
        }
    }

    .slide label{
        position:absolute;
        width: 100%;
        left: 43%;
        bottom: 10px;
        margin-right:10px;
        width: 20px; 
        height: 5px; 
        background:rgba(0,0,0,0.6);
        display: block;
    }
    .slide label[for="slide-input1"]{left:43%}
    .slide label[for="slide-input2"]{left:47%}
    .slide label[for="slide-input3"]{left:51%}
    .slide input{ display: none;}
    
    #slide-input1:checked~ul{margin-left:0;}
    #slide-input2:checked~ul{margin-left:-600px;}
    #slide-input3:checked~ul{margin-left:-1200px;}

    #slide-input1:checked~label[for="slide-input1"]{background: white;}
    #slide-input2:checked~label[for="slide-input2"]{background: white;}
    #slide-input3:checked~label[for="slide-input3"]{background: white;}
</style>