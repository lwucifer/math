<template>
  <app-modal
    width="606px"
    :header="false"
    :footer="false"
    @close="$listeners.cancel ? $listeners.cancel() : null"
  >
    <div class="pms-header" slot="header">
      <h2 class="pms-header__title">Chia sẻ</h2>
      <app-select v-model="share" class="my-3" :options="shareOpts" size="sm">
        <IconAngleDown slot="placeholder-icon" class="icon" />
      </app-select>
    </div>

    <div slot="content" class="pms-body">
      <editor-content class="editor pms-editor" :editor="editor" />

      <slot name="share-content"></slot>
    </div>

    <div slot="footer" class="pms-footer">
      <div class="pms-footer__left">
        <app-button class="pms-footer__flat-btn tag" color flat size="xs">
          <IconUserGroup class="icon" />
        </app-button>

        <app-button class="pms-footer__flat-btn location" color flat size="xs">
          <IconPinLocation class="icon" />
        </app-button>

        <app-button class="pms-footer__flat-btn emoji" color flat size="xs">
          <IconEmoji class="icon" />
        </app-button>
      </div>

      <div class="pms-footer__right">
        <app-button class="pms-footer__btn mr-4" color="info" square @click="$emit('cancel')">Huỷ bỏ</app-button>
        <app-button
          class="pms-footer__btn"
          color="primary"
          :loading="btnSubmitLoading"
          square
          @click="submit"
        >Chia sẻ</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { get } from "lodash";
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import { SHARE_OPTS, POST_TYPES } from "~/utils/constants";

import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconUserGroup from "~/assets/svg/icons/user-group.svg?inline";
import IconPinLocation from "~/assets/svg/icons/pin-location.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";

import Post from "~/components/page/timeline/post/Post";

export default {
  components: {
    IconAngleDown,
    EditorContent,
    IconUserGroup,
    IconPinLocation,
    IconEmoji,
    Post
  },

  props: {
    post: {
      type: Object,
      default: () => ({})
      // validator: value =>
      //   [
      //     "post_id",
      //     "author",
      //     "created_at",
      //     "total_like",
      //     "total_comment",
      //     "content",
      //     "privacy"
      //   ].every(key => key in value)
    }
  },

  data() {
    return {
      editor: null,
      btnSubmitLoading: false,
      share: SHARE_OPTS.TIMELINE,
      shareOpts: [
        {
          value: SHARE_OPTS.TIMELINE,
          text: "Trên dòng thời gian của bạn"
        },
        {
          value: SHARE_OPTS.FRIEND,
          text: "Chia sẻ trên dòng thời gian của bạn bè"
        },
        {
          value: SHARE_OPTS.MESSAGE,
          text: "Chia sẻ trong tin nhắn riêng"
        }
      ]
    };
  },

  mounted() {
    this.editor = new Editor({
      content: this.content,
      extensions: [
        new Placeholder({
          showOnlyCurrent: true,
          showOnlyWhenEditable: true,
          emptyNodeText: "Nói gì đó về nội dung  ..."
        })
      ]
    });
  },

  methods: {
    submit() {
      this.btnSubmitLoading = true;

      const payload = {
        post_id:
          this.post.type === POST_TYPES.SHARE
            ? get(this.post, "parent_post.post_id", null)
            : this.post.post_id,
        content: this.editor.getHTML(),
        list_tag: null,
        label_id: null
      };

      const cb = () => {
        this.btnSubmitLoading = false;
      };

      this.$emit("share", payload, cb);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-modal-share.scss";
</style>
