<template>
    <div>
        <swiper :options="soptions">
            <swiper-slide v-for="(item,index) in slide" :key="index">
                <div class="swiper-item">
                    Slide {{item}}afsjlfsjfjljs
                    jljslfjslfj
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
    data() {
        return {
            slide: [1,2,3,4,5,6],
            soptions: {
                loop: true,
                direction: 'vertical',
                //slidesPerView: 'auto',
                //freeMode: true,
                //mousewheel: true,
                //slidesPerView: 2,
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    components:{
        swiper,
        swiperSlide
    }
}
 </script>