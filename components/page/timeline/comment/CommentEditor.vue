<template>
  <div class="comment-editor" :class="classes">
    <app-avatar
      :size="reply ? 'xs' : 'sm'"
      :src="$store.state.auth.avatarUser && $store.state.auth.avatarUser.low"
      class="comment-editor__avatar"
    />

    <div class="comment-editor__right">
      <div class="comment-editor__editor-wrapper">
        <client-only>
          <editor-content :editor="editor" class="editor comment-editor__editor" />

          <div class="suggestion-list" v-show="hasResults" ref="suggestions">
            <div
              v-for="(user, index) in mentionList"
              :key="user.id"
              class="suggestion-list__item"
              :class="{ 'is-selected': mentionNavigatedIndex === index }"
              @click="selectUser(user)"
            >
              <app-avatar
                class="mr-3"
                :size="32"
                :src="(user.avatar && user.avatar.low) ? user.avatar.low : null"
              />
              {{ user.fullname }}
            </div>

            <infinite-loading :identifier="mentionInfiniteId" @infinite="mentionInfiniteHandler">
              <div slot="no-more" class="text-sub py-3">Không còn dữ liệu</div>
              <div slot="no-results" class="text-sub py-3">Không tìm thấy "{{ mentionQuery.name }}"</div>
            </infinite-loading>
          </div>
        </client-only>

        <div class="comment-editor__actions">
          <app-upload
            :fileList="uploadFileList"
            accept="video/*, video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif"
            class="comment-editor__upload d-inline-block"
            @change="handleUploadChange"
          >
            <button type="button" class="comment-editor__button image">
              <IconAddImage class="icon" />
            </button>
          </app-upload>

          <button type="button" class="comment-editor__button emoji" @click="hanleShowEmojiPicker">
            <IconEmoji class="icon" />
          </button>
        </div>
      </div>

      <!-- Upload Image -->
      <div v-if="uploadImgSrc" class="comment-editor__upload__preview mt-3">
        <img :src="uploadImgSrc" alt />
        <span class="comment-editor__upload__close" @click.stop="removeImgUpload">
          <IconClose class="icon" />
        </span>
      </div>
      <!-- End Upload Image -->

      <!-- Fetch Link -->
      <div v-if="linkDataFetching" class="text-center text-sub caption mt-3">
        <template v-if="linkDataFetchError">Không thể tải bản xem trước.</template>
        <template v-else>Đang tìm nạp bản xem trước</template>
      </div>

      <div
        v-else-if="!linkDataFetching && linkDataFetched"
        class="comment-editor__preview-link mt-3"
      >
        <a href class="comment-editor__preview-link__remove" @click.prevent="removePreviewLink">
          <IconTimes class="icon" />
        </a>

        <app-content-box
          tag="a"
          target="_blank"
          class="mb-4"
          size="sm"
          :href="link.url"
          :image="link.image"
          :title="link.title"
          :desc="link.description"
          :meta-footer="link.siteName"
        />
      </div>
      <!-- End Fetch Link -->
    </div>
  </div>
</template>

<script>
import { debounce, isEmpty } from "lodash";
import tippy from "tippy.js";
import "tippy.js/themes/light.css";
import { Editor, EditorContent } from "tiptap";
import { Placeholder, HardBreak, Mention } from "tiptap-extensions";
import { EnterHandler } from "~/utils/tiptap-plugins";
import EmojiButton from "@joeattardi/emoji-button";

import { getBase64 } from "~/utils/common";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import { clearEmptyTag } from "~/utils/validations";
import { isValidUrl } from "~/utils/common";
import { createPostLink } from "~/models/post/PostLink";
import FriendService from "~/services/social/friend";
import ScraperService from "~/services/social/scraper";

import IconAddImage from "~/assets/svg/icons/add-image.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconPlus = () => import("~/assets/svg/design-icons/plus.svg?inline");
const IconTimes = () => import("~/assets/svg/design-icons/times.svg?inline");

