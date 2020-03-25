<template>
  <div class="clc-video">
    <div class="clc-video__image">
      <img src="~/assets/images/create-course/default-course-image.png" alt />
    </div>
    <div class="clc-video__right">
      <h4 class="clc-video__name heading-6 mb-3">
        {{ get(lesson, "name", "") }}
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
  </div>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import { get } from "lodash";
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
    }
  },

  methods: {
    handleEditLesson($event) {
      $event.preventDefault();
      this.$emit("handleEditLesson", this.lesson);
    },

    async handleDeleteLesson($event) {
      $event.preventDefault();
      const options = {
        data: {
          id: get(this, "lesson.id", "")
        }
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.DELETE}`,
        options
      );
      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$emit("refreshLessons");
        return;
      }
      this.$toasted.error(get(res, "message", "delete lesson fail"));
    },

    get
  }
};
</script>
