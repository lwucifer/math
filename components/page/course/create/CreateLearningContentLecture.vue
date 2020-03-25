<template>
  <div>
    <create-action type="add_contents" />
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow">
              <EditCourseName :defaultName="get(this, 'general.name', '')" />
            </div>

            <div class="cc-box__head-right" v-if="isShowButtonAddLesson">
              <a @click="handleAddLesson($event)" href
                >Thêm nội dung bài giảng</a
              >
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <AddContent
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
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconVideo = () => import("~/assets/svg/design-icons/video.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
const IconCheck = () => import("~/assets/svg/design-icons/check.svg?inline");
const IconTimes = () => import("~/assets/svg/design-icons/times.svg?inline");
import CreateAction from "~/components/page/course/create/CreateAction";
import AddContent from "~/components/page/course/create/AddContent";
import LessonDetail from "~/components/page/course/create/LessonDetail";
import { mapState } from "vuex";
import { useEffect, getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { createPayloadAddCourse } from "~/models/course/AddCourse";
import EditCourseName from "~/components/page/course/create/EditCourseName";

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
    AddContent,
    LessonDetail,
    EditCourseName
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
    useEffect(this, this.setInitData.bind(this), ["lessons.data"]);
    useEffect(this, this.handleChangeGeneral.bind(this), ["general.id"]);
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

    handleChangeGeneral() {
      this.courseNameModel = get(this, "general.name", "");
    },

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

    setInitData() {
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

    refreshLessons() {
      this.fetchLesson();
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
      this.isShowButtonAdd = false;
      this.isShowFormAddLesson = !this.isShowFormAddLesson;
      e.preventDefault();
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

    // cancelEditCourseName() {
    //   this.isEditCourseName = false;
    // }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
