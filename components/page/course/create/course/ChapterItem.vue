<template>
  <div>
    <div class="ce-item d-flex align-items-center justify-content-between">
      <div class="ce-item__left d-flex align-items-center">
        <h3 class="body-2 mr-3">
          Chương {{ index + 1 }}:
          <span class="font-weight-normal">{{ get(chapter, "name", "") }}</span>
        </h3>
        <a href class="ce-item__action edit mr-3">
          <IconEditAlt class="icon d-block subheading fill-primary" />
        </a>
        <a
          href
          class="ce-item__action delete mr-3"
          @click.prevent="handleDeleteChapter"
        >
          <IconTrashAlt class="icon d-block subheading fill-secondary" />
        </a>
      </div>

      <div class="ce-item__right">
        <a href @click.prevent="handleAddLesson">Thêm bài học</a>
      </div>
    </div>

    <LessonDetail
      v-for="lesson in get(lessons, 'data', [])"
      :key="lesson.id"
      :lesson="lesson"
      @handleEditLesson="handleEditLesson"
      @refreshLessons="refreshLessons"
    />

    <CreateLessonOfChapter
      v-if="isShowCreateLessonOfChapter"
      :chapter="chapter"
      @handleCancelAddLesson="handleCancelAddLesson"
    />

    <app-divider class="my-0" />
  </div>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import { getParamQuery } from "~/utils/common";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import CreateLessonOfChapter from "~/components/page/course/create/course/CreateLessonOfChapter";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import LessonDetail from "~/components/page/course/create/LessonDetail";
import { mapState } from "vuex";

export default {
  components: {
    IconEditAlt,
    IconTrashAlt,
    CreateLessonOfChapter,
    IconAngleDown,
    LessonDetail
  },

  data() {
    return {
      isShowCreateLessonOfChapter: false
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-lesson", {
      lessons: "lessons"
    }),
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  props: {
    index: {
      type: Number,
      default: 0
    },
    chapter: {
      type: Object,
      default: null
    }
  },

  methods: {
    get,

    handleEditLesson() {
      //
    },

    refreshLessons() {
      //
    },

    handleCancelAddLesson() {
      this.isShowCreateLessonOfChapter = false;
    },

    handleAddLesson() {
      this.isShowCreateLessonOfChapter = true;
    },

    async handleDeleteChapter() {
      const payload = {
        data: {
          id: get(this, "chapter.id", "")
        }
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.DELETE}`,
        payload
      );
      if (get(res, "success", false)) {
        this.$emit("handleRefreshChapters");
        this.$toasted.success(get(res, "message", "success"));
        return;
      }
      this.$toasted.error(get(res, "message", "error"));
    }
  }
};
</script>
