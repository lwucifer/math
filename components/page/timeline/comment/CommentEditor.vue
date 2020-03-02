<template>
  <div class="comment-editor" :class="classes">
    <app-avatar
      :size="reply ? 'xs' : 'sm'"
      src="https://picsum.photos/40/40"
      class="comment-editor__avatar"
    />

    <div class="comment-editor__editor-wrapper">
      <client-only>
        <editor-content :editor="editor" class="editor comment-editor__editor"/>
      </client-only>

      <div class="comment-editor__actions">
        <button type="button" class="comment-editor__button image">
          <IconAddImage />
        </button>

        <button type="button" class="comment-editor__button emoji" @click="hanleShowEmojiPicker">
          <IconEmoji />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";
import EmojiButton from "@joeattardi/emoji-button";

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
      editor: null,
      emojiPicker: null,
      testContent: ''
    };
  },

  computed: {
    classes() {
      return {
        "comment-editor--reply": this.reply
      };
    }
  },

  mounted() {
    // Init editor
    this.editor = new Editor({
      content: "",
      extensions: [
        new Placeholder({
          showOnlyCurrent: true,
          showOnlyWhenEditable: true,
          emptyNodeText: "Viết bình luận"
        })
      ]
    });

    // Init emoji picker
    this.emojiPicker = new EmojiButton({
      position: 'top-end',
      zIndex: 9,
      autoHide: false
    });

    this.emojiPicker.on('emoji', emoji => {
      const currentContent = this.editor.getHTML();
      console.log('currentContent', currentContent)
      console.log('emoji', emoji)
      this.editor.setContent(currentContent + emoji)
    })
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    hanleShowEmojiPicker(event) {
      console.log('event', event)
      const { emojiPicker } = this;
      const button = event.target.tagName === 'svg' ? event.target.parentElement : event.target;

      emojiPicker.pickerVisible
        ? emojiPicker.hidePicker()
        : emojiPicker.showPicker(button);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-editor.scss";
</style>