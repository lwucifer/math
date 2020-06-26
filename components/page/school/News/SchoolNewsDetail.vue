<template>
  <div>
        <h4>{{ get(this,"newsListDetail.data.title","") }}</h4>
        <p class="text-sub my-2">{{ get(this,"newsListDetail.data.updated","") | moment('DD/MM/YYYY')}}</p>
        <div class="mt-5">
            <strong v-if="get(this,'newsListDetail.data.attachments','')">Tệp đính kèm: 
                <span
                    v-for="(file,index) in get(this,'newsListDetail.data.attachments','')"
                    :key="index"
                >
                    <a 
                    :href="get(file,'url','')"
                    class="mr-2"
                    >
                        {{get(file,'name','')}}
                    </a>
                </span>
            </strong>
        </div>
        <div style="padding: 2.5rem 0 3.5rem" v-html="get(this,'newsListDetail.data.content','')">
        </div>
        <div class="notify-other">
            <div class="intro-text-school-menu-side" style="font-size: 16px;">Tin tức khác</div>
            <div 
                class="d-flex align-items-center mb-4 school-news-detail" 
                v-for="(item,index) in get(this,'newsOtherList.content')" 
                :key="index"
                @click="getDetailNews(item.id)"
            >
                <IconEllipse2 class="mr-3"/>
                <span class="" v-html="get(item,'title','')"></span>
                <span class="ml-auto text-sub">{{get(item,'updated','') | moment('DD.MM.YYYYY')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';

import { mapState, mapActions } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import {moment} from "moment";
import { getParamQuery } from "~/utils/common"
export default {
    components:{
        IconEllipse2
    },
    data(){
        return{
            params:{
                organization_id : this.$route.params.id,
                category_id:1,
                size:5,
                page:2
            }
        }
    },
    watch:{
        '$route.query.news_id'(){
            if(get(this,"newsListDetail.data.id","") !=this.$route.query.news_id){
                console.log('changeNewsID')
                this.checkNewsId();
            }
        }
    },
    computed:{
        ...mapState("elearning/school/school-news", { newsListDetail: "schoolNewsDetail",newsOtherList: "schoolNewsOther" })
    },
    methods:{
        ...mapActions("elearning/school/school-news", ["schoolNewsOtherList"]),
        async fetchNewsDetail(news_id){
            const data = { id : news_id };
            const rs = await this.$store.dispatch(
            `elearning/school/school-news/${actionTypes.SCHOOL_NEWS.DETAIL}`,
                data
            );
        },
        async checkNewsId(){
            let news_id = this.$route.query.news_id;
            if(news_id){
                await this.fetchNewsDetail(news_id)
            }else{
                console.log('fail')
            }
        },
        async fectNewsOther(){
            const data = this.params;
            await this.schoolNewsOtherList(data)
            console.log('data',data)
        },
        getDetailNews(id){
            this.$router.push({query: { tab: 'news',news_id: id}})
        },
        get
    },
    async created(){
        await this.checkNewsId();
        await this.fectNewsOther()
    }
}
</script>

<style lang="scss">
.school-news-detail{
    cursor: pointer;
}
</style>