<template>
  <div>
    <create-action :isShowAction="false" />

    <!-- STEP 1 -->
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <EditCourseName :defaultName="get(this, 'general.name', '')" />
            </div>

            <div class="cc-box__head-right">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="handleShowAddChapter"
              >
                <IconPlusCircle class="icon subheading" />&nbsp;Thêm chương
              </a>
              <button class="cc-box__btn cc-box__btn-collapse" @click="isShowChapter=!isShowChapter">
                <IconAngleDown class="icon" v-if="!isShowChapter"/>
                <IconAngleUp class="icon" v-else/>
              </button>
            </div>
          </div>

          <div class="cc-box__body" v-if="isShowChapter">
            <CreateChapter
              v-if="isShowFormAddChapter"
              @handleCancelAddChapter="handleCancelAddChapter"
            />

            <ListChapter @handleAddLesson="handleAddLesson" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBase64 } from "~/utils/common";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconVideo = () => import("~/assets/svg/design-icons/video.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
const IconCheck = () => import("~/assets/svg/design-icons/check.svg?inline");
const IconTimes = () => import("~/assets/svg/design-icons/times.svg?inline");
import CreateAction from "~/components/page/course/create/common/CreateAction";
import LessonDetail from "~/components/page/course/create/common/LessonDetail";
import { mapState } from "vuex";
import { useEffect, getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import CreateChapter from "~/components/page/course/create/course/CreateChapter";
import ListChapter from "~/components/page/course/create/course/ListChapter";
import EditCourseName from "~/components/page/course/create/common/EditCourseName";

export default {
  components: {
    IconCamera,
    IconClose,
    IconEditAlt,
    IconAngleDown,
    IconPlus,
    IconPlusCircle,
    IconVideo,
    IconFileBlank,
    IconTrashAlt,
    IconCheck,
    IconTimes,
    CreateAction,
    LessonDetail,
    CreateChapter,
    ListChapter,
    EditCourseName,
    IconAngleUp
  },

  data() {
    return {
      isShowFormAddChapter: false,
      isShowEditCourse: false,
      isShowChapter:true
    };
  },

  created() {
    //
  },

  computed: {
    ...mapState("elearning/creating/creating-lesson", {
      lessons: "lessons"
    }),
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  methods: {
    get,

    handleAddLesson(chapter) {
      this.chapter = chapter;
      this.isShowCreateLessonOfChapter = true;
    },

    handleCancelAddLesson() {
      this.isShowCreateLessonOfChapter = false;
      this.chapter = null;
    },

    handleShowAddChapter() {
      this.isShowFormAddChapter = !this.isShowFormAddChapter;
    },

    handleCancelAddChapter() {
      this.isShowFormAddChapter = false;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
