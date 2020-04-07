<template>
  <div class="editor post-editor" :class="classes" @click="showOverlay && setActive(true)">
    <div v-if="showOverlay" class="post-editor__overlay" @click.stop="localActive = false"></div>
    <div class="post-editor__components" @click.self="editor.focus()">
      <div class="post-editor__top">
        <app-avatar
          class="post-editor__avatar"
          :src="avatarUser && avatarUser.low ? avatarUser.low : null"
        />

        <client-only>
          <editor-content :editor="editor" class="post-editor__editor" />
        </client-only>
      </div>

      <PostEditorUpload
        v-show="fileList.length"
        :mode="mode"
        :fileList="fileList"
        :previewList="previewList"
        @remove-item="removeUploadItem"
        @change="handleUploadChange"
      />

      <div class="post-editor__tagger-summary">
        <!-- LABEL -->
        <template v-if="label !== null">
          cảm thấy
          <b>{{ getLabelText() }}</b>
        </template>
        <!-- END LABEL -->

        <!-- TAG -->
        <template v-if="listTag.length">
          cùng với
          <n-link
            class="font-weight-bold"
            :to="`/account/${listTag[0].id}`"
          >{{ selectedTags[0].text }}</n-link>

          <template v-if="listTag.length > 1">
            và
            <n-link
              v-if="listTag.length === 2"
              class="font-weight-bold"
              :to="`/account/${listTag[1].id}`"
            >{{ selectedTags[1].text }}</n-link>

            <app-dropdown v-else>
              <b slot="activator">{{ listTag.slice(1).length }} người khác.</b>
              <div
                v-for="item in selectedTags.slice(1)"
                :key="item.value"
                class="px-3 py-2"
                style="white-space: nowrap;"
              >
                <a :href="`/account/${item.id}`" target="_blank">{{ item.text }}</a>
              </div>
            </app-dropdown>
          </template>
        </template>
        <!-- END TAG -->

        <!-- CHECK IN -->
        <template v-if="checkin !== null">
          tại
          <b>
            <n-link to>{{ selectedCheckin }}</n-link>
          </b>
        </template>
        <!-- END CHECK IN -->
      </div>

      <div v-if="linkDataFetching" class="text-center text-sub caption py-5">
        <template v-if="linkDataFetchError">Không thể tải bản xem trước.</template>
        <template v-else>Đang tìm nạp bản xem trước</template>
      </div>
      <div v-else-if="!linkDataFetching && linkDataFetched" class="post-editor__preview-link">
        <a href class="post-editor__preview-link__remove" @click.prevent="removePreviewLink">
          <IconTimes class="icon" />
        </a>

        <app-content-box
          tag="a"
          target="_blank"
          class="mb-4"
          size="md"
          :href="link.url"
          :image="link.image"
          :title="link.title"
          :desc="link.description"
          :meta-footer="link.siteName"
        />
      </div>

      <app-divider class="mt-3 mb-0" />

      <div v-show="showTags">
        <app-select
          mode="tags"
          class="post-editor__select"
          placeholder="Cùng với ai?"
          style="width: 100%"
          :options="tagOptions"
          v-model="listTag"
          @visible-change="handleFriendsVisibleChange"
        >
          <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
            <app-avatar
              :src="option.avatar && option.avatar.low ? option.avatar.low : null"
              size="sm"
              class="mr-3"
            ></app-avatar>
            {{ option.text }}
          </div>

          <client-only slot="options-append">
            <infinite-loading :identifier="friendsInfiniteId" @infinite="friendsInfiniteHandler" />
          </client-only>
        </app-select>
        <app-divider class="ma-0" />
      </div>

      <div v-show="showCheckin">
        <app-select
          :options="checkinOptions"
          v-model="checkin"
          class="post-editor__select"
          placeholder="Tại"
          show-clear
          searchable
          style="width: 100%"
        >
          <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
            <app-avatar src="https://picsum.photos/80/80" size="sm" class="mr-3"></app-avatar>
            {{ option.text }}
          </div>
        </app-select>
        <app-divider class="mt-0 mb-3" />
      </div>

      <div class="post-editor__toolbar">
        <button class="post-editor__toolbar-item image" @click="handleClickUploadImage">
          <IconAddImage />
          <span>Hình ảnh</span>
        </button>
        <button class="post-editor__toolbar-item tag" @click="showTags = !showTags">
          <IconUserGroup />
          <span>Tag bạn bè</span>
        </button>
        <button class="post-editor__toolbar-item check-in" @click="showCheckin = !showCheckin">
          <IconPinLocation />
          <span>Check in</span>
        </button>
        <app-dropdown class="post-editor__label-dropdown" open-on-click v-model="labelDropdrown">
          <button
            slot="activator"
            slot-scope="{ on }"
            class="post-editor__toolbar-item emoji"
            v-on="on"
          >
            <IconEmoji />
            <span>Nhãn cảm xúc</span>
          </button>

          <ul class="post-editor__status-list">
            <li
              v-for="item in labelList"
              :key="item.id"
              :class="{ 'active': label === item.id }"
              @click="handleClickLabel(item.id)"
            >
              <i class="mr-4">{{ item.icon }}</i>
              <span>{{ item.des }}</span>
            </li>
          </ul>
        </app-dropdown>
      </div>

      <app-divider class="my-3" />

      <div class="post-editor__privacy mt-3">
        <span class="mr-3">Chế độ đăng tin</span>
        <app-select
          class="post-editor__select-private"
          :options="configPrivacyLevels.map(item => ({
            ...item,
            text: item.name
          }))"
          v-model="privacy"
        >
          <template slot="prepend" slot-scope="{ selected }">
            <img class="d-block" :src="selected.image" />
          </template>
        </app-select>
      </div>

      <app-button
        class="post-editor__submit mt-4"
        :disabled="!submitable"
        full-width
        square
        @click.stop="submit"
      >Đăng tin</app-button>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import { getBase64, isValidUrl } from "~/utils/common";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import { checkEditorEmpty } from "~/utils/validations";
