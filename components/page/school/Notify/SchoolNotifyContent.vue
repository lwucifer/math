<template>
  <div class="container">
      <div class="row wrap-notify-school">
        <div class="col-md-8">
            <div v-if="!isDeital">
                <div class="intro-text-school-menu-side">Thông báo chung</div>
                <div class="notify-item-school" v-for="(item,index) in 5" :key="index" @click="showDetailNotify">
                    <div class="circle-background">
                        <IconEmail24px class="fill-primary"/>
                    </div>
                    <div>
                        <p class="title-notify">Lịch trả bằng tốt nghiệp năm học 2018- 2019</p>
                        <p>Nhà trường thông báo lịch trả bằng năm học 2018- 2019. (Từ ngày 15/08/2018 đến 31/5/2019</p>
                        <p class="text-sub">01/06/2020</p>
                    </div>
                </div>
                <app-pagination
                    :pagination="pagination"
                    class="mt-5"
                />
            </div>
            <div v-else>
                <div class="d-flex">
                    <div class="circle-background mr-3">
                        <IconEmail24px class="fill-primary"/>
                    </div>
                    <div>
                        <p class="title-notify">Về việc dạy học và việc thu chi tài chính của Nhà trường trong thời gian dịch Covid-19.</p>
                        <p class="text-sub mt-3">01/06/2020</p>
                    </div>
                </div>
                <div class="my-5">
                    <strong>Tệp đính kèm: <a href="">TKB.pdf</a></strong>
                </div>
                <div>
                    Content
                </div>
                <div class="notify-other">
                    <div class="intro-text-school-menu-side" style="font-size: 16px;">Thông báo khác</div>
                    <div class="d-flex align-items-center mb-4" v-for="(item,index) in 5" :key="index">
                        <IconEllipse2 class="mr-3"/>
                        <span class="">Lịch trả bằng tốt nghiệp năm học 2018- 2019</span>
                        <span class="ml-auto text-sub">06.09.2018</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <SchoolMenuSideNotify/>
        </div>
    </div>
  </div>
</template>

<script>
import SchoolMenuSideNotify from "~/components/page/school/Notify/SchoolMenuSideNotify"
import IconEmail24px from '~/assets/svg/v2-icons/email_24px.svg?inline';
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';
export default {
    components:{
        SchoolMenuSideNotify,
        IconEmail24px,
        IconEllipse2
    },
    data(){
        return{
            isDeital:false,
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
        showDetailNotify(){
            this.isDeital = true;
        }
    }
}
</script>

<style lang="scss">
@import "~assets/scss/components/school/_notify-school.scss";
</style>