<template>
    <div class="container">
        <div class="row wrap-notify-school">
            <div class="col-md-8">
                <div v-if="!isDetail">
                    <div class="intro-text-school-menu-side">Thời khóa biểu mới mới</div>
                    <div class="row news-item-school" v-for="(item,index) in 5" :key="index" @click="showDetailSchedule">
                        <div class="col-md-4">
                            <img :height="131" class="w-100" src="~assets/images/tmp/img-intro.png">
                        </div>
                        <div class="col-md-8">
                            <p class="title-notify">Thời khóa biểu THCS từ ngày 08.06.2020</p>
                            <p class="text-sub my-2">01/06/2020</p>
                        </div>
                    </div>
                    <app-pagination
                        :pagination="pagination"
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
    methods:{
        showDetailSchedule(){
            this.isDetail= true
        }
    }
}
</script>

<style lang="scss">
.news-item-school{
    cursor: pointer;
    margin-bottom: 3.5rem;
}
</style>