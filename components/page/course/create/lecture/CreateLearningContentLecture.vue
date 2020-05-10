<template>
  <div>
    <create-action :isShowAction="false" />
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h4 class="cc-panel__heading">
          Nội dung học tập 2
        </h4>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow">
              <EditCourseName :defaultName="get(this, 'general.name', '')" />
            </div>

            <div class="cc-box__head-right">
              <a
                @click="handleAddLesson($event)"
                class="d-flex align-items-center text-primary"
                v-if="!get(lessons, 'data.length', 0)"><IconAdd width="14px" height="14px" class="mr-2"/> Thêm chương</a>

              <button
                class="cc-box__btn cc-box__btn-collapse"
                @click="isShowDetailLesson = !isShowDetailLesson"
                v-if="get(lessons, 'data.length', 0)"
              >
                <IconAngleDown class="icon" v-if="!isShowDetailLesson" />
                <IconAngleUp class="icon" v-else />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <CreateLessonOfElearning
              v-if="isShowFormAddLesson"
              @refreshLessons="refreshLessons"
              @handleCancel="handleCancel"
              :lesson="lesson"
            />

            <fragment v-if="isShowDetailLesson">
              <LessonDetail
                v-for="lesson in get(lessons, 'data', [])"
                :key="lesson.id"
                :lesson="lesson"
                @handleEditLesson="handleEditLesson"
                @refreshLessons="refreshLessons"
              />
            </fragment>
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
import CreateLessonOfElearning from "~/components/page/course/create/lecture/CreateLessonOfElearning";
import LessonDetail from "~/components/page/course/create/common/LessonDetail";
import { mapState } from "vuex";
import { useEffect, getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { createPayloadAddCourse } from "~/models/course/AddCourse";
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
    CreateLessonOfElearning,
    LessonDetail,
    EditCourseName,
    IconAngleUp,
    IconAdd
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null,
      tabType: "video",
      tabVideo: "upload",
      tabDocument: "typing",
      tabAddDocument: "upload",
      isShowButtonAddLesson: false,
      isShowFormAddLesson: false,
      isShowDetailLesson: false,
      isEditCourseName: false,
      courseNameModel: "",
      lesson: null
    };
  },

  created() {
    this.fetchLesson();
  },

  watch: {
    lessons: {
      handler: function() {
        if (get(this, "lessons.data.length", 0)) {
          this.isShowButtonAddLesson = false;
          this.isShowFormAddLesson = false;
          this.isShowDetailLesson = true;
          return;
        }
        this.isShowButtonAddLesson = true;
        this.isShowFormAddLesson = false;
        this.isShowDetailLesson = false;
      },
      deep: true
    },
    general: {
      handler: function() {
        this.courseNameModel = get(this, "general.name", "");
      },
      deep: true
    }
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

    async handleSaveCourseName() {
      const data = {
        name: this.courseNameModel,
        elearning_id: getParamQuery("elearning_id")
      };
      const payload = createPayloadAddCourse(data);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.ADD}`,
        payload
      );

      if (get(result, "success", false)) {
        this.$toasted.success(get(result, "message", ""));
        this.isEditCourseName = false;
        const options = {
          params: {
            elearning_id: getParamQuery("elearning_id")
          }
        };
        this.$store.dispatch(
          `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.LIST}`,
          options
        );
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    },

    handleHideEditNameCourse() {
      this.isShowButtonEditNameCourse = false;
    },

    handleShowEditNameCourse() {
      this.isShowButtonEditNameCourse = true;
    },

    refreshLessons() {
      this.fetchLesson();
      this.getProgress();
    },

    getProgress() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id
        }
      };
      this.$store.dispatch(
        `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
        options
      );
    },

    fetchLesson() {
      const elearning_id = getParamQuery("elearning_id");
      if (elearning_id) {
        const options = {
          params: {
            elearning_id
          }
        };
        this.$store.dispatch(
          `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.LIST}`,
          options
        );
      }
    },

    handleEditLesson(lesson) {
      this.isShowButtonAddLesson = false;
      this.isShowFormAddLesson = true;
      this.isShowDetailLesson = false;
      this.lesson = lesson;
    },

    handleUploadChange(event) {
      this.avatar = Array.from(event.target.files);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
    },

    removeAvatar() {
      this.avatar = [];
    },

    changeTabType(type) {
      this.tabType = type;
    },

    changeTabVideo(type) {
      this.tabVideo = type;
    },

    changeTabDocument(type) {
      this.tabDocument = type;
    },

    changeTabAddDocument(type) {
      this.tabAddDocument = type;
    },

    handleAddLesson(e) {
      e.preventDefault();
      this.isShowFormAddLesson = !this.isShowFormAddLesson;
    },

    handleCancel() {
      const elearning_id = getParamQuery("elearning_id");
      if (elearning_id && get(this, "lessons.data.length", 0)) {
        this.isShowButtonAddLesson = false;
        this.isShowFormAddLesson = false;
        this.isShowDetailLesson = true;
        return;
      }
      this.isShowButtonAddLesson = true;
      this.isShowFormAddLesson = false;
      this.isShowDetailLesson = false;
    },

    editCourseName() {
      this.isEditCourseName = true;
      this.courseNameModel = get(this.general, "name", "");

      const timeout = setTimeout(() => {
        this.$refs.inputCourseName.focus();
        clearTimeout(timeout);
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
