<template>
  <div class="container">
      <student-manager-filter-form/>
      <hr class="my-4">
      <student-manager-table
        :heads="heads"
        :list="list"
        :pagination="pagination"
      />
  </div>
</template>

<script>
import StudentManagerFilterForm from "~/components/page/elearning/manager/student/StudentManagerFilterForm"
import StudentManagerTable from "~/components/page/elearning/manager/student/StudentManagerTable"
export default {
    components:{
        StudentManagerFilterForm,
        StudentManagerTable
    },
    data(){
        return{
            heads:[
                 {
                    name: "name",
                    text: "Học sinh"
                 },
                 {
                    name: "class",
                    text: "Lớp"
                 },
                 {
                    name: "date",
                    text: "Ngày tham gia"
                 },
                 {
                    name: "progress",
                    text: "Tiến độ học tập"
                 },
                 {
                    name: "question",
                    text: "Câu hỏi cho giáo viên"
                 },
                 {
                    name: "action",
                    text: "",
                 }
            ],
            list:[
                {
                    name:"Nguyễn Văn A",
                    class:"10B",
                    date:"19/10/2021",
                    progress:"50",
                    question: 0
                }
            ],
            pagination: {
                totalElements: 0,
                last: false,
                totalPages: 1,
                size: 10,
                number: 0,
                first: true,
                numberOfElements: 0
            }
        }
    }
}
</script>

<style>

</style>