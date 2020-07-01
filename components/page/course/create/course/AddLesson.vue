<template>
  <div class="cc-box__bg-disable mb-4" id="create-lesson-of-chapter">
    <h3 class="heading-6 mb-2 mt-3">
      Tên bài học
      <span class="text-base font-weight-normal">(Tối đa 80 ký tự)</span>
    </h3>
    <app-input
      :class="{ 'mb-0': get(error, 'name', '') }"
      @onBlur="handleChangeName"
      :counter="80"
      placeholder="Tên bài học"
      v-model="payload.name"
    />
    <app-error :error="get(error, 'name', '')" class="mb-4"></app-error>

    <p class="text-center mb-4">Chọn loại bài học</p>

    <!-- <app-divider class="mt-3 mb-4" /> -->

    <div class="clc-type-tabs">
      <a
        href
        class="clc-type-tab-item"
        :class="{ active: tabType === 'audio' }"
        @click.prevent="changeTabType('audio')"
      >
        <span class="clc-type-tab-item__icon">
          <IconRadioButtonChecked class="icon mr-3" />
          <IconHeadphone class="icon mr-2 heading-3" />
          <span class="clc-type-tab-item__text">Audio</span>
        </span>
      </a>

      <a
        href
        class="clc-type-tab-item"
        :class="{ active: tabType === 'scorm' }"
        @click.prevent="changeTabType('scorm')"
      >
        <span class="clc-type-tab-item__icon">
          <IconRadioButtonChecked class="icon mr-3" />
          <IconScorm class="icon mr-2 heading-3" />
          <span class="clc-type-tab-item__text">SCORM</span>
        </span>
      </a>

      <a
        href
        class="clc-type-tab-item"
        :class="{ active: tabType === 'document' }"
        @click.prevent="changeTabType('document')"
      >
        <span class="clc-type-tab-item__icon">
          <IconRadioButtonChecked
            class="icon mr-2"
            style="width: 24px; height: 24px"
          />
          <IconFileBlank class="icon" />
          <span class="clc-type-tab-item__text">Văn bản</span>
        </span>
        <!-- <span class="clc-type-tab-item__text"></span> -->
      </a>

      <a
        href
        class="clc-type-tab-item"
        :class="{ active: tabType === 'video' }"
        @click.prevent="changeTabType('video')"
      >
        <span class="clc-type-tab-item__icon">
          <IconRadioButtonChecked class="icon mr-2" />
          <IconVideo class="icon mr-2" />
          <span class="clc-type-tab-item__text">Video</span>
        </span>
        <!-- <span class="clc-type-tab-item__text">Video</span> -->
      </a>
    </div>

    <app-divider class="my-4" />

    <LessonSelectAudio
      @handleSelectFile="handleSelectFile"
      @handleSelectUrl="handleSelectUrl"
      @handleReset="handleReset"
      :lesson="lesson"
      v-if="tabType === 'audio'"
    />

    <LessonSelectScorm
      @handleSelectFile="handleSelectFile"
      @handleSelectUrl="handleSelectUrl"
      @handleReset="handleReset"
      :lesson="lesson"
      v-if="tabType === 'scorm'"
    />

    <LessonSelectVideo
      @handleSelectFile="handleSelectFile"
      @handleSelectUrl="handleSelectUrl"
      v-if="tabType === 'video'"
      @handleReset="handleReset"
    />

    <LessonSelectDocument
      v-if="tabType === 'document'"
      @handleSelectDocument="handleSelectDocument"
      @handleSelectUrl="handleSelectUrl"
      @handleReset="handleReset"
      :lesson="lesson"
    />

    <app-error :error="get(error, 'content', '')"></app-error>

    <div class="d-flex justify-content-end mt-4">
      <app-button
        class="clc-btn font-weight-semi-bold text-secondary mr-4"
        size="md"
        color="default"
        outline
        @click="handleCancel"
        >Hủy</app-button
      >
      <app-button
        class="clc-btn font-weight-semi-bold"
        size="md"
        @click="handleAddContent"
        >{{ edit ? "Sửa" : "Thêm" }} bài học</app-button
      >
    </div>

    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
      :title="title"
      :description="description"
      :okText="okText"
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
import IconRadioButtonChecked from "~/assets/svg/design-icons/radio_button_checked.svg?inline";
import IconHeadphone from "~/assets/svg/v2-icons/headphones.svg?inline";
import IconScorm from "~/assets/svg/v2-icons/scorm.svg?inline";

const IconVideo = () => import("~/assets/svg/design-icons/video.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");

