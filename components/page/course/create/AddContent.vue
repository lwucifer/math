<template>
  <fragment>
    <!-- <h3 class="heading-6 mb-2 mt-3">Bài giảng đại số lớp 10</h3> -->
    <app-input v-model="payload.name" placeholder="Tên bài giảng" />
    <div class="cc-box__bg-gray px-4 pt-3 pb-4">
      <span>Chọn loại bài giảng</span>

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
          @click="handleAddContent"
          class="clc-btn font-weight-semi-bold"
          size="sm"
          square
          >Thêm nội dung</app-button
        >
      </div>
    </div>
  </fragment>
</template>

<script>
import { getBase64, getParamQuery } from "~/utils/common";
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
import CreateAction from "~/components/page/course/create/CreateAction";
import LessonSelectVideo from "~/components/page/course/create/LessonSelectVideo";
import LessonSelectDocument from "~/components/page/course/create/LessonSelectDocument";
import { createPayloadAddContentCourse } from "~/models/course/AddCourse";
import * as actionTypes from "~/utils/action-types";

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

  data() {
    return {
      tabType: "video",
      payload: {
        elearning_id: getParamQuery("elearning_id"),
        index: 0,
        lesson: "",
        name: "",
        type: "VIDEO", // VIDEO | ARTICLE | PDF | DOC | TXT
        url: "",
        article_content: ""
      }
    };
  },

  methods: {
    changeTabType(type) {
      this.tabType = type;
    },

    handleSelectFile(data) {
      this.payload.type = data.type;
      this.payload.lesson = data.lesson;
      this.payload.url = "";
    },

    handleSelectUrl(file) {
      this.payload.type = file.type;
      this.payload.lesson = "";
      this.payload.url = file.url;
    },

    async handleAddContent() {
      const payload = createPayloadAddContentCourse(this.payload);
      await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.ADD}`,
        payload
      );
      this.$emit("refreshLessons");
    },

    handleSelectDocument(type, article_content, url, lesson) {
      this.payload.type = type;
      this.payload.lesson = lesson;
      this.payload.url = url;
      this.payload.article_content = article_content;
    },

    handleCancel() {
      this.$emit("handleCancel");
    }
  }
};
</script>