export default {
  components: {
    EditorContent,
    IconAddImage,
    IconEmoji,
    IconClose,
    IconPlus,
    IconTimes
  },

  props: {
    reply: Boolean,
    prefetch: Boolean,
    initialValues: {
      avatar: Object,
      comment_content: String,
      comment_image: Object,
      comment_link: String,
      is_like: Number,
      type_like: String,
      tags: Array,
      default: () => ({
        avatar: {},
        comment_content: "",
        comment_image: {},
        comment_link: "",
        is_like: 0,
        type_like: null,
        tags: []
      })
    }
  },

  data() {
    return {
      editor: null,
      emojiPicker: null,

      // Mention data
      mentionQuery: {
        page: 1,
        name: null
      },
      mentionList: [],
      mentionNavigatedIndex: 0,
      mentionPopup: null,
      mentionSuggestionRange: null,
      insertMention: () => {},
      mentionInfiniteId: +new Date(),

      // Image upload data
      uploadFileList: [],
      uploadImgSrc: null,

      // Fetch link data
      linkDataFetching: false,
      linkDataFetched: false,
      linkDataFetchError: false,

      // Form submit data
      link: this.initialValues.link ? JSON.parse(this.initialValues.link) : null,

    };
  },

  computed: {
    classes() {
      return {
        "comment-editor--reply": this.reply
      };
    },

    hasResults() {
      return this.mentionList && this.mentionList.length
        ? this.mentionList.length
        : 0;
    },

    submitable() {
      const conditions = [this.uploadFileList.length, !isEmpty(this.link)];

      return conditions.some(condition => !!condition);
    }
  },

  mounted() {
    // Init editor
    this.editor = new Editor({
      content: "",
      autoFocus: true,
      extensions: [
        new Placeholder({
          showOnlyCurrent: true,
          showOnlyWhenEditable: true,
          emptyNodeText: "Viết bình luận"
        }),
        new HardBreak(),
        new EnterHandler({
          onEnter: this.enterHandler
        }),
        new Mention({
          // a list of all suggested items
          items: this.friendsList,
          // is called when a suggestion starts
          onEnter: ({ items, query, range, command, virtualNode }) => {
            this.mentionQuery.name = query;
            this.mentionSuggestionRange = range;
            this.renderPopup(virtualNode);
            // we save the command for inserting a selected mention
            // this allows us to call it inside of our custom popup
            // via keyboard navigation and on click
            this.insertMention = command;
          },
          // is called when a suggestion has changed
          onChange: ({ items, query, range, virtualNode }) => {
            this.mentionQuery.name = query;
            this.mentionSuggestionRange = range;
            this.mentionNavigatedIndex = 0;
            !this.mentionPopup && this.renderPopup(virtualNode);
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            // reset all saved values
            this.mentionQuery = {
              page: 1,
              name: null
            };
            this.mentionList = [];
            //
            this.mentionSuggestionRange = null;
            this.mentionNavigatedIndex = 0;
            this.destroyPopup();
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            // pressing up arrow
            if (event.key === "ArrowUp") {
              this.upHandler();
              return true;
            }
            // pressing down arrow
            if (event.key === "ArrowDown") {
              this.downHandler();
              return true;
            }
            // pressing enter
            // if (event.key === "Enter") {
            //   this.enterHandler();
            //   return true;
            // }
            return false;
          }
          // is called when a suggestion has changed
          // this function is optional because there is basic filtering built-in
          // you can overwrite it if you prefer your own filtering
          // onFilter: (items, query) => {
          // }
        })
      ],
      onPaste: this.handleEditorPaste
    });

    // Init emoji picker
    this.emojiPicker = new EmojiButton({
      position: "top-end",
      zIndex: 9,
      autoHide: false
    });

    this.emojiPicker.on("emoji", emoji => {
      const { state, dispatch } = this.editor.view;
      const { $from } = state.selection;
      const { pos } = $from.pos;
      dispatch(state.tr.insertText(`${emoji}`, pos));
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  watch: {
    "mentionQuery.name": debounce(async function(newValue) {
      this.mentionList = [];
      this.mentionQuery.page = 1;

      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.mentionQuery
      });
      if (data.listFriend && data.listFriend.length) {
        newValue !== null && (this.mentionInfiniteId += 1);
        this.mentionQuery.page += 1;
        this.mentionList = this.mentionList.concat(data.listFriend);
      } else {
        this.$toasted.error(data.message);
      }
    }, 300)
  },

  methods: {
    clear() {
      this.editor.setContent("");
      this.removeImgUpload();
      this.removePreviewLink();
    },

    hanleShowEmojiPicker(event) {
      const { emojiPicker } = this;
      const button =
        event.target.tagName === "svg"
          ? event.target.parentElement
          : event.target;

      emojiPicker.pickerVisible
        ? emojiPicker.hidePicker()
        : emojiPicker.showPicker(button);
    },

    getTagsFromHTML(html) {
      const el = document.createElement("div");
      el.innerHTML = html;

      const tagEls = el.querySelectorAll("[data-mention-id]");

      if (tagEls.length) {
        return Array.from(tagEls).map(item =>
          parseInt(item.getAttribute("data-mention-id"))
        );
      }
      return [];
    },

    submit() {
      const html = this.editor.getHTML();
      const clearedHtml = clearEmptyTag(html);

      if (clearedHtml || this.submitable) {
        this.$emit(
          "submit",
          clearedHtml,
          this.getTagsFromHTML(clearedHtml),
          this.uploadFileList[0] || null,
          !isEmpty(this.link) ? JSON.stringify(this.link) : null
        );
        this.clear();
      }
    },

    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.mentionNavigatedIndex =
        (this.mentionNavigatedIndex + this.mentionList.length - 1) %
        this.mentionList.length;
    },

    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.mentionNavigatedIndex =
        (this.mentionNavigatedIndex + 1) % this.mentionList.length;
    },

    enterHandler() {
      if (this.mentionPopup) {
        const user = this.mentionList[this.mentionNavigatedIndex];
        if (user) {
          this.selectUser(user);
        }
      } else {
        this.submit();
      }
    },

    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser(user) {
      this.insertMention({
        range: this.mentionSuggestionRange,
        attrs: {
          id: user.id,
          label: user.fullname
        }
      });
      this.editor.focus();
    },

    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.mentionPopup) {
        return;
      }
      this.mentionPopup = tippy(node, {
        content: this.$refs.suggestions,
        trigger: "mouseenter",
        interactive: true,
        theme: "light",
        placement: "bottom-start",
        inertia: true,
        duration: [400, 200],
        showOnInit: true,
        arrow: true,
        // arrowType: "round",
        onHidden: instance => {
          this.destroyPopup();
        }
      });
      // we have to update tippy whenever the DOM is updated
      if (MutationObserver) {
        this.observer = new MutationObserver(() => {
          this.mentionPopup.popperInstance.scheduleUpdate();
        });
        this.observer.observe(this.$refs.suggestions, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    },

    destroyPopup() {
      if (this.mentionPopup) {
        this.mentionPopup.destroy();
        this.mentionPopup = null;
      }
      if (this.observer) {
        this.observer.disconnect();
      }
    },

    async mentionInfiniteHandler($state) {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.mentionQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.mentionQuery.page += 1;
        this.mentionList = this.mentionList.concat(data.listFriend);
        $state.loaded();
      } else if (this.mentionList.length) {
        $state.loaded();
        $state.complete();
      } else {
        $state.complete();
      }
    },

    /**
     * Remove image upload
     */
    removeImgUpload() {
      this.uploadFileList = [];
      this.uploadImgSrc = null;
    },

    handleUploadChange(fileList, event) {
      // if is preview a link -> remove that. Post prefer image than link
      !isEmpty(this.link) && this.removePreviewLink();

      this.uploadFileList = Array.from(fileList);
      getBase64(this.uploadFileList[0], src => {
        this.uploadImgSrc = src;
      });
    },

    /**
     * Paste handler
     */
    handleEditorPaste(view, event, slice) {
      const { clipboardData } = event;

      if (clipboardData.files && clipboardData.files.length) {
        // Handle paste file here
        return;
      }

      // Handle paste text
      const text = clipboardData.getData("text");
      const isUrl = isValidUrl(text);

      // If paste text is a string url
      if (isUrl) {
        // If no image in post and had not been fetched any link
        !this.uploadFileList.length &&
          !this.linkDataFetched &&
          this.fetchLink(text);
      }
    },

    async fetchLink(url) {
      try {
        this.linkDataFetching = true;

        const getInfo = await new ScraperService(this.$axios)[
          ACTION_TYPE_BASE.ADD
        ]({
          link: url
        });

        this.linkDataFetching = false;
        this.linkDataFetched = true;

        if (getInfo.success) {
          if (getInfo.data && getInfo.data.success) {
            const {
              ogTitle,
              ogType,
              ogUrl,
              ogSiteName,
              ogDescription,
              ogImage = {},
              ogVideo = {}
            } = getInfo.data.data;
            const linkModel = createPostLink({
              type: ogType,
              url: ogUrl,
              siteName: ogSiteName,
              title: ogTitle,
              description: ogDescription,
              updatedTime: null,
              image: ogImage.url,
              imageWidth: ogImage.width,
              imageHeight: ogImage.height,
              videoUrl: ogVideo.url,
              videoSecureUrl: ogVideo.secureUrl,
              videoType: ogVideo.type,
              videoWidth: ogVideo.width,
              videoHeight: ogVideo.height,
              videoTag: ogVideo.tag
            });
            this.link = linkModel;
          }
        }
      } catch (error) {
        this.linkDataFetchError = true;
      }
    },

    removePreviewLink() {
      this.linkDataFetchError = false;
      this.linkDataFetched = false;
      this.link = null;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/timeline/_suggestion-list.scss";
@import "~/assets/scss/components/comment/_comment-editor.scss";
</style>