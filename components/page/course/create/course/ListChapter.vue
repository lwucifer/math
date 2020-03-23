<template>
  <fragment>
    <ChapterItem
      v-for="chapter in get(chapters, 'data', [])"
      :key="chapter.id"
      :chapter="chapter"
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
    const elearning_id = getParamQuery("elearning_id");
    const options = {
      params: {
        elearning_id
      }
    };
    console.log('get list chapter')
    this.$store.dispatch(
      `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.LIST}`,
      options
    );
  },

  updated() {
    console.log(this.chapters)
  },

  computed: {
    ...mapState("elearning/creating/creating-chapter", {
      chapters: "chapters"
    })
  },

  methods: {
    get
  }
};
</script>
