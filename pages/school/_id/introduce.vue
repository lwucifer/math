<template>
  <div class="container mb-6">
    <div v-if="!pageLoading">
      <!-- <breadcrumb /> -->

      <SchoolSummary :school="school"/>
      <ListScrollTo/>
      <SchoolIntroduceContent/>
    </div>
  </div>
</template>

<script>
import SchoolSummary from "~/components/page/school/SchoolSummary";
import ListScrollTo from "~/components/page/school/ListScrollTo";
import SchoolIntroduceContent from "~/components/page/school/Introduce/SchoolIntroduceContent";


import IconArrowForwardIos from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES, SUBJECT_CODE } from "~/utils/constants";
import { get } from "lodash";

export default {
  watchQuery: ["school_id"],

  components: {
    SchoolSummary,
    ListScrollTo,
    SchoolIntroduceContent
  },

  async fetch({ params, query, store }) {
    const school_id = params.id;
    const data = { school_id };
    await store.dispatch(
      `elearning/school/school-info/${actionTypes.SCHOOL_INFO.INFO}`,
      data
    );

    const getNewestLecture = () =>
      store.dispatch(
        `elearning/public/public-newest/${actionTypes.ELEARNING_PUBLIC_NEWEST.LIST_LECTURE}`,
        {
          params: {
            type: ELEARNING_TYPES.LECTURE
          }
        }
      );

    const getNewestCourse = () =>
      store.dispatch(
        `elearning/public/public-newest/${actionTypes.ELEARNING_PUBLIC_NEWEST.LIST_COURSE}`,
        {
          params: {
            type: ELEARNING_TYPES.COURSE
          }
        }
      );
    
    return await Promise.all([
      getNewestLecture(),
      getNewestCourse()
    ]);
  },

  data() {
    return {
      pageLoading: true
    };
  },
  computed: {
    ...mapState("elearning/school/school-info", { school: "schoolInfo" }),

    ...mapState("elearning/public/public-newest", [
      "newestLecture",
      "newestCourse"
    ]),
  },

  mounted() {
    this.pageLoading = false;
  },

  watch: {},

  methods: {
    get,
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/pages/school/id/_school-id.scss";
@import "~assets/scss/components/school/_introduce-school.scss";
</style>
