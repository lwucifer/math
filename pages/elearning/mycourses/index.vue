<template>
  <div class="container wrap__study-space">
    <span class="title__study-space">Góc học tập</span>
    <div class="d-flex">
        <div class="elearning-manager-content__title__nav">
            <a @click="changeTab(1)" :class="tab === 1 ? 'active' : ''">Tất cả ({{total.elearnings}})</a>
            <a @click="changeTab(2)" :class="tab === 2 ? 'active' : ''">Bài giảng ({{total.lectures}})</a>
            <a @click="changeTab(3)" :class="tab === 3 ? 'active' : ''">Khóa học ({{total.courses}})</a>
            <a @click="changeTab(4)" :class="tab === 4 ? 'active' : ''">Yêu thích ({{total.favourites}})</a>
            <a @click="changeTab(5)" :class="tab === 5 ? 'active' : ''">Lưu trữ ({{total.archieves}})</a>
        </div>
        <div style="width: 267px;margin-left:auto" placeholder="Tìm kiếm">
            <app-search/>
        </div>
    </div>
    <ElearningList 
        :elearningList="list"
    />
    <app-pagination :pagination="pagination" :type="1" />
  </div>
</template>

<script>
import ElearningList from "~/components/page/elearning/mycourses/ElearningList"
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";


export default {
    middleware: ['student-role'],
    components:{
        ElearningList
    },
    data(){
        return{
            params:{},
            tab: 1,
            list:[],
            total:{
                elearnings:null,
                courses:null,
                lectures:null,
                favourites:null,
                archieves:null
            },
            pagination:{
                "totalElements": 103,
                "last": false,
                "totalPages": 222,
                "size": 10,
                "number": 2,
                "first": true,
                "numberOfElements": 10
            }
        }
    },
    created(){
        this.fetchElearningList(),
        this.fetchElearningStatisticList()
    },
    computed:{
        ...mapState("elearning/study/study-student", {
            elearningStudyStudent: "elearningStudyStudent",
        }),
        ...mapState("elearning/study/study-student", {
            elearningStudyStatistic: "elearningStudyStatistic",
        }),
        ...mapState("elearning/study/study-student", {
            elearningStudyArchive: "elearningStudyArchive",
        }),
        ...mapState("elearning/study/study-student", {
            elearningStudyFavourite: "elearningStudyFavourite",
        })
    },
    watch:{
        elearningStudyStatistic:{
            handler: function(){
                this.total.elearnings = get(this,"elearningStudyStatistic.total_elearnings",0)
                this.total.courses = get(this,"elearningStudyStatistic.total_courses",0)
                this.total.lectures = get(this,"elearningStudyStatistic.total_lectures",0)
                this.total.favourites = get(this,"elearningStudyStatistic.total_favourites",0)
                this.total.archieves = get(this,"elearningStudyStatistic.total_archieves",0)
            }
        },
        elearningStudyStudent : {
            handler: function(){
                this.list = get(this,"elearningStudyStudent.content",[])
            }
        }
    },
    methods:{
        changeTab(tab){
            this.tab = tab;
            if(tab===1){
                this.params.type = "ALL"
                this.fetchElearningList()
                this.list = get(this,"elearningStudyStudent.content",[])
            }
            else if(tab===2){
                this.params.type = "LECTURE"
                this.fetchElearningList()
                this.list = get(this,"elearningStudyStudent.content",[])
                
            }
            else if(tab===3){
                this.params.type = "COURSE"
                this.fetchElearningList()
                this.list = get(this,"elearningStudyStudent.content",[])
            }
            else if(tab===4){
                this.fetchElearningFavourite();
                this.list = get(this,"elearningStudyFavourite.content",[])
            }
            else if(tab===5){
                this.fetchElearningArchive()
                this.list = get(this,"elearningStudyArchive.content",[])
            }
            
        },
        fetchElearningList(){
            const payload = {
                params :{
                    type: this.params.type,
                    size: this.params.size,
                    page: this.params.page
                }
            }
            this.$store.dispatch(`elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STUDENT.LIST}`,payload)
        },
        fetchElearningStatisticList(){
            this.$store.dispatch(`elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STATISTIC.LIST}`)
        },
        fetchElearningArchive(){
            this.$store.dispatch(`elearning/study/study-student/${actionTypes.ELEARNING_STURY_ARCHIVE.LIST}`)
        },
        fetchElearningFavourite(){
            this.$store.dispatch(`elearning/study/study-student/${actionTypes.ELEARNING_STURY_FAVOURITE.LIST}`)
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