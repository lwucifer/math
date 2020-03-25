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
      v-for="lesson in lessons"
      :key="lesson.id"
      :lesson="lesson"
      @refreshLessons="refreshLessons"
    />

    <div class="create-lesson"></div>
    <CreateLessonOfChapter
      v-if="isShowCreateLessonOfChapter"
      :chapter="chapter"
      @handleCancel="handleCancel"
      :indexCreateLesson="indexCreateLesson"
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
import LessonDetail from "~/components/page/course/create/common/LessonDetail";
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
      isShowCreateLessonOfChapter: false,
      lessons: [],
      indexCreateLesson: 0
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  async created() {
    this.lessons = await this.getLessonsOfChapter();
    this.indexCreateLesson = this.setIndex(this.lessons);
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

    async refreshLessons() {
      this.lessons = await this.getLessonsOfChapter();
      this.indexCreateLesson = this.setIndex(this.lessons);
    },

    async getLessonsOfChapter() {
      const options = {
        params: {
          chapter_id: get(this, "chapter.id", "")
        },
        not_commit: true
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.LIST}`,
        options
      );
      if (get(res, "success", false)) {
        return get(res, "data", []);
      }
      return [];
    },

    setIndex(lessons) {
      let index = 0;
      try {
        index = lessons[lessons.length - 1]["index"] + 1;
      } catch (error) {}
      return index;
    },

    async refreshLessons() {
      this.isShowCreateLessonOfChapter = false;
      this.lessons = await this.getLessonsOfChapter();
      this.indexCreateLesson = this.setIndex(this.lessons);
    },

    handleCancel() {
      this.isShowCreateLessonOfChapter = false;
    },

    handleAddLesson() {
      this.isShowCreateLessonOfChapter = true;
      let el = this.$el.getElementsByClassName("create-lesson")[0];
      el.scrollIntoView();
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
