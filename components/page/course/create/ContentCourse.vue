<template>
  <div>
    <!-- STEP 1 -->
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h4 class="cc-panel__heading">
          Nội dung học tập
        </h4>
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
                <IconAdd width="14px" height="14px" class="mr-2" />&nbsp;Thêm
                chương
              </a>
            </div>
          </div>

          <div class="cc-box__body">
            <CreateChapter
              v-if="isShowFormAddChapter"
              @handleCancelAddChapter="handleCancelAddChapter"
              @handleCreateChapterSuccess="handleCreateChapterSuccess"
            />

            <ListChapter />
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
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconVideo = () => import("~/assets/svg/design-icons/video.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
const IconCheck = () => import("~/assets/svg/design-icons/check.svg?inline");
const IconTimes = () => import("~/assets/svg/design-icons/times.svg?inline");
const IconAdd = () => import("~/assets/svg/v2-icons/add_green.svg?inline");

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
    IconAngleUp,
    IconAdd,
  },

  data() {
    return {
      isShowFormAddChapter: false,
      isShowEditCourse: false,
    };
  },

  mounted() {
    this.$store.dispatch(`elearning/create/getContent`);
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
    }),
  },

  methods: {
    get,

    handleCreateChapterSuccess() {
      this.isShowFormAddChapter = false;
    },

    handleShowAddChapter() {
      this.isShowFormAddChapter = !this.isShowFormAddChapter;
    },

    handleCancelAddChapter() {
      this.isShowFormAddChapter = false;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
