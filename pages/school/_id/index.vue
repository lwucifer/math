<template>
  <div class="container mb-6">
    <div v-if="!pageLoading">
      <!-- <div class="top" v-if="isDepartment">
        <app-button square class="btn_link_manager">
          <n-link :to="'/school/manager/' + get(school, 'id', '')">
            <span class>Quản lý trường học</span>
          </n-link>
        </app-button>
      </div> -->

      <school-summary :school="school" />

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
    <VclFacebook v-else />
  </div>
</template>

<script>
import SchoolSummary from "~/components/page/school/SchoolSummary";
import SchoolLessonSlider from "~/components/page/school/SchoolLessonSlider";
import SchoolCourseSlider from "~/components/page/school/SchoolCourseSlider";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { VclFacebook } from "vue-content-loading";

// Import faked data
import {
  SCHOOL_SUMMARY,
  LESSONS,
  COURSES,
} from "~/server/fakedata/school/test";
import { get } from "lodash";

export default {
  watchQuery: ["school_id"],

  components: {
    SchoolSummary,
    SchoolLessonSlider,
    SchoolCourseSlider,
    VclFacebook,
  },

  async fetch({ params, query, store }) {
    const school_id = params.id;
    const data = { school_id };
    await store.dispatch(
      `elearning/school/school-info/${actionTypes.SCHOOL_INFO.INFO}`,
      data
    );
    const options_sources = {
      params: {
        school_id,
        elearning_type: "COURSE",
        size: 5,
        // status: "ACCEPTED",
      },
    };
    await store.dispatch(
      `elearning/school/school-elearning/${actionTypes.SCHOOL_ELEARNING.LIST}`,
      options_sources
    );
    const options_lecture = {
      params: {
        school_id,
        elearning_type: "LECTURE",
        size: 5,
        // status: "ACCEPTED",
      },
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
      // school: SCHOOL_SUMMARY,
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
        showName: true,
      },
      pageLoading: true,
      // lessonss: LESSONS,
      // courses: COURSES
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/school/school-info", { school: "schoolInfo" }),
    ...mapState(`elearning/school/school-elearning`, {
      courses: "course",
      lessons: "lecture",
    }),
  },

  mounted() {
    console.log(this.school, this.courses, this.lessons);
    this.pageLoading = false;
  },

  watch: {},

  methods: {
    get,
    showAll(params) {
      const options_showAll = {
        params: {
          school_id: this.$route.params.id,
          elearning_type: "COURSE",
        },
      };
      this.$store.dispatch(
        `elearning/school/school-elearning/${actionTypes.SCHOOL_ELEARNING.LIST}`,
        options_showAll
      );
    },
  },
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
.btn_link_manager {
  a {
    color: #ffffff;
    text-decoration: none;
  }
}
</style>
