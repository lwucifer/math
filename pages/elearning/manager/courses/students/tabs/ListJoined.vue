<template>
  <div class="container">
    <student-manager-filter-form />
    <student-manager-table
      :heads="heads"
      :list="filterDataList.content"
      :pagination="filterDataList.page"
    />
  </div>
</template>

<script>
import StudentManagerFilterForm from "~/components/page/elearning/manager/student/StudentManagerFilterForm";
import StudentManagerTable from "~/components/page/elearning/manager/student/StudentManagerTable";
import { mapState } from "vuex";
const STORE_NAMESPACE = "elearning/teaching/elearning-participant";
export default {
  components: {
    StudentManagerFilterForm,
    StudentManagerTable
  },
  data() {
    return {
      heads: [
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
          text: ""
        }
      ],
      list: [
        {
          name: "Nguyễn Văn A",
          class: "10B",
          date: "19/10/2021",
          progress: "80",
          question: 0
        },
        {
          name: "Nguyễn Văn C",
          class: "10B",
          date: "19/10/2021",
          progress: "30",
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
    };
  },
  computed: {
    ...mapState(STORE_NAMESPACE, ["elearningParti"]),
    filterDataList() {
      return this.elearningParti ? this.elearningParti : {};
    }
  }
};
</script>

<style>
</style>