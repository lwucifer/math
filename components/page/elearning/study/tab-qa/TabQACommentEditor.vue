<template>
  <div class="tab-qa-comment-editor">
    <app-avatar :size="30" />

    <div class="tab-qa-comment-editor__right">
      <div class="tab-qa-comment-editor__editor-wrapper">
        <client-only>
          <editor-content :editor="editor" class="editor tab-qa-comment-editor__editor" />
        </client-only>

        <app-upload
          :fileList="uploadFileList"
          accept="image/*, image/heic, image/heif"
          class="tab-qa-comment-editor__upload d-inline-block"
          @change="handleUploadChange"
        >
          <button class="tab-qa-comment-editor__btn">
            <IconCameraAlt class="icon d-block" />
          </button>
        </app-upload>
      </div>

      <!-- Upload Image -->
      <div v-if="uploadImgSrc" class="tab-qa-comment-editor__preview">
        <img :src="uploadImgSrc" alt />
        <span class="tab-qa-comment-editor__close-preview" @click.stop="removeImgUpload">
          <IconClose class="icon" />
        </span>
      </div>
      <!-- End Upload Image -->
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Placeholder, HardBreak, Mention, History } from "tiptap-extensions";
import { EnterHandler } from "~/utils/tiptap-plugins";
import { getBase64 } from "~/utils/common";

import IconCameraAlt from "~/assets/svg/v2-icons/camera_alt_24px.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  components: {
    IconCameraAlt,
    IconClose,
    EditorContent
  },

  data() {
    return {
      editor: null,
      uploadFileList: [],
      uploadImgSrc: null
    };
  },

  mounted() {
    // Init editor
    this.editor = new Editor({
      content: '',
      autoFocus: true,
      extensions: [
        new Placeholder({
          showOnlyCurrent: true,
          showOnlyWhenEditable: true,
          emptyNodeText: "Viết bình luận"
        }),
        new HardBreak(),
        new History(),
        new EnterHandler({
          onEnter: this.submit
        }),
      ],
      onPaste: this.handleEditorPaste,
    });
  },

  methods: {
    handleUploadChange(fileList, event) {
      this.uploadFileList = Array.from(fileList);
      getBase64(this.uploadFileList[0], src => {
        this.uploadImgSrc = src;
      });
    },

    removeImgUpload() {
      this.uploadFileList = [];
      this.uploadImgSrc = null;

      if (this.mode === "edit") {
        this.isDeleteOldImg = true;
      }
    },

    handleEditorPaste(view, event, slice) {
      const { clipboardData } = event;

      if (clipboardData.files && clipboardData.files.length) {
        // Handle paste file here
        return;
      }
    },

    submit() {
      console.log('submit');
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa-comment-editor.scss";
</style>