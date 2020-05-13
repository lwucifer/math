<template>
  <div>
    <div class="ce-item d-flex align-items-center justify-content-between">
      <EditChapterName
        :defaultName="get(this, 'chapter', {})"
        @handleRefreshChapters="$emit('handleRefreshChapters')"
      />
      <div class="ce-item__right d-flex">
        <a href @click.prevent="handleAddLesson">Thêm bài học</a>
        <button
          class="cc-box__btn cc-box__btn-collapse"
          @click="isShowLesson = !isShowLesson"
        >
          <IconAngleDown class="fill-primary" v-if="!isShowLesson" />
          <IconAngleUp class="fill-primary" v-else />
        </button>
      </div>
    </div>

    <CreateLessonOfChapter
      v-if="isShowCreateLessonOfChapter"
      :chapter="chapter"
      @handleCancel="handleCancel"
      @refreshLessons="$emit('handleRefreshChapters')"
    />

    <div v-if="isShowLesson">
      <LessonDetail
        v-for="(lesson, index) in get(chapter, 'lessons', [])"
        :key="lesson.id"
        :index="index"
        :lesson="lesson"
        @refreshLessons="$emit('handleRefreshChapters')"
      />
    </div>

    <app-divider class="my-0" />
  </div>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import { getParamQuery } from "~/utils/common";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import { get, toNumber } from "lodash";
import * as actionTypes from "~/utils/action-types";
import CreateLessonOfChapter from "~/components/page/course/create/course/CreateLessonOfChapter";
import EditChapterName from "~/components/page/course/create/course/EditChapterName";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";
import LessonDetail from "~/components/page/course/create/common/LessonDetail";
import { mapState } from "vuex";

export default {
  components: {
    IconEditAlt,
    IconTrashAlt,
    CreateLessonOfChapter,
    IconAngleDown,
    IconAngleUp,
    LessonDetail,
    EditChapterName
  },

  data() {
    return {
      isShowCreateLessonOfChapter: false,
      indexCreateLesson: 0,
      isShowLesson: true
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  created() {
    this.indexCreateLesson = this.setIndex(get(this, "chapter.lessons", []));
  },

  watch: {
    chapter: {
      handler: function() {
        this.indexCreateLesson = this.setIndex(
          get(this, "chapter.lessons", [])
        );
      },
      deep: true
    }
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

    setIndex(lessons) {
      let index = 0;
      lessons.map(lesson => {
        if (toNumber(get(lesson, "index", 0)) > index) {
          index = toNumber(get(lesson, "index", 0));
        }
      });
      return index + 1;
    },

    handleCancel() {
      this.isShowCreateLessonOfChapter = false;
    },

    handleAddLesson() {
      this.isShowCreateLessonOfChapter = !this.isShowCreateLessonOfChapter;
    }
  }
};
</script>
