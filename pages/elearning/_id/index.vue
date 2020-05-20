<template>
  <VclFacebook v-if="pageLoading"></VclFacebook>
  <div class="container elearning-view" v-else>
    <breadcrumb />

    <div class="row">
      <div class="col-md-8">
        <ElearningViewInfo />

        <!-- <ElearningMainMenu /> -->

        <ElearningIntroduce />

        <ElearningContent />

        <CourseTeacherInfo />

        <ElearningReview />

        <ElearningSliderTab
          class="mt-6"
          :content="get(lectures_of_teacher, 'content', [])"
          :swiperOptions="sliderOptions"
          title="Bài giảng cùng giáo viên"
        />

        <ElearningSliderTab
          :content="get(lectures_related, 'content', [])"
          :swiperOptions="sliderOptions"
          title="Bài giảng liên quan"
          class="mt-6"
        />
      </div>

      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v7.0"
      ></script>

      <div class="col-md-4">
        <ElearningRightSide v-sticky sticky-offset="{ top: 90, bottom: 9 }" />
      </div>
    </div>
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
import { VclFacebook } from "vue-content-loading";

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
    ElearningContent,
    VclFacebook,
  },

  data() {
    return {
      pageLoading: true,
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 3,
        setWrapperSize: true,
        watchOverflow: true,
      },
    };
  },

  computed: {
    ...mapState("elearning/detail", {
      info: "info",
      lectures_of_teacher: "lectures_of_teacher",
      lectures_related: "lectures_related",
    }),

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
    },
  },

  async mounted() {
    const isDeviceIdExist = !!getDeviceID();
    !isDeviceIdExist && this.initFingerPrint();

    this.pageLoading = true;
    const options = {
      params: {
        elearning_id: get(this, "$route.params.id", ""),
        token: "true",
      },
    };
    await this.$store.dispatch("elearning/detail/getInfo", options);
    this.pageLoading = false;
  },

  watch: {
    info: {
      handler: function() {
        this.$store.dispatch("elearning/detail/getLectureOfTeacher");
        this.$store.dispatch("elearning/detail/getLecturesRelated");
        this.$store.dispatch("elearning/detail/getTeacher");
        this.$store.dispatch("elearning/detail/getProgram");
      },
      deep: true,
    },
  },

  methods: {
    get,

    initFingerPrint() {
      if (window.requestIdleCallback) {
        requestIdleCallback(getDeviceID);
      } else {
        setTimeout(getDeviceID, 500);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-id.scss";
</style>
