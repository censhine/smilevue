<template>
    <div>
        <!--search bar-->
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img :src="locationIcon" class="location-icon"></van-col>
                <van-col span="16"><input type="text" class="search-input"/></van-col>
                <van-col span="5"><van-button type="primary" size="mini" class="search-btn">搜索</van-button></van-col>
            </van-row>
        </div>

        <!--banner adversting-->
        <div class="top-banners">
            <van-swipe :auto-play="1000">
                <van-swipe-item v-for="(banner,index) in adsArr" :key="index">
                    <img :src="banner.image" style="width:100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!--category-->
        <div class="type-bar">
            <div v-for="(item,indexs) in category.slice(1)" :key="indexs">
                <img v-lazy="item.image" style="width:100%"/>
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>

        <!--advertising picture-->
        <div class="advertising">
            <img :src="advPic" style="width:100%;"/>
        </div>

        <!--recommend goods-->
        <div class="goods-recommend">
            <h2>商品推荐</h2>
            <swiper :options="swiperOptions">
            <swiper-slide v-for="(item,index) in recommend" :key="index">
                <div class="swipe-box">
                <img v-lazy="item.image"/>
                <h3>{{item.goodsName}}</h3>
                <div><span class="price">¥{{item.price}} </span><del>¥{{item.mallPrice}}</del></div>
                </div>
            </swiper-slide>
            </swiper>
        </div>

        <!--swiperDefault></swiperDefault-->  

        <!--floor data-->
        <floorComponent :floorData="floorData"></floorComponent>
        
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="↑没有更多了"
                    @load="onLoad"
                >
                    <van-row gutter="20">
                        <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                            <goods-info :goodsImage="item.image" :goodsId="index" :goodsName="item.name" :goodsPrice="item.price" v-on:goodsClick="goodsClick"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>

    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {Lazyload, Toast} from 'vant'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import url from '@/serviceAPI.config.js'
import swiperDefault from '../swipers/swiperDefault'
import floorComponent from '../floorComponent'
import goodsInfo from '../goodsInfoComponent'

Vue.use(Lazyload)

export default {
    name: "ShoppingMall",
    data() {
        return {
            msg: "hello,shoppingMall",
            locationIcon: require('../../../static/images/aui-icon-location2.png'),
            adsArr: [],
            category: [],
            advPic: '',
            recommend: [],
            swiperOptions: {
                slidesPerView: 3    
            },
            floorData: [],
            hotGoods:[], //热卖商品
            loading: false,
            finished: false
        }
    },
    components:{
        swiper,
        swiperSlide,
        swiperDefault,
        floorComponent,
        goodsInfo
    },
    created(){
        axios({
           url: url.getHomeInfo,
           method: 'get'
        }).then(response=>{
           console.log(response)   
           this.loading = true
           if(response.data){
               let _data = response.data.data;
               this.adsArr = _data.slides;
               this.category = _data.category;
               this.advPic = _data.advertesPicture.PICTURE_ADDRESS;
               this.recommend = _data.recommend;
               this.floorData = _data.floor1;
               this.hotGoods = _data.hotGoods;
           }  
        }).catch(err=>{
            console.log(err)
        });
    },
    methods:{
        onLoad(){
            setTimeout(()=>{
                this.finished = true
                this.loading = false
            },2000)
        },
        goodsClick(id){
            this.$router.push({
                path: `/goods?goodsId=${id}`
            })
        }
    }
}
</script>
<style>
.search-bar{
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #e5017d;
    color: white;
    overflow: hidden;
}
.location-icon{
    width: 90%;
}
.search-input{
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    border: none;
    border-bottom: 1px solid #fff;
    background-color: #e5017d;
    color: white;
}
.search-btn{
    background-color: #ededed;
    border:none;
    margin-left: .5rem;
    color:#333;
}
.top-banners{
    clear:both;
    max-height: 20rem;
    overflow: hidden;
}
.type-bar{
    background-color: #fff;
    display: flex;
    flex-wrap: nowrap;
    margin: .2rem .3rem;
    font-size: .9rem;
}
.type-bar div{
    padding: .2rem .3rem;
    font-size: .8rem;
}
.advertising{
    margin-top: 1rem;
}
.goods-recommend{
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-top:1px solid #ededed;
    border-bottom: 1px solid #ededed;
    padding: .5rem;
}
.goods-recommend img {
    width: 98%;
}
.goods-recommend h2{
    font-size: 1rem;
    font-weight: 400;
}
.goods-recommend h3 {
    font-size: .8rem;
    font-weight: 300;
    max-height: 2.2rem;
    overflow: hidden;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
}
.goods-recommend .swipe-box{
    border-right: 1px solid #ededed;
    font-size: .7rem;
    text-align: center;
}
.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
  .price{
      color:#e5017d;
  }
</style>