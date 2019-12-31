<template>
  <div class="comment-editor" :class="classes">
    <app-avatar :size="reply ? 'xs' : 'sm'" src="https://via.placeholder.com/40x40" class="comment-editor__avatar" />

    <div class="comment-editor__editor-wrapper">
      <client-only>
        <editor-content :editor="editor" class="editor comment-editor__editor" />
      </client-only>

      <div class="comment-editor__actions">
        <button type="button" class="comment-editor__button image">
          <IconAddImage />
        </button>

        <button type="button" class="comment-editor__button emoji">
          <IconEmoji />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import IconAddImage from "~/assets/svg/icons/add-image.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";

export default {
  components: {
    EditorContent,
    IconAddImage,
    IconEmoji
  },

  props: {
    reply: Boolean
  },

  data() {
    return {
      editor: null
    };
  },

  computed: {
    classes() {
      return {
        'comment-editor--reply': this.reply
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '',
      extensions: [
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: "Viết bình luận"
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
@import "~/assets/scss/components/comment/_comment-editor.scss";
</style>