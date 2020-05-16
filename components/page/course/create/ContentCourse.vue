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
          <div
            class="cc-box__head"
            style="padding: 1.5rem"
            :class="{
              'add-border-bottom':
                isShowFormAddChapter || get(chapters, 'length', 0),
            }"
          >
            <div class="cc-box__head-left flex-grow mr-4">
              <EditCourseName :defaultName="get(this, 'general.name', '')" />
            </div>

            <div class="cc-box__head-right">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="toggleAddChapter"
              >
                <IconAdd width="14px" height="14px" class="mr-2" />&nbsp;Thêm
                chương
              </a>
            </div>
          </div>

          <div class="cc-box__body">
            <CreateChapter
              v-if="isShowFormAddChapter"
              @cancel="toggleAddChapter"
            />

            <ListChapter />
          </div>
        </div>
      </div>

      <div class="create-action pt-5">
        <div class="create-action__right d-flex align-items-center">
          <!-- <app-button
            outline
            class="mr-4"
            color="error"
            ><IconDelete class="mr-2" /> Thiết lập lại</app-button
          >
          <app-button
            class="mr-4"
            color="primary"
            outline
            ><IconSave class="mr-2" /> Lưu nháp</app-button
          > -->
          <app-button
            class="create-action__btn mr-4"
            @click="handleNextStep"
            :disabled="!isNextStep"
            ><Forward class="mr-2" /> Lưu & Tiếp tục</app-button
          >
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
import IconDelete from "~/assets/svg/v2-icons/delete_sweep_2.svg?inline";
import IconSave from "~/assets/svg/v2-icons/save_24px.svg?inline";
import Forward from "~/assets/svg/v2-icons/forward_2.svg?inline";

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
    IconDelete,
    IconSave,
    Forward,
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
      progress: "progress",
      chapters: "chapters",
    }),
    isNextStep() {
      if (get(this, "progress.general_status", false) != 1) return false;
      if (get(this, "progress.content_status", false) != 1) return false;
      return true;
    },
  },

  methods: {
    get,

    handleNextStep() {
      this.$emit("nextStep", "settings");
    },

    toggleAddChapter() {
      this.isShowFormAddChapter = !this.isShowFormAddChapter;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
