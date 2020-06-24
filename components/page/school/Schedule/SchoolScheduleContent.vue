<template>
    <div class="container">
        <div class="row wrap-notify-school">
            <div class="col-md-8">
                <div v-if="!isDetail">
                    <div class="intro-text-school-menu-side">Thời khóa biểu mới mới</div>
                    <div class="row news-item-school" v-for="(item,index) in get(this,'timetablesList.content','')" :key="index" @click="showDetailSchedule">
                        <div class="col-md-4">
                            <img :height="131" class="w-100" src="~assets/images/tmp/timetable.png">
                        </div>
                        <div class="col-md-8">
                            <p class="title-notify">{{ get(item,'title','') }}</p>
                            <p class="text-sub my-2">{{ get(item,'updated','') | moment('DD/MM/YYYY') }}</p>
                        </div>
                    </div>
                    <app-pagination
                        :pagination="filterPagination"
                        class="mt-5"
                    />
                </div>
                <div v-else>
                    <h4>Thời khóa biểu số 9, áp dụng từ tuần 29, Năm học 2018 - 2019</h4>
                    <p class="text-sub my-2">02/12/2022</p>
                    <strong>Tệp đánh kèm: <a href="">TKB.pdf</a></strong>
                    <div class="py-4">
                        <p>Thời khóa biểu số 9 sáng - chiều, áp dụng từ tuần 29. Lý do thay đổi: Phân công lại chuyên môn của 3 thầy ở bộ Lý - KTCN- Thời khóa biểu số 9 sáng - chiều, áp dụng từ tuần 29. Lý do thay đổi: Phân công lại chuyên môn của 3 thầy ở bộ Lý - KTCN</p>
                        <img  class="w-100 mt-4" src="~assets/images/tmp/thoi-khoa-bieu 1.png">
                    </div>
                    <div class="notify-other">
                        <div class="intro-text-school-menu-side" style="font-size: 16px;">Thời khóa biểu khác</div>
                        <div class="d-flex align-items-center mb-4" v-for="(item,index) in 5" :key="index">
                            <IconEllipse2 class="mr-3"/>
                            <span class="">Thời khóa biểu số 9, áp dụng từ tuần 29</span>
                            <span class="ml-auto text-sub">06.09.2018</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <SchoolSchedileMenuSide/>
            </div>
        </div>
    </div>
</template>

<script>
import SchoolSchedileMenuSide from "~/components/page/school/Schedule/SchoolSchedileMenuSide"
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import {moment} from "moment";
export default {
    components:{
        SchoolSchedileMenuSide,
        IconEllipse2
    },
    data(){
        return{
            isDetail:false,
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
    computed:{
        ...mapState("elearning/school/school-info", { timetablesList: "timetables" }),
        filterPagination(){
            this.pagination.total_pages = get(this,'timetablesList.total_pages','');
            this.pagination.size = get(this,'timetablesList.size','');
            this.pagination.total_elements = get(this,'timetablesList.total_elements','');
            this.pagination.first =  get(this,'timetablesList.first',0);
            this.pagination.last =  get(this,'timetablesList.last',0);
            this.pagination.number =  get(this,'timetablesList.number','');
            return this.pagination
        }
    },
    created(){
        this.fetchTimeTableList();
    },
    methods:{
        showDetailSchedule(){
            this.isDetail= true
        },
        async fetchTimeTableList(){
            const organization_id = this.$route.params.id;
            const data = { organization_id };
            await this.$store.dispatch(
            `elearning/school/school-info/${actionTypes.SCHOOL_INFO.TIMETABLE}`,
                data
            );

        },
        get
    }
}
</script>

<style lang="scss">
.news-item-school{
    cursor: pointer;
    margin-bottom: 3.5rem;
}
</style>