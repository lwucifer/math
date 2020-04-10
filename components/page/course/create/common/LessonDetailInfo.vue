<template>
  <div class="clc-video">
    <div class="clc-video__image">
      <img src="~/assets/images/create-course/default-course-image.png" alt />
    </div>
    <div class="clc-video__right">
      <h4 class="clc-video__name heading-6 mb-3">
        Bài học số {{ (index+1)+ ": " + get(lesson, "name", "") }}
      </h4>
      <div class="clc-video__time text-gray mb-3">
        {{ get(lesson, "duration", "") }}
      </div>
      <div class="clc-video__actions">
        <a
          href
          class="clc-video__btn-edit text-primary mr-5"
          @click="handleEditLesson($event)"
        >
          <IconEditAlt class="icon" />Sửa nội dung
        </a>
        <a
          href
          class="clc-video__btn-delete text-secondary"
          @click="handleDeleteLesson($event)"
        >
          <IconTrashAlt class="icon" />Xoá nội dung
        </a>
      </div>
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
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import { get, defaultTo } from "lodash";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconEditAlt,
    IconTrashAlt
  },

  props: {
    lesson: {
      type: Object,
      default: null
    },
    index:{
      type: Number,
      default: null
    }
  },

  data() {
    return {
      showModalConfirm: false,
      confirmLoading: false
    };
  },

  methods: {
    handleEditLesson($event) {
      $event.preventDefault();
      this.$emit("handleEditLesson", this.lesson);
    },

    async handleDeleteLesson($event) {
      $event.preventDefault();
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      const options = {
        data: {
          id: get(this, "lesson.id", "")
        }
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.DELETE}`,
        options
      );

      this.handleCancelModal();

      if (get(res, "success", false)) {
        this.$toasted.success(defaultTo(get(res, "message", ""), "Thành công"));
        this.$emit("refreshLessons");
        return;
      }
      this.$toasted.error(defaultTo(get(res, "message", ""), "Có lỗi xảy ra"));
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    get
  }
};
</script>
