<template>
  <div
    class="cc-box__bg-gray cc-box__nested px-4 pt-3 pb-4"
    id="create-lesson-of-chapter"
  >
    <h3 class="heading-6 mb-2 mt-3">Tên bài học</h3>
    <app-input :counter="60" placeholder="Tên bài học" v-model="payload.name" />

    <span>Chọn loại bài học</span>

    <app-divider class="mt-3 mb-4" />

    <div class="clc-type-tabs">
      <a
        href
        class="clc-type-tab-item"
        :class="{ active: tabType === 'video' }"
        @click.prevent="changeTabType('video')"
      >
        <span class="clc-type-tab-item__icon">
          <IconVideo class="icon" />
        </span>
        <span class="clc-type-tab-item__text">Video</span>
      </a>

      <a
        href
        class="clc-type-tab-item"
        :class="{ active: tabType === 'document' }"
        @click.prevent="changeTabType('document')"
      >
        <span class="clc-type-tab-item__icon">
          <IconFileBlank class="icon" />
        </span>
        <span class="clc-type-tab-item__text">Văn bản</span>
      </a>
    </div>

    <app-divider class="my-4" />

    <LessonSelectVideo
      @handleSelectFile="handleSelectFile"
      @handleSelectUrl="handleSelectUrl"
      v-if="tabType === 'video'"
    />

    <LessonSelectDocument
      v-if="tabType === 'document'"
      @handleSelectDocument="handleSelectDocument"
    />

    <div class="d-flex justify-content-end mt-4">
      <app-button
        class="clc-btn font-weight-semi-bold mr-4"
        size="sm"
        color="disabled"
        square
        @click="handleCancel"
        >Huỷ bỏ</app-button
      >
      <app-button
        class="clc-btn font-weight-semi-bold"
        size="sm"
        square
        @click="handleAddContent"
        >{{ edit ? "Sửa" : "Thêm" }} bài học</app-button
      >
    </div>

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
    />
  </div>
</template>

<script>
import { getBase64, getParamQuery, useEffect } from "~/utils/common";
import { get } from "lodash";
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
import CreateAction from "~/components/page/course/create/common/CreateAction";
import LessonSelectVideo from "~/components/page/course/create/common/LessonSelectVideo";
import LessonSelectDocument from "~/components/page/course/create/common/LessonSelectDocument";
import { createPayloadAddContentCourse } from "~/models/course/AddCourse";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";

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
    CreateAction,
    LessonSelectVideo,
    LessonSelectDocument
  },

  props: {
    chapter: {
      type: Object,
      default: null
    },
    indexCreateLesson: {
      type: Number,
      default: 0
    },
    lesson: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      tabType: "video",
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        chapter_id: get(this, "chapter.id", ""),
        index: this.indexCreateLesson,
        lesson: "",
        name: "",
        type: "VIDEO", // VIDEO | ARTICLE | PDF | DOC | TXT
        repository_file_id: "",
        article_content: "",
        id: ""
      }
    };
  },

  created() {
    useEffect(this, this.handleChangeLesson.bind(this), ["lesson"]);
  },

  computed: {
    edit() {
      return !!get(this, "lesson.id", "");
    }
  },

  methods: {
    handleChangeLesson() {
      if (get(this, "lesson.name", "")) {
        this.payload.name = get(this, "lesson.name", "");
      }
      if (get(this, "lesson.id", "")) {
        this.payload.id = get(this, "lesson.id", "");
      }
    },

    changeTabType(type) {
      this.tabType = type;
    },

    handleSelectFile(data) {
      this.payload.type = data.type;
      this.payload.lesson = data.lesson;
      this.payload.repository_file_id = "";
    },

    handleSelectUrl(file) {
      this.payload.type = file.type;
      this.payload.lesson = "";
      this.payload.repository_file_id = file.id;
    },

    handleAddContent() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;

      this.payload.index = this.indexCreateLesson;
      this.payload.chapter_id = get(this, "chapter.id", "");
      this.payload.id = get(this, "lesson.id", "");
      const payload = createPayloadAddContentCourse(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.ADD}`,
        payload
      );

      this.handleCancelModal();

      if (get(result, "success", false)) {
        this.$emit("refreshLessons");
        this.$toasted.success(get(result, "message", ""));
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleSelectDocument(type, article_content, file_id, lesson) {
      this.payload.type = type;
      this.payload.lesson = lesson;
      this.payload.repository_file_id = file_id;
      this.payload.article_content = article_content;
    },

    handleCancel() {
      this.$emit("handleCancel");
    },

    get
  }
};
</script>
