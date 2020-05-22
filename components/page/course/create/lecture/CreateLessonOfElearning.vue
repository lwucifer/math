<template>
  <div>
    <!-- <h3 class="heading-6 mb-2 mt-3">Bài giảng đại số lớp 10</h3> -->
    <div class="cc-box__bg-gray">
      <h3 class="heading-5 my-3">
        Tên bài học
        <span class="caption text-base font-weight-normal"
          >(Tối đa 150 ký tự)</span
        >
      </h3>
      <app-input
        @handleBlur="handleBlurNameInput"
        v-model="payload.name"
        placeholder="Bài học số 1"
        :counter="150"
      />
      <span v-show="error_name" class="error mb-3">{{ error_name }}</span>

      <div class="cc-box__bg-disable">
        <p class="text-center my-4">Chọn loại bài học</p>

        <!-- <app-divider class="mt-3 mb-4" /> -->

        <div class="clc-type-tabs my-5">
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
          </a>
        </div>

        <!-- <app-divider class="my-4" /> -->

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
            v-if="lesson"
            class="clc-btn font-weight-semi-bold mr-4 text-secondary"
            size="md"
            color="default"
            outline
            square
            @click="handleCancel"
            >Huỷ</app-button
          >

          <app-button
            @click="handleAddContent"
            :disabled="!submit"
            class="clc-btn font-weight-semi-bold"
            size="md"
            square
            >{{ lesson ? "Sửa nội dung" : "Thêm bài học" }}</app-button
          >
        </div>
      </div>
    </div>
    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
    />

    <app-modal-confirm
      centered
      v-if="showModalConfirmVideo"
      :confirmLoading="confirmLoadingVideo"
      @ok="handleOk"
      @cancel="handleCancelModal"
      :okText="chagingBtnOk"
      title="Upload video bài học"
      :description="chagingDescription"
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
import IconRadioButtonChecked from "~/assets/svg/design-icons/radio_button_checked.svg?inline";
import IconDefaultAsideMenu from "~/assets/svg/icons/default-aside-menu.svg?inline";

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
    LessonSelectDocument,
    IconRadioButtonChecked,
    IconDefaultAsideMenu,
  },

  props: {
    lesson: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      tabType: "video",
      showModalConfirm: false,
      showModalConfirmVideo: false,
      confirmLoading: false,
      confirmLoadingVideo: false,
      error_name: "",
      payload: {
        elearning_id: getParamQuery("elearning_id"),
        lesson: "",
        name: get(this, "lesson.name", ""),
        type: "VIDEO", // VIDEO | ARTICLE | PDF | DOC | TXT
        repository_file_id: "",
        article_content: "",
        id: get(this, "lesson.id", ""),
      },
    };
  },

  mounted() {
    console.log(this.lesson);
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
    }),
    submit() {
      return !this.error_name;
    },

    chagingDescription() {
      if (this.confirmLoadingVideo) {
        return "Video đang được tải lên, xin vui lòng không đóng cửa sổ này.";
      }
      return "Bạn có chắc chắn muốn tải video này lên hệ thống?";
    },

    chagingBtnOk() {
      if (this.confirmLoadingVideo) {
        return "Đang tải";
      }
      return "Xác nhận";
    },
  },

  watch: {
    lesson: {
      handler: function() {
        if (this.lesson) {
          this.payload.name = get(this, "lesson.name", "");
          this.payload.id = get(this, "lesson.id", "");
        }
      },
      deep: true,
    },
  },

  methods: {
    handleBlurNameInput() {
      if (!this.payload.name) {
        this.error_name = "Bạn chưa nhập tên bài học";
        return;
      }
      this.error_name = "";
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

    async handleAddContent() {
      if (this.payload.type == "VIDEO") {
        this.showModalConfirmVideo = true;
      } else {
        this.showModalConfirm = true;
      }
    },

    async handleOk() {
      if (this.payload.type == "VIDEO") {
        this.confirmLoadingVideo = true;
      } else {
        this.confirmLoading = true;
      }

      const payload = createPayloadAddContentCourse(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.ADD}`,
        payload
      );

      this.handleCancelModal();

      if (get(result, "success", false)) {
        const elearning_id = getParamQuery("elearning_id");
        const options = {
          params: {
            elearning_id,
          },
        };
        this.$store.dispatch(`elearning/create/getContent`);
        // this.$store.dispatch(`elearning/create/getProgress`);
        this.$emit("toggleShowAddLesson");
        this.$toasted.success(get(result, "message", "Thành công"));
        window.scrollTo(0, 0);
        return;
      }
      this.$toasted.error(get(result, "message", "Có lỗi xảy ra"));
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
      this.showModalConfirmVideo = false;
      this.confirmLoadingVideo = false;
    },

    handleSelectDocument(type, article_content, file_id, lesson) {
      this.payload.type = type;
      this.payload.lesson = lesson;
      this.payload.repository_file_id = file_id;
      this.payload.article_content = article_content;
    },

    handleCancel() {
      this.$emit("toggleShowAddLesson");
    },

    get,
  },
};
</script>
