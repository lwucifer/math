<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
              <MyCourseSide/>
          </div>
          <div class="col-md-9">
              <sub-block-section 
                title="Tổng quan"
                class="mb-4"
              >
                   <template v-slot:content>
                       <div class="row wrap-general-study-space">
                           <div class="col-md-6 item">
                               <div class="top">
                                   <div class="d-flex">
                                        <span>Số bài giảng đã tham gia</span>
                                        <IconBookOpen1 class="ml-auto"/>
                                    </div>
                                    <h1>35</h1>
                               </div>
                           </div>
                           <div class="col-md-6 item">
                               <div class="top">
                                   <div class="d-flex">
                                        <span>Số khóa học đã tham gia</span>
                                        <IconData class="ml-auto"/>
                                    </div>
                                    <h1>35</h1>
                               </div>
                           </div>
                           <div class="col-md-6 item">
                               <div class="top">
                                   <div class="d-flex">
                                        <span>Tỷ lệ hoàn thành các bài giảng & khóa học</span>
                                        <IconList1 class="ml-auto"/>
                                    </div>
                                    <h1>35%</h1>
                               </div>
                           </div>
                           <div class="col-md-6 item">
                               <div class="top">
                                   <div class="d-flex">
                                        <span>Điểm trung bình</span>
                                        <IconGrade1 class="ml-auto"/>
                                    </div>
                                    <h1>5,5</h1>
                               </div>
                           </div>
                       </div>
                   </template>
              </sub-block-section>
              <ScheduleToday/>
              <GeneralExamExpiry/>
          </div>
      </div>
  </div>
</template>

<script>
import IconBookOpen1 from '~/assets/svg/icons/book-open1.svg?inline';
import IconData from "~/assets/svg/icons/data.svg?inline";
import IconList1 from '~/assets/svg/icons/list1.svg?inline';
import IconGrade1 from '~/assets/svg/icons/grade1.svg?inline';
import GeneralExamExpiry from "~/components/page/elearning/mycourses/GeneralExamExpiry"
import MyCourseSide from "~/components/page/elearning/mycourses/MyCourseSide"
import ScheduleToday from "~/components/page/elearning/mycourses/ScheduleToday"
import moment from 'moment';
export default {
    components:{
        IconBookOpen1,
        IconData,
        IconList1,
        IconGrade1,
        GeneralExamExpiry,
        MyCourseSide,
        ScheduleToday
    },
    methods:{
        getWeek(){
            const s = moment("2020-05-22");
            const tuesday = moment("2020-05-20").day("2")
            console.log(tuesday.format('D').toString())
            for(let i=1;i<7;i++){
                 const tuesday = moment("2020-05-20").day(i.toString())
                 console.log(tuesday.toString())
            }
        }
           
    },
    created(){
        this.getWeek();
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-my-courses-general.scss";
</style>