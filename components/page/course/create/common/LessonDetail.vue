<template>
  <div class="cc-box__body py-4">
    <LessonDetailInfo
      v-if="isShowDetailLesson"
      @handleEditLesson="handleEditLesson"
      @refreshLessons="refreshLessons"
      :lesson="lesson"
    />

    <CreateLessonOfChapter
      :lesson="lesson"
      @handleCancel="handleCancel"
      @refreshLessons="refreshLessons"
      v-else
    />

    <app-divider class="my-4" />

    <DocumentDetail
      v-for="doc in docs"
      :key="doc.id"
      :doc="doc"
      @handleRefreshDocs="handleRefreshDocs"
    />

    <DocumentAdd
      :lesson="lesson"
      v-if="isShowFormAddDocument"
      @handleCloseAdd="handleCloseAdd"
      @handleRefreshDocs="handleRefreshDocs"
    />

    <app-button
      size="sm"
      outline
      square
      class="font-weight-semi-bold clc-btn-add-docs"
      v-if="isShowButtonAddDocument"
      @click="handleAddDocument"
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
import { mapState } from "vuex";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
import { get } from "lodash";
import DocumentAdd from "~/components/page/course/create/common/DocumentAdd";
import DocumentDetail from "~/components/page/course/create/common/DocumentDetail";
import CreateLessonOfChapter from "~/components/page/course/create/course/CreateLessonOfChapter";
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
import LessonDetailInfo from "~/components/page/course/create/common/LessonDetailInfo";

export default {
  components: {
    IconEditAlt,
    IconTrashAlt,
    IconPlus,
    IconClose,
    DocumentAdd,
    IconFileBlank,
    DocumentDetail,
    CreateLessonOfChapter,
    LessonDetailInfo
  },

  data() {
    return {
      isShowFormAddDocument: false,
      isShowButtonAddDocument: true,
      docs: [],
      isShowDetailLesson: true
    };
  },

  async created() {
    this.docs = await this.handleGetDocs();
  },

  props: {
    lesson: {
      type: Object,
      default: null
    }
  },

  methods: {
    async handleRefreshDocs() {
      this.docs = await this.handleGetDocs();
    },

    refreshLessons() {
      this.$emit("refreshLessons");
      this.isShowDetailLesson = true;
    },

    handleCancel() {
      this.isShowDetailLesson = true;
    },

    async handleGetDocs() {
      const lesson_id = get(this, "lesson.id", "");
      // const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          lesson_id
          // elearning_id
        },
        not_commit: true
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-doc/${actionTypes.ELEARNING_CREATING_DOC.LIST}`,
        options
      );
      if (get(res, "success", false)) {
        return get(res, "data", []);
      }
      return [];
    },

    handleCloseAdd() {
      this.isShowFormAddDocument = false;
      this.isShowButtonAddDocument = true;
    },

    handleAddDocument() {
      this.isShowFormAddDocument = true;
      this.isShowButtonAddDocument = false;
    },

    handleEditLesson() {
      this.isShowDetailLesson = false;
    },

    get
  }
};
</script>
