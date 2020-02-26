<template>
  <div class="container">
    <div>
      <school-filter
        title="Danh sách trường học"
        :provinces="provinces"
        :districts="districts"
        :villages="villages"
        :school-types="schoolTypes"
      >
      </school-filter>
      <!--Detail school types-->
      <div v-for="(item, index) in list" :key="index">
        <school-list-box
          :id="item.id"
          :name="item.name"
          :school-num="item.schoolNum"
          :teacher-num="item.teacherNum"
          :student-num="item.studentNum"
          :items="item.list"
          @showAll="showAll"
        >
        </school-list-box>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolFilter from "~/components/page/school/SchoolFilter";
import SchoolListBox from "~/components/page/school/SchoolListBox";
import { mapState } from "vuex";
// Import faked data
import {
  VILLAGES,
  DISTRICTS,
  PROVINCES,
  SCHOOL_TYPES,
  SCHOOL_TYPE_DETAILS
} from "~/server/fakedata/school/test";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "School",

  watchQuery: ["school_id"],

  components: {
    SchoolFilter,
    SchoolListBox
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/school-summary/${actionTypes.ELEARNING_SCHOOL_SUMMARY.LIST}`
    );
  },

  data() {
    return {
      isAuthenticated: true,
      provinces: PROVINCES,
      districts: DISTRICTS,
      villages: VILLAGES,
      schoolTypes: SCHOOL_TYPES,
      list: SCHOOL_TYPE_DETAILS
    };
  },

  computed: {
    // ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/school-summary", ["elearningSchoolSummary"]),
    // classes() {
    //     return {
    //         "col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4": !this.isAuthenticated,
    //         "col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4": this.isAuthenticated
    //     };
    // }
  },

  created() {
    console.log(this.elearningSchoolSummary)
  },

  watch: {},

  methods: {
    showAll(id) {
      console.log("[Page School] show all a type of school: ", id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school.scss";
</style>
