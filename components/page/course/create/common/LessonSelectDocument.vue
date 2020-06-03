<template>
  <div class="clc-type-tab-panel">
    <div class="cc-tabs">
      <a
        href
        class="cc-tab-item"
        :class="{ active: tabDocument === 'typing' }"
        @click.prevent="changeTabDocument('typing')"
        >Soạn văn bản</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabDocument === 'upload' }"
        @click.prevent="changeTabDocument('upload')"
        >Upload bài học</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabDocument === 'choose' }"
        @click.prevent="changeTabDocument('choose')"
        >Chọn từ kho học liệu</a
      >
    </div>

    <div class="cc-tab-panel" v-if="tabDocument === 'typing'">
      <app-editor class="bg-white" v-model="article_content" />
    </div>

    <div class="cc-tab-panel" v-if="tabDocument === 'upload'">
      <app-upload
        accept=".doc, .docx, .pdf, .rtf , .txt, .csv, .xls, .xlsx, .ppt, .pptx, .zip"
        @change="handleSelectFile"
        class="clc-upload-video"
      >
      </app-upload>

      <p class="text-base caption mt-2">
        <span class="text-dark font-weight-semi-bold">Lưu ý:</span> Upload tài
        liệu bổ trợ cho bài học của bạn, dung lượng không quá 50MB cho 1 file
      </p>
    </div>

    <DocumentSelectDoc
      @handleSelectUrl="handleSelectUrl"
      v-if="tabDocument === 'choose'"
      type="DOCS"
    />
  </div>
</template>

<script>
import DocumentSelectDoc from "~/components/page/course/create/common/DocumentSelectDoc";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");

export default {
  components: {
    IconTrashAlt,
    DocumentSelectDoc,
  },

  data() {
    return {
      tabDocument: "typing",
      article_content: "",
    };
  },

  watch: {
    article_content: function() {
      this.$emit(
        "handleSelectDocument",
        "ARTICLE",
        this.article_content,
        "",
        ""
      );
    },
  },

  methods: {
    changeTabDocument(type) {
      this.$emit("handleReset");
      this.tabDocument = type;
    },

    changeTabAddDocument(type) {
      this.tabAddDocument = type;
    },

    handleSelectUrl(file) {
      this.$emit("handleSelectDocument", "DOC", "", file.id, "");
    },

    handleSelectFile(files) {
      this.$emit("handleSelectDocument", "DOC", "", "", files[0]);
    },
  },
};
</script>
