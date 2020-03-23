<template>
  <fragment>
    <div class="cc-box__bg-gray px-4 pt-3 pb-4">
      <h3 class="heading-6 mb-2 mt-3">
        Chương {{ get(chapters, "data.length", 0) + 1 }}
      </h3>
      <app-input
        :counter="80"
        placeholder="Tên chương"
        v-model="payload.name"
      />

      <div class="d-flex justify-content-end mt-4">
        <app-button
          class="clc-btn font-weight-semi-bold mr-4"
          size="sm"
          color="disabled"
          square
          @click="handleCancelAddChapter"
          >Huỷ bỏ</app-button
        >
        <app-button
          class="clc-btn font-weight-semi-bold"
          size="sm"
          square
          @click="handleAddChapter"
          >Tạo chương</app-button
        >
      </div>
    </div>
  </fragment>
</template>

<script>
import { getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  data() {
    return {
      payload: {
        elearning_id: "",
        name: "",
        index: 0
      }
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-chapter", {
      chapters: "chapters"
    })
  },

  methods: {
    async handleAddChapter() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id
        }
      };
      this.payload.elearning_id = elearning_id;
      this.payload.index = get(this, "chapters.data.length", 0);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.ADD}`,
        this.payload
      );
      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "message", ""));
        this.payload.name = ''
        this.$store.dispatch(
          `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.LIST}`,
          options
        );
        return;
      }
      this.$toasted.error(get(res, "message", ""));
    },

    handleCancelAddChapter() {
      this.$emit("handleCancelAddChapter");
    },

    get
  }
};
</script>
