<template>
    <div class="container">
        <div class="row wrap-notify-school">
            <div class="col-md-8">
                <div v-if="!isDetail">
                    <div class="intro-text-school-menu-side">Tin tức mới</div>
                    <div class="row news-item-school" v-for="(item,index) in 5" :key="index" @click="showDetailNews">
                        <div class="col-md-4">
                            <img :height="131" class="w-100" src="~assets/images/tmp/img-intro.png">
                        </div>
                        <div class="col-md-8">
                            <p class="title-notify">Triển khai cuộc thi “An toàn giao thông cho nụ cười ngày mai cấp THPT năm học 2019-2020</p>
                            <p class="text-sub my-2">01/06/2020</p>
                            <p>Nhà trường kính gửi các đồng chí cán bộ, giáo viên, nhân viên và các em học sinh công văn triển khai cuộc thi “An toàn giao thông cho nụ cười ngày mai cấp THPT năm học 2019-2020”...</p>
                        </div>
                    </div>
                    <app-pagination
                        :pagination="pagination"
                        class="mt-5"
                    />
                </div>
                <div v-else>
                    <h4>Bộ GD&ĐT ra công điện về phòng chống dịch vi rút Corona</h4>
                    <p class="text-sub my-2">02/12/2022</p>
                    <div style="padding: 2.5rem 0 3.5rem">
                        Content News
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
            </div>
            <div class="col-md-4">
                <SchoolNewsMenuSide/>
            </div>
        </div>
    </div>
</template>

<script>
import SchoolNewsMenuSide from "~/components/page/school/News/SchoolNewsMenuSide"
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';
export default {
    components:{
        SchoolNewsMenuSide,
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
        showDetailNews(){
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