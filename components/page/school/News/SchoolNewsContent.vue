<template>
    <div class="container">
        <div class="row wrap-notify-school">
            <div class="col-md-8">
                <SchoolNewsDetail v-if="isDetail"/>
                <div v-else>
                    <div class="intro-text-school-menu-side">Tin tức mới</div>
                    <div class="row news-item-school" v-for="(item,index) in list" :key="index" @click="showDetailNews(item.news_id)">
                        <div class="col-md-4">
                            <img :height="131" class="w-100" :src="get(item,'thumb','')">
                        </div>
                        <div class="col-md-8">
                            <p class="title-notify">{{get(item,"title","")}}</p>
                            <p class="text-sub my-2">{{get(item,"updated","") | moment("DD/MM/YYYY")}}</p>
                            <p v-html="get(item,'short_desc','')"></p>
                        </div>
                    </div>
                    <app-pagination
                        :pagination="pagination"
                        class="mt-5"
                    />
                </div>
            </div>
            <div class="col-md-4">
                <SchoolNewsMenuSide/>
            </div>
        </div>
    </div>
</template>

<script>
import SchoolNewsMenuSide from "~/components/page/school/News/SchoolNewsMenuSide";
import SchoolNewsDetail from "~/components/page/school/News/SchoolNewsDetail"

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import {moment} from "moment";
import { getParamQuery } from "~/utils/common"
export default {
    components:{
        SchoolNewsMenuSide,
        SchoolNewsDetail
    },
    data(){
        return{
            isDetail:false,
            list:get(this,'newsList.content',[]),
            pagination:{
                total_pages: 2,
                size: 10,
                total_elements: 20,
                first: 1,
                last: 0,
                number: 1
            }
         }
    },
    watch:{
        newsList:{
            handler:function(){
                this.list = get(this,"newsList.content",[])
            }
        }
    },
    computed:{
        ...mapState("elearning/school/school-news", { newsList: "schoolNews" })
    },
    methods:{
        showDetailNews(newsID){
            this.isDetail= true;
            this.$router.push({query: { tab: 'news',id: newsID}})
        },
        async fetchNewsList(){
            const organization_id = this.$route.params.id;
            const data = { organization_id };
            await this.$store.dispatch(
            `elearning/school/school-news/${actionTypes.SCHOOL_NEWS.LIST}`,
                data
            );

        },
        checkDetail(){
            const news_id = getParamQuery('id');
            if(news_id){
                this.isDetail= true;
            }else{
                this.isDetail= false;
            }
        },
        get
    },
    async created(){
        await this.fetchNewsList();
        this.checkDetail()
    }
}
</script>

<style lang="scss">
.news-item-school{
    cursor: pointer;
    margin-bottom: 3.5rem;
}
</style>