<template>
  <fragment>
    <ChapterItem
      v-for="chapter in get(chapters, 'data', [])"
      :key="get(chapter, 'id', '')"
      :chapter="chapter"
      @handleRefreshChapters="handleRefreshChapters"
    />
  </fragment>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import { getParamQuery } from "~/utils/common";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import ChapterItem from "~/components/page/course/create/course/ChapterItem";
import { get } from "lodash";

export default {
  components: {
    IconEditAlt,
    IconTrashAlt,
    ChapterItem
  },

  created() {
    this.getChapters();
  },

  computed: {
    ...mapState("elearning/creating/creating-chapter", {
      chapters: "chapters"
    })
  },

  methods: {
    get,

    getChapters() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id
        }
      };
      this.$store.dispatch(
        `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.LIST}`,
        options
      );
    },

    handleRefreshChapters(key) {
      this.getChapters();
    }
  }
};
</script>
