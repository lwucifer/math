<template>
  <div class="editor post-editor">
    <div class="post-editor__top">
      <div class="post-editor__avatar">
        <img src="https://via.placeholder.com/60x60" alt />
      </div>

      <client-only>
        <editor-content :editor="editor" class="post-editor__editor" />
      </client-only>
    </div>

    <app-divider class="my-3" />

    <div class="post-editor__toolbar">
      <button class="post-editor__toolbar-item image">
        <IconAddImage />
        <span>Hình ảnh</span>
      </button>
      <button class="post-editor__toolbar-item tag">
        <IconUserGroup />
        <span>Tag bạn bè</span>
      </button>
      <button class="post-editor__toolbar-item check-in">
        <IconPinLocation />
        <span>Check in</span>
      </button>
      <button class="post-editor__toolbar-item emoji">
        <IconEmoji />
        <span>Nhãn cảm xúc</span>
      </button>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";
import IconAddImage from "~/assets/svg/icons/add-image.svg?inline";
import IconUserGroup from "~/assets/svg/icons/user-group.svg?inline";
import IconPinLocation from "~/assets/svg/icons/pin-location.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";

export default {
  components: {
    IconAddImage,
    IconUserGroup,
    IconPinLocation,
    IconEmoji,
    EditorContent
  },

  data() {
    return {
      editor: null
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: "Đăng bài viết..."
        })
      ]
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor.scss";
</style>