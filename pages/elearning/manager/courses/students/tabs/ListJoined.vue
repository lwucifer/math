<template>
  <div class="container">
    <student-manager-filter-form @submitSearch="submitSearch" @changedType="changedType" />
    <student-manager-table
      :heads="heads"
      :list="filterDataList.content"
      :pagination="filterPagination"
    />
  </div>
</template>

<script>
import StudentManagerFilterForm from "~/components/page/elearning/manager/student/StudentManagerFilterForm";
import StudentManagerTable from "~/components/page/elearning/manager/student/StudentManagerTable";
import { mapState, mapActions } from "vuex";
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
    },
    filterPagination() {
      return {
        size:
          this.elearningParti && this.elearningParti.size
            ? this.elearningParti.size
            : 10,
        totalPages:
          this.elearningParti && this.elearningParti.totalPages
            ? this.elearningParti.totalPages
            : 1,
        totalElements:
          this.elearningParti && this.elearningParti.total_elements
            ? this.elearningParti.total_elements
            : 0,
        first:
          this.elearningParti && this.elearningParti.first
            ? this.elearningParti.first
            : 1,
        last:
          this.elearningParti && this.elearningParti.last
            ? this.elearningParti.last
            : 1,
        numberOfElements:
          this.elearningParti && this.elearningParti.number_of_elements
            ? this.elearningParti.number_of_elements
            : 0,
        number:
          this.elearningParti && this.elearningParti.number
            ? this.elearningParti.number
            : 0
      };
    }
  },
  methods: {
    ...mapActions(STORE_NAMESPACE, ["teachingElearningList"]),
    submitSearch(keyword) {
      // this.keyword = keyword;
      const query = {
        params: {
          keyword: keyword,
          elearning_id: this.$route.query.elearning_id
        }
      };
      this.teachingElearningList(query);
    },
    changedType(classes) {
      console.log("classes", classes);
      if (classes == "Khác") {
        const query = {
          params: {
            khac: true,
            elearning_id: this.$route.query.elearning_id
          }
        };
        this.teachingElearningList(query);
      } else {
        const query = {
          params: {
            class_id: classes,
            elearning_id: this.$route.query.elearning_id
          }
        };
        this.teachingElearningList(query);
      }
    }
  }
};
</script>

<style>
</style>