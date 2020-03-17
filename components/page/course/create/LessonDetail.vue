<template>
  <div class="cc-box__body py-4">
    <div class="clc-video">
      <div class="clc-video__image">
        <img src="https://picsum.photos/160/90" alt />
      </div>
      <div class="clc-video__right">
        <h4 class="clc-video__name heading-6 mb-3">
          {{ get(lesson, "name", "") }}
        </h4>
        <div class="clc-video__time text-gray mb-3">6:30</div>
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

    <app-divider class="my-4" />

    <DocumentDetail
      v-for="doc in get(docs, 'data', [])"
      :key="doc.id"
      :doc="doc"
    />

    <AddDocument
      :lesson="lesson"
      v-if="isShowFormAddDocument"
      @handleCloseAdd="handleCloseAdd"
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
import AddDocument from "~/components/page/course/create/AddDocument";
import DocumentDetail from "~/components/page/course/create/DocumentDetail";
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");

export default {
  components: {
    IconEditAlt,
    IconTrashAlt,
    IconPlus,
    IconClose,
    AddDocument,
    IconFileBlank,
    DocumentDetail
  },

  data() {
    return {
      isShowFormAddDocument: false,
      isShowButtonAddDocument: true
    };
  },

  created() {
    const lesson_id = get(this, "lesson.id", "");
    const elearning_id = getParamQuery("elearning_id");
    const options = {
      params: {
        lesson_id,
        elearning_id
      }
    };
    this.$store.dispatch(
      `elearning/creating/creating-doc/${actionTypes.ELEARNING_CREATING_DOC.LIST}`,
      options
    );
  },

  computed: {
    ...mapState("elearning/creating/creating-doc", {
      docs: "docs"
    })
  },

  props: {
    lesson: {
      type: Object,
      default: null
    }
  },

  methods: {
    handleCloseAdd() {
      this.isShowFormAddDocument = false;
      this.isShowButtonAddDocument = true;
    },

    handleAddDocument() {
      this.isShowFormAddDocument = true;
      this.isShowButtonAddDocument = false;
    },

    handleEditLesson($event) {
      this.$emit("handleEditLesson");
      $event.preventDefault();
    },

    async handleDeleteLesson($event) {
      $event.preventDefault();
      const options = {
        data: {
          id: get(this, "lesson.id", "")
        }
      };
      await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.DELETE}`,
        options
      );
      this.$emit("refreshLessons");
    },

    get
  }
};
</script>
