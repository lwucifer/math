<template>
  <div class="editor post-editor" :class="classes" @click="showOverlay && setActive(true)">
    <div v-if="showOverlay" class="post-editor__overlay" @click.stop="localActive = false"></div>
    <div class="post-editor__components" @click.self="editor.focus()">
      <div class="post-editor__top">
        <div class="post-editor__avatar">
          <img src="https://picsum.photos/60/60" alt />
        </div>

        <client-only>
          <editor-content :editor="editor" class="post-editor__editor" />
        </client-only>
      </div>

      <PostEditorUpload
        v-show="fileList.length"
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

      <app-button class="post-editor__submit mt-4" :disabled="!submitable" full-width square @click.stop="submit">Đăng tin</app-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import { getBase64, isValidUrl } from "~/utils/common";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import { checkEditorEmpty } from "~/utils/validations";
import { PasteHandler } from "~/utils/tiptap-plugins";
import FriendService from "~/services/social/friend";

import PostEditorUpload from "~/components/page/timeline/postEditor/PostEditorUpload";
import IconAddImage from "~/assets/svg/icons/add-image.svg?inline";
import IconUserGroup from "~/assets/svg/icons/user-group.svg?inline";
import IconPinLocation from "~/assets/svg/icons/pin-location.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";

export default {
  components: {
    PostEditorUpload,
    IconAddImage,
    IconUserGroup,
    IconPinLocation,
    IconEmoji,
    EditorContent
  },

  props: {
    active: Boolean,
    prefetch: Boolean,
    showOverlay: {
      type: Boolean,
      default: true
    },
    initialValues: {
      content: String,
      link: String,
      post_image: Array,
      list_tag: Array,
      check_in: Object,
      privacy: Number,
      label_id: Number,
      default: () => ({
        content: "",
        link: "",
        post_image: [],
        list_tag: [],
        check_in: null,
        privacy: 15,
        label_id: null
      })
    }
  },

  data() {
    return {
      editor: null,
      showTags: false,
      showCheckin: false,
      fileList: [],
      previewList: [],
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
      link: this.initialValues.link,
      post_image: this.initialValues.post_image,
      listTag: this.initialValues.list_tag,
      checkin: this.initialValues.check_in,
      privacy: this.initialValues.privacy,
      label: this.initialValues.label_id
    };
  },

  computed: {
    ...mapState("social", { labelList: "labels" }),
    ...mapGetters("social", ["configPrivacyLevels"]),

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
      },
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

    removeUploadItem(index) {
      this.fileList = this.fileList
        .slice(0, index)
        .concat(this.fileList.slice(index + 1, this.fileList.length));
      this.previewList = this.previewList
        .slice(0, index)
        .concat(this.previewList.slice(index + 1, this.previewList.length));
    },

    handleUploadChange(event) {
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
      this.$emit(
        "submit",
        {
          content: this.editor.getHTML(),
          link: this.link,
          post_image: this.fileList,
          list_tag: JSON.stringify(this.listTag),
          check_in: JSON.stringify(this.checkin),
          privacy: this.privacy,
          label_id: this.label
        },
        this.clear
      );
    },

    clear() {
      this.editor.setContent("");
      this.link = "";
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
        this.fetchLink(text);
      }
    },

    fetchLink(url) {
      const ogs = require("open-graph-scraper");
      const options = { url, encoding: "utf8" };
      ogs(options, (error, results) => {
        console.log("error:", error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
        console.log("results:", results);
      });

      // this.$axios.get(url).then(res => {
      //   console.log(res)
      // })
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor.scss";
</style>