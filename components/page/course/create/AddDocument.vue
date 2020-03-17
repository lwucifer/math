<template>
  <div class="cc-box__bg-gray px-4 pt-3 pb-4">
    <div class="d-flex justify-content-between">
      <span>Thêm tài liệu bài giảng</span>
      <a href @click="handleCloseAdd($event)">
        <IconClose class="icon fill-gray" />
      </a>
    </div>

    <app-divider class="mt-3 mb-4" />

    <app-input v-model="payload.name" />

    <div class="cc-tabs">
      <a
        href
        class="cc-tab-item"
        :class="{ active: tabAddDocument === 'upload' }"
        @click.prevent="changeTabAddDocument('upload')"
        >Upload tài liệu</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabAddDocument === 'choose' }"
        @click.prevent="changeTabAddDocument('choose')"
        >Chọn từ kho học liệu</a
      >
    </div>

    <AddDocumentFile
      @handleSelectFile="handleSelectFile"
      v-if="tabAddDocument === 'upload'"
    />

    <AddDocumentChoose v-if="tabAddDocument === 'choose'" />

    <div class="d-flex justify-content-end mt-4">
      <app-button
        class="clc-btn font-weight-semi-bold mr-4"
        size="sm"
        color="disabled"
        square
        @click="handleCloseAdd($event)"
        >Huỷ bỏ</app-button
      >
      <app-button
        class="clc-btn font-weight-semi-bold"
        size="sm"
        square
        @click="handleAddDocument"
        >Thêm nội dung</app-button
      >
    </div>
  </div>
</template>

<script>
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import AddDocumentFile from "~/components/page/course/create/AddDocumentFile";
import AddDocumentChoose from "~/components/page/course/create/AddDocumentChoose";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconClose,
    IconTrashAlt,
    AddDocumentFile,
    AddDocumentChoose
  },

  props: {
    lesson: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      tabAddDocument: "upload",
      payload: {
        doc: "",
        lesson_id: get(this, "lesson.id", ""),
        name: "",
        format: "DOC"
      }
    };
  },

  methods: {
    handleCloseAdd(e) {
      e.preventDefault();
      this.$emit("handleCloseAdd");
    },

    changeTabAddDocument(type) {
      this.tabAddDocument = type;
    },

    handleSelectFile(file) {
      this.payload.doc = file;
    },

    async handleAddDocument() {
      const result = await this.$store.dispatch(
        `elearning/creating/creating-doc/${actionTypes.ELEARNING_CREATING_DOC.ADD}`,
        this.payload
      );
      if (!get(result, "success", false)) {
        this.$toasted.error(get(result, "message", ""));
        return;
      }
      this.$emit("handleCloseAdd");
      this.$emit("handleRefreshDocs");
      this.$toasted.success(get(result, "message", ""));
    }
  }
};
</script>
