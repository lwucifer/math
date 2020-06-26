<template>
  <div>
        <h4>{{ get(this,"newsListDetail.data.title","") }}</h4>
        <p class="text-sub my-2">{{ get(this,"newsListDetail.data.updated","") | moment('DD/MM/YYYY')}}</p>
        <div style="padding: 2.5rem 0 3.5rem" v-html="get(this,'newsListDetail.data.title','')">
        </div>
        <div class="notify-other">
            <div class="intro-text-school-menu-side" style="font-size: 16px;">Tin tức khác</div>
            <div class="d-flex align-items-center mb-4" v-for="(item,index) in 5" :key="index">
                <IconEllipse2 class="mr-3"/>
                <span class="">Lịch trả bằng tốt nghiệp năm học 2018- 2019</span>
                <span class="ml-auto text-sub">06.09.2018</span>
            </div>
        </div>
    </div>
</template>

<script>
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import {moment} from "moment";
import { getParamQuery } from "~/utils/common"
export default {
    components:{
        IconEllipse2
    },
    computed:{
        ...mapState("elearning/school/school-news", { newsListDetail: "schoolNewsDetail" })
    },
    methods:{
        async fetchNewsDetail(news_id){
            const data = { id : news_id };
            console.log(data,'hello')
            const rs = await this.$store.dispatch(
            `elearning/school/school-news/${actionTypes.SCHOOL_NEWS.DETAIL}`,
                data
            );
            console.log('hello',rs)
        },
        async checkNewsId(){
            const news_id = getParamQuery('id');
            console.log('hello',news_id)
            if(news_id){
                console.log('hello',news_id)
                await this.fetchNewsDetail(news_id)
            }else{
                console.log('fail')
            }
        },
        get
    },
    async created(){
        await this.checkNewsId();
    }
}
</script>

<style>

</style>