<template>
  <div class="container elearning-view">
    <div class="row">
      <div class="col-md-8">
        <ElearningViewInfo :info="info" />

        <ElearningMainMenu />

        <ElearningIntroduce :info="info" />

        <ElearningContent :program="program" :info="info" />

        <div class="box">
          <CourseTeacherInfo :teacher_id="get(info, 'teacher.id', '')" class="mb-3" />

          <hr class="mt-3 mb-4" />

          <ElearningReview :info="info" />
        </div>
      </div>

      <div class="col-md-4">
        <ElearningRightSide v-sticky sticky-offset="top" v-bind="{ info, program }" />
      </div>
    </div>

    <ElearningSliderTab
      class="mt-4"
      :content="teacherEls"
      :swiperOptions="sliderOptions"
      title="Bài giảng cùng giáo viên"
    />

    <ElearningSliderTab
      :content="relatedCourses"
      :swiperOptions="sliderOptions"
      title="Bài giảng liên quan"
      class="mt-5"
    />
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES } from "~/utils/constants";
import { getDeviceID } from "~/utils/common";

import InfoService from "~/services/elearning/public/Info";
import LevelService from "~/services/elearning/public/Level";
import SubjectService from "~/services/elearning/public/Subject";
import ProgramService from "~/services/elearning/public/Program";
import RelatedService from "~/services/elearning/public/Related";
import TeacherEls from "~/services/elearning/public/TeacherEls";

import CourseTeacherInfo from "~/components/page/course/CourseTeacherInfo";
import ElearningSliderTab from "~/components/page/elearning/ElearningSliderTab";
import ElearningReview from "~/components/page/elearning/ElearningReview";
import ElearningRightSide from "~/components/page/elearning/ElearningRightSide";
import ElearningViewInfo from "~/components/page/elearning/ElearningViewInfo";
import ElearningMainMenu from "~/components/page/elearning/ElearningMainMenu";
import ElearningIntroduce from "~/components/page/elearning/ElearningIntroduce";
import ElearningContent from "~/components/page/elearning/ElearningContent";

import IconEye from "~/assets/svg/icons/eye.svg?inline";
import IconPlayO from "~/assets/svg/icons/play-o.svg?inline";
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
const IconCheckCircle = () =>
  import("~/assets/svg/icons/check-circle.svg?inline");
const IconFileAlt = () =>
  import("~/assets/svg/design-icons/file-alt.svg?inline");
const IconPlayCircle = () =>
  import("~/assets/svg/design-icons/play-circle.svg?inline");

export default {
  name: "E-learningDetail",

  components: {
    CourseTeacherInfo,
    ElearningSliderTab,
    ElearningReview,
    ElearningRightSide,
    IconEye,
    IconPlayO,
    IconBooks,
    IconDownload,
    IconCheckCircle,
    IconAngleDown,
    IconFileAlt,
    IconPlayCircle,
    ElearningViewInfo,
    ElearningMainMenu,
    ElearningIntroduce,
    ElearningContent
  },

  created() {
    this.getData();
  },

  data() {
    return {
      info: null,
      levels: [],
      subjects: [],
      program: [],
      relatedCourses: [],
      teacherEls: [],
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        watchOverflow: true
      }
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),

    typeText() {
      if (this.info) {
        switch (this.info.type) {
          case ELEARNING_TYPES.LECTURE:
            return "bài giảng";
            break;
          case ELEARNING_TYPES.COURSE:
            return "khoá học";
            break;
          default:
            break;
        }
      }
    }
  },

  mounted() {
    
    // check whether device_id is set or not?
    const isDeviceIdExist = !!getDeviceID();
    !isDeviceIdExist && this.initFingerPrint();

    // window.addEventListener("scroll", this.bindScrollStatus);
    // if (this.$route.hash && process.browser) {
    //   const hashEl = document.querySelector(this.$route.hash);
    //   hashEl && this.scrollTo(this.$route.hash);
    // }
  },

  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.bindScrollStatus);
  // },

  watch: {
    "info.teacher.id": {
      handler: async function() {
        const teacher_id = get(this, "info.teacher.id", "");
        const options = {
          params: {
            teacher_id
          }
        };
        const res = await new TeacherEls(this.$axios)[actionTypes.BASE.LIST](
          options
        );
        if (get(res, "success", false) === true) {
          this.teacherEls = get(res, "data.content", []);
          return;
        }
        this.teacherEls = [];
      }
    }
  },

  methods: {
    get,

    async getData() {
      const elearning_id = get(this, "$route.params.id", "");

      const getInfo = () =>
        new InfoService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id
          }
        });
      const getProgram = () =>
        new ProgramService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id
          }
        });
      const getRelatedCourses = () =>
        new RelatedService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id
          }
        });

      const data = await Promise.all([
        getInfo(),
        getProgram(),
        getRelatedCourses()
      ]);

      this.info = get(data, "0.data", null);
      this.program = get(data, "1.data", []);
      this.relatedCourses = get(data, "2.data.content", []);
    },

    initFingerPrint() {
      console.log("[initFingerPrint]", window.requestIdleCallback);
      if (window.requestIdleCallback) {
        requestIdleCallback(getDeviceID);
      } else {
        setTimeout(getDeviceID, 500);
      }
    }

    // bindScrollStatus(event) {
    //   const navLink = document.querySelector(".elearning-view__main-nav");
    //   const link = document.querySelectorAll('.scroll-link[href^="#"]');
    //   const target = document.getElementsByClassName("scroll-target");
    //   const scrollDistance = window.scrollY + navLink.clientHeight;

    //   for (const el of target) {
    //     const react = el.getBoundingClientRect();

    //     if (window.scrollY + react.top <= scrollDistance + 1) {
    //       Array.from(link).forEach((linkEl) => {
    //         const activeLink = document.querySelector(
    //           `.scroll-link[href="#${el.id}"]`
    //         );
    //         linkEl.classList.remove("active");
    //         activeLink.classList.add("active");
    //       });
    //     }
    //   }
    // },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-id.scss";
</style>
