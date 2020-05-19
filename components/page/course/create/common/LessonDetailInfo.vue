<template>
  <div class="clc-video">
    <div class="clc-video__image"><img :src="thumnail" alt /></div>

    <div class="clc-video__right w-100">
      <div class="d-flex justify-content-between clc-video__name">
        <p class="mb-3">
          <span class="heading-6 mb-3 font-weight-bold"
            >Bài {{ index + 1 + ": " }}</span
          >
          <span>{{
            get(lesson, "name", "").length > 60
              ? get(lesson, "name", "").slice(0, 40) + "..."
              : get(lesson, "name", "")
          }}</span>
        </p>

        <div class="clc-video__actions">
          <a
            href
            class="clc-video__btn-edit text-primary mr-2"
            @click="handleEditLesson($event)"
          >
            <IconBorderColor24px class="icon" />
          </a>
          <a
            href
            class="clc-video__btn-delete text-secondary"
            @click="handleDeleteLesson($event)"
          >
            <IconTrashAlt class="icon" />
          </a>
        </div>
      </div>

      <div class="clc-video__type text-dark mt-2">
        Định dạng: {{ get(lesson, "type", "") }}
      </div>

      <div class="clc-video__time text-gray mb-3 mt-3">
        <IconClock width="14px" height="14px" class="mr-2" />
        {{ get(lesson, "duration", "") }}
      </div>
    </div>
    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
    />
  </div>
</template>

<script>
import IconBorderColor24px from "~/assets/svg/v2-icons/border_color_24px.svg?inline";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import IconClock from "~/assets/svg/icons/clock.svg?inline";

import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconBorderColor24px,
    IconTrashAlt,
    IconClock,
  },

  props: {
    lesson: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
  },

  computed: {
    thumnail() {
      return get(this, "lesson.type", "") === "VIDEO"
        ? "/images/thumnail-video.png"
        : "/images/thumnail-doc.png";
    },
  },

  data() {
    return {
      showModalConfirm: false,
      confirmLoading: false,
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
          id: get(this, "lesson.id", ""),
        },
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.DELETE}`,
        options
      );

      this.handleCancelModal();

      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "message", "Thành công"));
        this.$store.dispatch(`elearning/create/getContent`);
        // this.$store.dispatch(`elearning/create/getProgress`);
        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    get,
  },
};
</script>