import CreateAction from "~/components/page/course/create/common/CreateAction";
import LessonSelectVideo from "~/components/page/course/create/common/LessonSelectVideo";
import LessonSelectDocument from "~/components/page/course/create/common/LessonSelectDocument";
import LessonSelectScorm from "~/components/page/course/create/common/LessonSelectScorm";
import LessonSelectAudio from "~/components/page/course/create/common/LessonSelectAudio";
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
    LessonSelectDocument,
    IconRadioButtonChecked,
    IconHeadphone,
    IconScorm,
    LessonSelectScorm,
    LessonSelectAudio,
  },

  props: {
    chapter: {
      type: Object,
      default: null,
    },
    lesson: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      tabType: "video",
      showModalConfirm: false,
      confirmLoading: false,
      noLesson: get(this, "chapter.lessons", "").length,
      payload: {
        chapter_id: get(this, "chapter.id", ""),
        lesson: "",
        name: get(this, "lesson.name", ""),
        type: "VIDEO", // VIDEO | ARTICLE | PDF | DOC | TXT
        repository_file_id: "",
        article_content: "",
        id: get(this, "lesson.id", ""),
      },
      modalType: "",
      error: {
        name: "",
        content: "",
      },
    };
  },

  mounted() {
    useEffect(this, this.handleChangeLesson.bind(this), ["lesson"]);
  },

  computed: {
    edit() {
      return !!get(this, "lesson.id", "");
    },

    okText() {
      if (this.confirmLoading) {
        return "Đang tải";
      }
      return "Xác nhận";
    },

    title() {
      if (this.edit || this.confirmLoading) {
        return "Xác nhận";
      }

      if (this.payload.type === "VIDEO" && this.tabType === "video") {
        if (this.payload.repository_file_id) {
          return "Thêm video bài học";
        }
      }

      if (this.payload.lesson) {
        return "Upload bài học";
      }

      return "Thêm bài học";
    },

    description() {
      if (this.confirmLoading) {
        return "File đang được tải lên, vui lòng không đóng cửa sổ này"
      }

      if (this.edit) {
        return "Bạn có chắc chắn là muốn lưu thay đổi này?"
      }

      if (this.payload.repository_file_id) {
        return "Bạn có chắc chắn muốn thêm file này từ kho học liệu?";
      }

      if (this.payload.lesson) {
        return "Bạn có chắc chắn muốn tải file này lên hệ thống?";
      }

      // if (this.payload.type == "VIDEO") {
      //   if (this.payload.lesson && this.tabType === "video") {
      //     return "Bạn có chắc chắn muốn tải video này lên hệ thống?";
      //   }
      //   if (this.payload.lesson && this.tabType === "audio") {
      //     return "Bạn có chắc chắn muốn tải file này lên hệ thống?";
      //   }
      // }

      if (
        this.payload.type == "PDF" ||
        this.payload.type == "DOC" ||
        this.payload.type == "TXT" ||
        this.payload.type == "ARTICLE"
      ) {
        if (this.payload.article_content) {
          return "Bạn có chắc chắn muốn thêm bài học này?";
        }
      }
    },
  },

  methods: {
    handleCheckPayload() {
      const name = this.handleCheckName();
      const content = this.handleCheckContent();
      return name && content;
    },

    handleCheckName() {
      if (!this.payload.name) {
        this.error.name = "Bạn cần nhập tên bài học";
        return false;
      }
      this.error.name = "";
      return true;
    },

    handleCheckContent() {
      if (this.lesson) {
        this.error.content = "";
        return true;
      }
      let lesson = !!this.payload.lesson;
      let repository_file_id = !!this.payload.repository_file_id;
      let article_content = !!this.payload.article_content;
      if (!lesson && !repository_file_id && !article_content) {
        this.error.content = "Bạn cần nhập nội dung cho bài học";
        return false;
      }
      this.error.content = "";
      return true;
    },

    handleChangeLesson() {
      if (this.lesson) {
        this.payload.name = get(this, "lesson.name", "");
        this.payload.id = get(this, "lesson.id", "");
      }
      if (
        get(this, "lesson.type", "") === "ARTICLE" ||
        get(this, "lesson.type", "") === "DOCS"
      ) {
        this.tabType = "document";
      }
      if (get(this, "lesson.type", "") === "VIDEO") {
        this.tabType = "video";
      }
      if (get(this, "lesson.type", "") === "SCORM") {
        this.tabType = "scorm";
      }
      if (get(this, "lesson.type", "") === "AUDIO") {
        this.tabType = "audio";
      }
    },

    handleReset() {
      this.payload.article_content = "";
      this.payload.lesson = "";
      this.payload.repository_file_id = "";
    },

    handleChangeName() {
      this.handleCheckName();
    },

    changeTabType(type) {
      this.handleReset();
      this.tabType = type;
    },

    handleSelectFile(data) {
      this.modalType = "upload";
      this.payload.type = data.type;
      this.payload.lesson = data.lesson;
      this.payload.repository_file_id = "";
      this.handleCheckContent();
    },

    handleSelectUrl(file) {
      this.modalType = "url";
      this.payload.type = file.type;
      this.payload.lesson = "";
      this.payload.repository_file_id = file.id;
      this.handleCheckContent();
    },

    handleAddContent() {
      if (!this.handleCheckPayload()) {
        this.$toasted.error("Invalid params");
        return;
      }
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      this.payload.chapter_id = get(this, "chapter.id", "");
      this.payload.id = get(this, "lesson.id", "");

      const payload = { ...this.payload };
      if (!payload.id) delete payload.id;
      if (!payload.lesson) delete payload.lesson;
      if (!payload.repository_file_id) delete payload.repository_file_id;
      if (!payload.article_content) delete payload.article_content;
      if (this.tabType === "audio") delete payload.type;

      const result = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.ADD}`,
        payload
      );

      this.handleCancelModal();

      if (get(result, "success", false)) {
        this.$emit("toggleShowAddLesson");
        this.$store.dispatch(`elearning/create/getContent`);
        this.$toasted.success(get(result, "message", "Thành công"));
        return;
      }
      this.$toasted.error(get(result, "message", "Có lỗi xảy ra"));
    },

    handleCancelModal() {
      this.modalType = "";
      this.showModalConfirm = false;
      this.confirmLoading = false;
      this.showModalConfirmDoc = false;
      this.confirmLoadingDoc = false;
      this.showModalConfirmVideo = false;
      this.confirmLoadingVideo = false;
      this.showModalConfirmScorm = false;
      this.confirmLoadingScorm = false;
    },

    handleSelectDocument(type, article_content, file_id, lesson) {
      this.payload.type = type;
      this.payload.lesson = lesson;
      this.payload.repository_file_id = file_id;
      this.payload.article_content = article_content;
      this.handleCheckContent();
    },

    handleCancel() {
      this.$emit("toggleShowAddLesson");
    },

    get,
  },
};
</script>
