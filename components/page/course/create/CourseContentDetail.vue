<template>
  <div class="cc-box__body py-4">
    <div class="clc-video">
      <div class="clc-video__image">
        <img src="https://picsum.photos/160/90" alt />
      </div>
      <div class="clc-video__right">
        <h4 class="clc-video__name heading-6 mb-3">
          Tên video: Bài giảng đại số lớp 10a
        </h4>
        <div class="clc-video__time text-gray mb-3">6:30</div>
        <div class="clc-video__actions">
          <a href class="clc-video__btn-edit text-primary mr-5">
            <IconEditAlt class="icon" />Sửa nội dung
          </a>
          <a href class="clc-video__btn-delete text-secondary">
            <IconTrashAlt class="icon" />Xoá nội dung
          </a>
        </div>
      </div>
    </div>

    <app-divider class="my-4" />

    <app-button
      size="sm"
      outline
      square
      class="font-weight-semi-bold clc-btn-add-docs"
    >
      <IconPlus class="icon"></IconPlus>Thêm tài liệu giảng dạy
    </app-button>
  </div>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import { useEffect, getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconEditAlt,
    IconTrashAlt,
    IconPlus
  },

  created() {
    useEffect(this, this.fetchLesson.bind(this), []);
  },

  methods: {
    fetchLesson() {
      const elearning_id = getParamQuery("elearning_id");
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
  }
};
</script>
