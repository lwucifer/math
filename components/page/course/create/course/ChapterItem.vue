<template>
  <div>
    <div class="ce-item d-flex align-items-center justify-content-between">
      <div class="ce-item__left d-flex align-items-center">
        <div class="mr-3">
          Chương {{ index + 1 }}:
          <input
            v-if="isEditChaperName"
            v-model="chaperNameModel"
            ref="inputChaperName"
            class="cc-box__input-title bg-input-gray mb-0"
            type="text"
          />

          <h3 v-else class="d-inline-block body-2 mr-3">
            <span class="font-weight-normal">{{ get(chapter, "name", "") }}</span>
          </h3>
        </div>

        <template v-if="isEditChaperName">
          <button class="cc-box__btn mr-3 text-success">Lưu</button>
          <button class="cc-box__btn mr-3 text-gray-2" @click="cancelEditChaperName">Huỷ</button>
        </template>

        <template v-else>
          <a href class="ce-item__action edit mr-3" @click.prevent="editChaperName">
            <IconEditAlt class="icon d-block subheading fill-primary" />
          </a>

          <a href class="ce-item__action delete mr-3" @click.prevent="handleDeleteChapter">
            <IconTrashAlt class="icon d-block subheading fill-secondary" />
          </a>
        </template>
      </div>

      <div class="ce-item__right">
        <a href @click.prevent="handleAddLesson">Thêm bài học</a>
      </div>
    </div>

    <LessonDetail
      v-for="lesson in get(chapter, 'lessons', [])"
      :key="lesson.id"
      :lesson="lesson"
      @refreshLessons="$emit('handleRefreshChapters')"
    />

    <div class="create-lesson"></div>
    <CreateLessonOfChapter
      v-if="isShowCreateLessonOfChapter"
      :chapter="chapter"
      @handleCancel="handleCancel"
      :indexCreateLesson="indexCreateLesson"
      @refreshLessons="$emit('handleRefreshChapters')"
    />

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
    />

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
      indexCreateLesson: 0,
      showModalConfirm: false,
      confirmLoading: false,
      chaperNameModel: get(this.chapter, "name", ""),
      isEditChaperName: false
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

    async handleOk() {
      this.confirmLoading = true;
      const payload = {
        data: {
          id: get(this, "chapter.id", "")
        }
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.DELETE}`,
        payload
      );

      this.handleCancelModal();

      if (get(res, "success", false)) {
        this.$emit("handleRefreshChapters");
        this.$toasted.success(get(res, "message", "success"));
        return;
      }
      this.$toasted.error(get(res, "message", "error"));
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

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
      this.isShowCreateLessonOfChapter = true;
      let el = this.$el.getElementsByClassName("create-lesson")[0];
      el.scrollIntoView();
    },

    async handleDeleteChapter() {
      this.showModalConfirm = true;
    },

    editChaperName() {
      this.isEditChaperName = true;
      const timeout = setTimeout(() => {
        this.$refs.inputChaperName.focus();
        clearTimeout(timeout);
      });
    },

    cancelEditChaperName() {
      this.isEditChaperName = false;
    }
  }
};
</script>
