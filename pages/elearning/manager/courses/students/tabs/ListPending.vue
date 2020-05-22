<template>
  <div class="container">
    <student-manager-filter-form />
    <student-manager-table
      :heads="heads"
      :list="filterElearningRequest"
      :pagination="filterPagination"
    />
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
          name: "request_date",
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
    ...mapState(STORE_TEACHING_REQUEST, ["elearningRequest"]),
    filterElearningRequest() {
      return this.elearningRequest && this.elearningRequest.content
        ? this.elearningRequest.content
        : [];
    },
    filterPagination() {
      return {
        size:
          this.elearningRequest && this.elearningRequest.size
            ? this.elearningRequest.size
            : 10,
        totalPages:
          this.elearningRequest && this.elearningRequest.totalPages
            ? this.elearningRequest.totalPages
            : 1,
        totalElements:
          this.elearningRequest && this.elearningRequest.total_elements
            ? this.elearningRequest.total_elements
            : 0,
        first:
          this.elearningRequest && this.elearningRequest.first
            ? this.elearningRequest.first
            : 1,
        last:
          this.elearningRequest && this.elearningRequest.last
            ? this.elearningRequest.last
            : 1,
        numberOfElements:
          this.elearningRequest && this.elearningRequest.number_of_elements
            ? this.elearningRequest.number_of_elements
            : 0,
        number:
          this.elearningRequest && this.elearningRequest.number
            ? this.elearningRequest.number
            : 0
      };
    }
  }
};
</script>

<style>
</style>