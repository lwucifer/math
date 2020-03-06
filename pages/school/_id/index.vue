<template>
  <div class="container mb-6">
    <div>
      <div class="top" v-if="isDepartment">
        <app-button square>
          <span class>Quản lý trường học</span>
        </app-button>
      </div>

      <school-summary :school="schoolInfo" />

      <school-lesson-slider
        :lessons="get(lessons, 'content', [])"
        :swiperOptions="sliderOptions"
        title="Bài giảng của trường"
      />

      <school-course-slider
        :cources="get(courses, 'content', [])"
        :swiperOptions="sliderOptions"
        title="Khóa học của trường"
      />
    </div>
  </div>
</template>

<script>
import SchoolSummary from "~/components/page/school/SchoolSummary";
import SchoolLessonSlider from "~/components/page/school/SchoolLessonSlider";
import SchoolCourseSlider from "~/components/page/school/SchoolCourseSlider";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
// Import faked data
import {
  SCHOOL_SUMMARY,
  LESSONS,
  COURSES
} from "~/server/fakedata/school/test";
import { get } from "lodash";

const elearningSchoolInfoStorePath = "elearning/school/school-info";

export default {
  watchQuery: ["school_id"],

  components: {
    SchoolSummary,
    SchoolLessonSlider,
    SchoolCourseSlider
  },

  async fetch({ params, query, store }) {
    const school_id = "e698a8ea-4e12-11ea-b77f-2e728ce88125";
    const data = { school_id };
    await store.dispatch(
      `${elearningSchoolInfoStorePath}/${actionTypes.SCHOOL_INFO.INFO}`,
      data
    );
    const options_sources = {
      params: {
        school_id,
        elearning_type: "COURCE",
        size: 5
      }
    };
    await store.dispatch(
      `elearning/school/school-elearning/${actionTypes.SCHOOL_ELEARNING.LIST}`,
      options_sources
    );
    const options_lecture = {
      params: {
        school_id,
        elearning_type: "LECTURE",
        size: 5
      }
    };
    await store.dispatch(
      `elearning/school/school-elearning/${actionTypes.SCHOOL_ELEARNING.LIST}`,
      options_lecture
    );
  },

  data() {
    return {
      isAuthenticated: true,
      isDepartment: true,
      school: SCHOOL_SUMMARY,
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: false,
        navigation: false,
        // pagination: {
        //     el: ".swiper-pagination"
        // },
        pagination: false,
        showName: true
      }
      // lessons: LESSONS,
      // courses: COURSES
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(elearningSchoolInfoStorePath, ["schoolInfo"]),
    ...mapState(`elearning/school/school-elearning`, {
      courses: "source",
      lessons: "lecture"
    })
  },

  watch: {},

  methods: {
    get
  }
};
</script>

<style lang="scss" scoped>
.top {
  text-align: right;
  padding: 2rem 2rem 0 2rem;
  background: #ffffff;
  button {
    font-size: 1.4rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}
</style>
