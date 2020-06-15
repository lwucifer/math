<template>
  <div class="container mb-6">
    <div v-if="!pageLoading">
      <!-- <breadcrumb /> -->

      <SchoolSummary :school="school"/>
      <ListScrollTo 
        @changeTab="changeTab"
        :tab="tab"
      />
      <div v-if="tab=='index'">
        <IntroSchool/>

        <div class="highlight" id="lesson">
          <ElearningHomeBox class="mb-0">
            <h2 slot="title" class="heading-3 font-weight-medium mb-4">Bài giảng nổi bật</h2>

            <AppCarouseSchool
              :options="{ slidesPerView: 4, spaceBetween: 24, preventClicksPropagation: false }"
            >
              <template slot="default" slot-scope="{ classes }">
                <div
                  v-for="item in newestLecture && newestLecture.content || []"
                  :key="item.id"
                  :class="classes"
                >
                  <CourseItem2 class="my-0" :item="item" :size="'sm'" />
                </div>
              </template>
            </AppCarouseSchool>
          </ElearningHomeBox>
        </div>

        <div class="highlight pt-0">
          <ElearningHomeBox>
            <h2 slot="title" class="heading-3 font-weight-medium mb-4">Khóa học nổi bật</h2>

            <AppCarouseSchool
              :options="{ slidesPerView: 4, spaceBetween: 24, preventClicksPropagation: false }"
            >
              <template slot="default" slot-scope="{ classes }">
                <div
                  v-for="item in newestCourse && newestCourse.content || []"
                  :key="item.id"
                  :class="classes"
                >
                  <CourseItem2 class="my-0" :item="item" :size="'sm'" />
                </div>
              </template>
            </AppCarouseSchool>
          </ElearningHomeBox>
        </div>

        <DataSchool/>
        <ListTeacher/>
        <SchoolNoti/>
        <SchoolNews/>
        <SchoolLink/>
      </div>
      <SchoolIntroduceContent v-else-if="tab=='intro'"/>
      <SchoolNotifyContent v-else-if="tab=='notify'"/>
      <SchoolNewsContent v-else-if="tab=='news'"/>
      <SchoolScheduleContent v-else-if="tab=='schedule'"/>
    </div>
  </div>
</template>

<script>
import SchoolSummary from "~/components/page/school/SchoolSummary";
import ListScrollTo from "~/components/page/school/ListScrollTo";
import IntroSchool from "~/components/page/school/IntroSchool";
import ElearningHomeBox from "~/components/page/elearning/home/ElearningHomeBox";
import AppCarouseSchool from "~/components/page/school/AppCarouseSchool";
import CourseItem2 from "~/components/page/course/CourseItem2";
import DataSchool from "~/components/page/school/DataSchool";
import ListTeacher from "~/components/page/school/ListTeacher";
import SchoolNoti from "~/components/page/school/SchoolNoti";
import SchoolNews from "~/components/page/school/SchoolNews";
import SchoolLink from "~/components/page/school/SchoolLink";
import SchoolIntroduceContent from "~/components/page/school/Introduce/SchoolIntroduceContent";
import SchoolNotifyContent from "~/components/page/school/Notify/SchoolNotifyContent";
import SchoolNewsContent from "~/components/page/school/News/SchoolNewsContent";
import SchoolScheduleContent from "~/components/page/school/Schedule/SchoolScheduleContent";

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
    IntroSchool,
    ElearningHomeBox,
    AppCarouseSchool,
    CourseItem2,
    IconArrowForwardIos,
    DataSchool,
    ListTeacher,
    SchoolNoti,
    SchoolNews,
    SchoolLink,
    SchoolIntroduceContent,
    SchoolNotifyContent,
    SchoolNewsContent,
    SchoolScheduleContent
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
      pageLoading: true,
      tab:'index'
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
    changeTab(tab){
      this.tab = tab
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/pages/school/id/_school-id.scss";
</style>
