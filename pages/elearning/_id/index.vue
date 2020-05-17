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

      <div class="col-md-4">
        <ElearningRightSide v-sticky sticky-offset="{ top: 90, bottom: 9 }" />
      </div>
    </div>

    <app-modal-confirm 
      centered
      :width="476" 
      v-if="inputCode" 
      @cancel="closeModalInput"
      >
      
      <template #title>
        <h4 class="mb-3">Bài giảng riêng tư</h4>
      </template>

      <template #description>
        <p class="text-center mb-3">Vui lòng nhập mã riêng tư vào ô dưới đây để truy cập bài giảng</p>

        <app-input placeholder="Nhập mã"></app-input>
      </template>

      <template slot="actions" slot-scope="{ confirmLoading }">
          <app-button
            class="font-weight-semi-bold mr-3"
            color="default"
            outline
            @click="inputCode = false"
          >
            Hủy
          </app-button>

          <app-button
            class="font-weight-semi-bold"
            color="primary"
            :style="{ 'pointer-events': confirmLoading ? 'none' : '' }"
          >
            <app-spin v-if="confirmLoading" class="mr-3" color="white" size="small" />
            Xác nhận
          </app-button>

          <div class="mt-4 mess text-secondary font-italic text-left">Nếu bạn chưa có mã riêng tư để truy cập, bạn có thể gửi yêu cầu tham gia bài giảng tại đây</div>
      </template>
    </app-modal-confirm>


    <app-modal-notify 
      centered
      v-if="inputCodeSuccess"
      type="success" 
      title="Gửi yêu cầu thành công!"
      @ok="inputCodeSuccess = false"
      @close="closeModalNoti"/>
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
// import Breadcrumb from "~/components/layout/breadcrumb/BreadCrumb";
  import { VclFacebook } from 'vue-content-loading';


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
  // layout: "manage",

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
    // Breadcrumb,
    VclFacebook,
  },

  data() {
    return {
      // info: null,
      pageLoading: true,
      // levels: [],
      // subjects: [],
      // program: [],
      // relatedCourses: [],
      // teacherEls: [],
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 3,
        setWrapperSize: true,
        watchOverflow: true,
      },
      inputCode: false,
      inputCodeSuccess: false,
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

  // updated() {
  //   console.log(this.lectures_related);
  // },

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

    async getData() {
      const elearning_id = get(this, "$route.params.id", "");

      const params = {
        elearning_id,
        token: "true",
      };

      const getInfo = () =>
        this.$store.dispatch(
          `elearning/public/public-info/${actionTypes.ELEARNING_PUBLIC_INFO.LIST}`,
          params
        );

      const getProgram = () =>
        new ProgramService(this.$axios)[actionTypes.BASE.LIST]({
          params,
        });
      const getRelatedCourses = () =>
        new RelatedService(this.$axios)[actionTypes.BASE.LIST]({
          params,
        });

      this.pageLoading = true;

      const data = await Promise.all([
        getInfo(),
        getProgram(),
        getRelatedCourses(),
      ]);

      this.pageLoading = false;

      this.info = get(data, "0.data", {});
      this.program = get(data, "1.data", []);
      this.relatedCourses = get(data, "2.data.content", []);
    },

    initFingerPrint() {
      if (window.requestIdleCallback) {
        requestIdleCallback(getDeviceID);
      } else {
        setTimeout(getDeviceID, 500);
      }
    },

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

    closeModalNoti() {
      this.inputCodeSuccess = false
    },

    closeModalInput() {
      this.inputCode = false
    }
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-id.scss";
</style>
