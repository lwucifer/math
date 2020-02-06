<template>
  <div class="editor post-editor">
    <div class="post-editor__top">
      <div class="post-editor__avatar">
        <img src="https://picsum.photos/60/60" alt />
      </div>

      <client-only>
        <editor-content :editor="editor" class="post-editor__editor" />
      </client-only>
    </div>

    <app-upload class="post-editor__uploader"></app-upload>

    <div class="post-editor__tagger-summary">
      <!-- <template v-if="status !== null">cảm thấy {{ status }}</template> -->
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
      <button class="post-editor__toolbar-item image">
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
      editor: null,
      showTags: false,
      showCheckin: false,
      tag: [],
      checkin: null,
      status: "lovely",
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
      ]
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
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor.scss";
</style>