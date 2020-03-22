<template>
    <div class="goods-info" @click="goToGoods">
        <div class="goods-image">
            <img :src="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price price">￥{{goodsPrice }}</div>
    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        name: 'goodsInfo',
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        methods:{
            goToGoods(){
                this.$emit('goodsClick',this.goodsId)
            }
        }
    }
</script>

<style scoped>
    .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>