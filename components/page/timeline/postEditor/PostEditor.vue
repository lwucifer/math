<template>
  <div class="editor post-editor" :class="{ 'active': active }" @click="setActive(true)">
    <div class="post-editor__overlay" @click.stop="active = false"></div>
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
        <template v-if="label !== null">cảm thấy <b>{{ getLabelText() }}</b></template>
        <template v-if="tag && tag.length">
          cùng với
          <b v-for="(item, index) in selectedTags" :key="item.value">
            <n-link to>{{ item.text }}</n-link>
            {{ index < (selectedTags.length - 1) ? ', ' : '' }}
          </b>
        </template>
        <template v-if="checkin !== null">
          tại
          <b>
            <n-link to>{{ selectedCheckin }}</n-link>
          </b>
        </template>
      </div>

      <app-divider class="mt-3 mb-0" />

      <div v-show="showTags">
        <app-select
          mode="tags"
          :options="tagOptions"
          v-model="tag"
          class="post-editor__select"
          placeholder="Cùng với ai?"
          style="width: 100%"
        >
          <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
            <app-avatar src="https://picsum.photos/80/80" size="sm" class="mr-3"></app-avatar>
            {{ option.text }}
          </div>
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
        <app-select class="post-editor__select-private" :options="shareWithOpts" v-model="shareWith">
          <IconGlobe slot="prepend" class="post__edit-select__prepend d-block" />
        </app-select>
      </div>

      <app-button full-width square class="post-editor__submit mt-4" @click="submit">Đăng tin</app-button>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";
import { getBase64 } from "~/utils/file";
import PostEditorUpload from "~/components/page/timeline/postEditor/PostEditorUpload";
import IconAddImage from "~/assets/svg/icons/add-image.svg?inline";
import IconUserGroup from "~/assets/svg/icons/user-group.svg?inline";
import IconPinLocation from "~/assets/svg/icons/pin-location.svg?inline";
import IconEmoji from "~/assets/svg/icons/emoji.svg?inline";
import IconGlobe from "~/assets/svg/icons/globe.svg?inline";

export default {
  components: {
    PostEditorUpload,
    IconAddImage,
    IconUserGroup,
    IconPinLocation,
    IconEmoji,
    EditorContent,
    IconGlobe
  },

  data() {
    return {
      editor: null,
      showTags: false,
      showCheckin: false,
      tag: [],
      checkin: null,
      fileList: [],
      previewList: [],
      label: null,
      labelDropdrown: false,
      shareWith: 0,
      active: false,
      tagOptions: [
        { value: 0, text: "Nguyen Tien Dat" },
        { value: 1, text: "Nguyen Van A" },
        { value: 2, text: "Nguyen Van B" },
        { value: 3, text: "Nguyen Van C" },
        { value: 4, text: "Nguyen Van D" },
        { value: 5, text: "Nguyen Van E" },
        { value: 6, text: "Nguyen Van F" },
        { value: 7, text: "Nguyen Van G" }
      ],
      checkinOptions: [
        { value: 0, text: "Hà Nội" },
        { value: 1, text: "Saudi Arabia" },
        { value: 2, text: "Svalbard and Jan Mayen" },
        { value: 3, text: "Mongolia" },
        { value: 4, text: "Republic of Kosovo" }
      ],
      labelList: [
        {
          id: 1,
          icon: "😄",
          des: "vui vẻ"
        },
        {
          id: 2,
          icon: "😍",
          des: "hạnh phúc"
        },
        {
          id: 3,
          icon: "😡",
          des: "tức giận"
        },
        {
          id: 4,
          icon: "😞",
          des: "thất vọng"
        },
        {
          id: 5,
          icon: "😞",
          des: "suy ngẫm"
        }
      ],
      shareWithOpts: [
        { value: 0, text: "Công khai" },
        { value: 1, text: "Bạn bè" },
        { value: 3, text: "Chỉ mình tôi" }
      ],
      // Form submit data
      link: '',
      post_image: [],
      list_tag: [],
      check_in: {},
      privacy: 8,
      label_id: null 
    };
  },

  computed: {
    selectedTags() {
      return this.tag.map(item => {
        const [resultItem = {}] = this.tagOptions.filter(i => i.value === item);
        return resultItem;
      });
    },

    selectedCheckin() {
      const [result = {}] = this.checkinOptions.filter(
        item => item.value === this.checkin
      );
      return result.text;
    }
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
  },

  methods: {
    setActive(value) {
      this.active = value;
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

    submit() {
      console.log('submit', this.editor.getHTML());

      this.$emit('submit', {
        content: this.editor.getHTML(),
        link: this.link,
        post_image: this.fileList[0],
        list_tag: [],
        check_in: {},
        privacy: 8,
        label_id: null
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor.scss";
</style>