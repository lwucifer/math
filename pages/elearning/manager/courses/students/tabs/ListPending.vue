<template>
  <div class="container">
    <student-manager-filter-form />
    <student-manager-table :heads="heads" :list="list" :pagination="pagination" />
  </div>
</template>

<script>
import StudentManagerFilterForm from "~/components/page/elearning/manager/student/StudentManagerFilterForm";
import StudentManagerTable from "~/components/page/elearning/manager/student/StudentManagerTable";
import { mapState, mapActions } from "vuex";
const STORE_TEACHING_REQUEST = "elearning/teaching/request";
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
          name: "confirm",
          text: ""
        }
      ],
      list: [
        {
          name: "Nguyễn Văn A",
          class: "10B",
          date: "19/10/2021",
          progress: "50",
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
    ...mapState(STORE_TEACHING_REQUEST, ["elearningRequest"])
  }
};
</script>

<style>
</style>