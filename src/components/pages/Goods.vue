<template>
<div>
    <div class="navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
    <div class="topimage-div">
        <img :src="goodsInfo.GOODS_IMAGE" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.GOODS_NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.GOODS_PRICE | moneyFilter}}</div>
    <div>
        <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.GOODS_DESCRIPTION">

          </div>
        </van-tab>
        <van-tab title="评价">
            正在制作中
        </van-tab>
        </van-tabs>

    </div>
    <div class="goods-bottom">

    <div>
            <van-button size="large" type="primary">加入购物车</van-button>
    </div>
    <div>
            <van-button size="large" type="danger">直接购买</van-button>
    </div>

</div>
</div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {toMoney} from '@/filter/moneyFilter.js'
    import { Toast } from 'vant'
    export default {
        name: 'Goods',
        data() {
            return {
                goodsId: '',
                goodsInfo:{},   //商品详细数据
            }
        },
        filters:{
            moneyFilter(money){
                return money
            }
        },
        created(){
            this.goodsId= this.$route.query.goodsId
            console.log(this.goodsId)
            this.getInfo()
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getInfo() {
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'get',
                    params:{
                        id:this.goodsId
                    }
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.data ){
                         this.goodsInfo = response.data.data
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                    console.log( this.goodsInfo)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>
   .detail{
     font-size:13px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;

    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex:1;
    padding:5px;
}
</style>