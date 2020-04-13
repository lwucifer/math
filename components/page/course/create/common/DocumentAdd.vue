<template>
  <div class="cc-box__bg-gray px-4 pt-3 pb-4">
    <div class="d-flex justify-content-between">
      <span>Thêm tài liệu bài giảng</span>
      <a href @click="handleCloseAdd($event)">
        <IconClose class="icon fill-gray" />
      </a>
    </div>

    <app-divider class="mt-3 mb-4" />

    <h3 class="heading-6 mb-2 mt-3">Tên tài liệu</h3>
    <app-input v-model="payload.name" placeholder="Điền tên tài liệu" />

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

    <DocumentSelectFile
      @handleSelectFile="handleSelectFile"
      v-if="tabAddDocument === 'upload'"
    />

    <DocumentSelectDoc
      @handleSelectUrl="handleSelectUrl"
      v-if="tabAddDocument === 'choose'"
      type="DOCS"
    />

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
        >Thêm tài liệu</app-button
      >
    </div>

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
    />
  </div>
</template>

<script>
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import DocumentSelectFile from "~/components/page/course/create/common/DocumentSelectFile";
import DocumentSelectDoc from "~/components/page/course/create/common/DocumentSelectDoc";
import { get, defaultTo } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createPayloadAddDocument } from "~/models/course/AddCourse";

export default {
  components: {
    IconClose,
    IconTrashAlt,
    DocumentSelectFile,
    DocumentSelectDoc
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
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        doc: "",
        lesson_id: get(this, "lesson.id", ""),
        name: "",
        format: "DOC",
        url: ""
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
      this.payload.url = "";
      this.payload.format = "";
    },

    handleSelectUrl(file) {
      this.payload.url = file.url;
      this.payload.format = file.format;
      this.payload.doc = "";
    },

    async handleAddDocument() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      const payload = createPayloadAddDocument(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-doc/${actionTypes.ELEARNING_CREATING_DOC.ADD}`,
        payload
      );

      this.handleCancelModal();

      if (!get(result, "success", false)) {
        this.$toasted.error(
          defaultTo(get(result, "message", ""), "Có lỗi xảy ra")
        );
        return;
      }
      this.$emit("handleCloseAdd");
      this.$emit("handleRefreshDocs");
      this.$toasted.success(
        defaultTo(get(result, "message", ""), "Thành công")
      );
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    }
  }
};
</script>