import { PasteHandler } from "~/utils/tiptap-plugins";
import { createPostLink } from "~/models/post/PostLink";
import FriendService from "~/services/social/friend";
import ScraperService from "~/services/social/scraper";

import PostEditorUpload from "~/components/page/timeline/postEditor/PostEditorUpload";
import IconAddImage from "~/assets/svg/icons/add-image.svg?inline";
import IconUserGroup from "~/assets/svg/icons/user-group.svg?inline";
import IconPinLocation from "~/assets/svg/icons/pin-location.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";
import IconTimes from "~/assets/svg/design-icons/times.svg?inline";

export default {
  components: {
    PostEditorUpload,
    IconAddImage,
    IconUserGroup,
    IconPinLocation,
    IconEmoji,
    IconTimes,
    EditorContent
  },

  props: {
    active: Boolean,
    prefetch: Boolean,
    showOverlay: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    },
    initialValues: {
      post_id: Number,
      content: String,
      link: String,
      post_image: Array,
      list_tag: Array,
      check_in: Object,
      privacy: Number,
      label_id: Number,
      default: () => ({
        post_id: null,
        content: "",
        link: "",
        post_image: [],
        list_tag: [],
        check_in: null,
        privacy: 8,
        label_id: null
      })
    }
  },

  data() {
    return {
      editor: null,
      showTags: false,
      showCheckin: false,
      previewList: this.initialValues.post_image.map(item =>
        item.link && item.link.low ? item.link.low : null
      ),
      labelDropdrown: false,
      localActive: false,
      friendsInfiniteId: +new Date(),
      friendsListQuery: {
        page: 1
      },
      friendsList: [],
      checkinOptions: [
        { value: 0, text: "Hà Nội" },
        { value: 1, text: "Saudi Arabia" },
        { value: 2, text: "Svalbard and Jan Mayen" },
        { value: 3, text: "Mongolia" },
        { value: 4, text: "Republic of Kosovo" }
      ],

      // Form submit data
      content: this.initialValues.content,
      link: this.initialValues.link ? JSON.parse(this.initialValues.link) : {},
      fileList: this.initialValues.post_image,
      listTag: this.initialValues.list_tag,
      checkin: this.initialValues.check_in,
      privacy: this.initialValues.privacy,
      label: this.initialValues.label_id,

      // Submit edit data
      deleteImgId: [],

      // Fetch link data
      linkDataFetching: false,
      linkDataFetched: false,
      linkDataFetchError: false
    };
  },

  computed: {
    ...mapState("social", { labelList: "labels" }),
    ...mapGetters("social", ["configPrivacyLevels"]),
    ...mapGetters("auth", ["avatarUser"]),

    classes() {
      return {
        active: this.localActive,
        "post-editor--has-overlay": this.showOverlay
      };
    },

    selectedTags() {
      return this.listTag.map(item => {
        const [resultItem = {}] = this.tagOptions.filter(i => i.value === item);
        return resultItem;
      });
    },

    selectedCheckin() {
      const [result = {}] = this.checkinOptions.filter(
        item => item.value === this.checkin
      );
      return result.text;
    },

    tagOptions() {
      return this.friendsList.map(item => ({
        ...item,
        value: item.id,
        text: item.fullname
      }));
    },

    submitable() {
      const conditions = [
        !checkEditorEmpty(this.content),
        this.fileList.length > 0,
        this.label !== null,
        this.checkin !== null
      ];
      return conditions.find(c => !!c) ? true : false;
    }
  },

  created() {
    this.prefetch && this.getFriends();
  },

  mounted() {
    this.editor = new Editor({
      content: this.content,
      extensions: [
        new Placeholder({
          showOnlyCurrent: true,
          showOnlyWhenEditable: true,
          emptyNodeText: "Đăng bài viết..."
        }),
        new PasteHandler({
          onPaste: this.handleEditorPaste
        })
      ],
      onUpdate: ({ getHTML }) => {
        this.content = getHTML();
      }
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  watch: {
    active(newValue) {
      this.localActive = newValue;
    },

    localActive(newValue) {
      this.$emit("active-change", newValue);
    }
  },

  methods: {
    setActive(value) {
      this.localActive = value;
    },

    getLabelText() {
      const [labelObj = {}] = this.labelList.filter(
        item => item.id === this.label
      );

      return "icon" in labelObj && "des" in labelObj
        ? `${labelObj.icon} ${labelObj.des}`
        : "";
    },

    removeUploadItem(index, image) {
      this.fileList = this.fileList
        .slice(0, index)
        .concat(this.fileList.slice(index + 1, this.fileList.length));
      this.previewList = this.previewList
        .slice(0, index)
        .concat(this.previewList.slice(index + 1, this.previewList.length));

      if (this.mode === "edit") {
        const isInitialImage = ["file_id", "link", "post_id"].every(
          key => key in image
        );
        isInitialImage &&
          (this.deleteImgId = [...this.deleteImgId, image.post_id]);
      }
    },

    handleUploadChange(event) {
      // if is preview a link -> remove that. Post prefer image than link
      !isEmpty(this.link) && this.removePreviewLink();

      // push to list
      Array.from(event.target.files).forEach(file => {
        this.fileList.push(file);
        getBase64(file, fileSrc => {
          this.previewList.push(fileSrc);
        });
      });
    },

    handleClickUploadImage() {
      this.$children[0].handleClickControl();
    },

    handleClickLabel(id) {
      this.label === id ? (this.label = null) : (this.label = id);
      this.labelDropdrown = false;
    },

    async getFriends() {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.friendsListQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.friendsListQuery.page += 1;
        this.friendsList = this.friendsList.concat(data.listFriend);
      } else {
        this.$toasted(data.message);
      }
    },

    async friendsInfiniteHandler($state) {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.friendsListQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.friendsListQuery.page += 1;
        this.friendsList = this.friendsList.concat(data.listFriend);
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    handleFriendsVisibleChange(isVisible) {
      if (isVisible) {
        this.friendsList = [];
        this.friendsInfiniteId += 1;
      } else {
        this.friendsListQuery.page = 1;
      }
    },

    submit() {
      const params = {
        content: this.editor.getHTML(),
        link: JSON.stringify(this.link),
        post_image: this.fileList.filter(file =>
          ["link", "post_id", "file_id"].every(key => key in file)
            ? false
            : true
        ),
        list_tag: this.listTag.filter(
          item => !this.initialValues.list_tag.includes(item)
        ),
        check_in: this.checkin,
        privacy: this.privacy,
        label_id: this.label
      };

      if (this.mode === "edit") {
        params.post_id = this.initialValues.post_id;
        params.delete_img_id = this.deleteImgId;
        params.list_tag_del = this.initialValues.list_tag.filter(
          item => !this.listTag.includes(item)
        );
      }

      this.$emit("submit", params, this.clear);
    },

    clear() {
      this.editor.setContent("");
      this.link = {};
      this.linkDataFetched = false;
      this.fileList = [];
      this.listTag = [];
      this.checkin = null;
      this.privacy = 15;
      this.label = null;
    },

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
        !this.fileList.length && !this.linkDataFetched && this.fetchLink(text);
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
        console.log("fetchLink error", error);
        this.linkDataFetchError = true;
      }
    },

    removePreviewLink() {
      this.linkDataFetchError = false;
      this.linkDataFetched = false;
      this.link = {};
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor.scss";
</style>