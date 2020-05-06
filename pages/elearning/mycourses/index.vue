<template>
  <div class="container wrap__study-space">
    <span class="title__study-space">Góc học tập</span>
    <div class="d-flex">
        <div class="elearning-manager-content__title__nav">
            <a @click="changeTab(1)" :class="tab === 1 ? 'active' : ''">Tất cả</a>
            <a @click="changeTab(2)" :class="tab === 2 ? 'active' : ''">Bài giảng</a>
            <a @click="changeTab(3)" :class="tab === 3 ? 'active' : ''">Khóa học</a>
            <a @click="changeTab(4)" :class="tab === 4 ? 'active' : ''">Yêu thích</a>
            <a @click="changeTab(5)" :class="tab === 5 ? 'active' : ''">Lưu trữ</a>
        </div>
        <div style="width: 267px;margin-left:auto">
            <app-search/>
        </div>
    </div>
    <ElearningList/>
    <app-pagination :pagination="pagination" :type="2"/>
  </div>
</template>

<script>
import ElearningList from "~/components/page/elearning/mycourses/ElearningList"
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
export default {
    components:{
        ElearningList
    },
    data(){
        return{
            params:{},
            tab: 2,
            list:[],
            pagination:{
                total: 0,
                size: 10,
                page: 1,
                totalElements: 10,
                first: 1,
                last: 1,
                number: 10
            }
        }
    },
    created(){
        this.fetchElearningList()
    },
    computed:{
        ...mapState("elearning/study/study-student", {
            elearningStudyStudent: "elearningStudyStudent",
        })
    },
    methods:{
        changeTab(tab){
            this.tab = tab;
        },
        fetchElearningList(){
            const payload = {
                params :{
                    types: this.params.type,
                    size: this.params.size,
                    page: this.params.page
                }
            }
            this.$store.dispatch(`elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STUDENT.LIST}`,payload)
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
.wrap__study-space{
    .title__study-space{
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #222222;
    }
    .elearning-manager-content__title__nav{
        a{
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.01em;
            text-transform: uppercase;
        }
    }
}

</style>