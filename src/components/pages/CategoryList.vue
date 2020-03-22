<template>
    <div>
        <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div>

        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                           <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}"  v-for="(item,index) in category" :key="index">
                                 {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>

                        <div class="list-div">
                            <van-pull-refresh
                                v-model="isRefresh"
                                @refresh="onRefresh"
                            >
                                <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    @load="onLoad"
                                >
                                    <div v-for="(item,index) in goodsList" :key="index">
                                        <goods-info
                                            :goodsImage="item.GOODS_IMAGE" 
                                            :goodsId="item.GOODS_ID" 
                                            :goodsName="item.GOODS_NAME" 
                                            :goodsPrice="item.GOODS_PRICE" 
                                            v-on:goodsClick="goodsClick"
                                        />
                                    </div>
                                </van-list>

                            </van-pull-refresh>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'vant'
import url from '@/serviceAPI.config.js'
import goodsInfo from '../goodsInfoComponent'
    export default {
        data() {
            return {
                category:[], 
                categoryIndex:0, 
                categorySub:[],
                active: 0,
                goodsList: [],
                loading: false,
                finished: false,
                isRefresh: false,
                page: 1,
                categorySubId: 0
            }
        },
        created(){
            this.getCategory()
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
        },
        methods:{
            getCategory() {
                axios({
                    url:url.getCategoryList,
                    method:'get',
                })
                .then(response=>{

                    console.log(response)

                    if(response.data.code == 200 && response.data.data ){
                        this.category=response.data.data
                        this.clickCategory(0,this.category[0].ID)
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            //点击大类的方法
            clickCategory(index,categoryId){
                this.categoryIndex=index
                this.getCategorySubByCategoryId(categoryId)
            },
            //根据大类ID读取小类类别列表
            getCategorySubByCategoryId(categoryId){
                console.log(categoryId)
                axios({
                    url:url.getCategorySubList,
                    method:'get',
                    params:{cid:categoryId}
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.data ){
                        this.categorySub=response.data.data
                        this.categorySubId = this.categorySub[0].ID
                        this.active = 0
                        this.onLoad()
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }  
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            onRefresh(){
                setTimeout(()=>{
                    setTimeout(() => {
                        this.isRefresh = false;
                        this.finished = false;
                        this.goodList=[];
                        this.page=1
                        this.onLoad()
                    }, 500);
                },500)
            },
            onLoad(){
                if(!this.categorySubId){
                    return;
                }
                setTimeout(()=>{
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                },1000)
                console.log(this.categorySubId)
                axios({
                    url:url.getCategoryGoodsList,
                    method:'get',
                    params:{cid:1,page:this.page}
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.data.length ){
                        this.page++
                        this.goodsList=response.data.data.concat(response.data.data)
                    }else{
                        this.finished = true
                        Toast('服务器错误，数据取得失败')
                    }  
                    this.loading = false
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            goodsClick(id){
                Toast(id)
            }
        },
        components:{
            goodsInfo
        }
    }
</script>

<style scoped>
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #ededed;
}
</style>