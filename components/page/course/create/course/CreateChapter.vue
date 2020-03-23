<template>
  <fragment>
    <div class="cc-box__bg-gray px-4 pt-3 pb-4">
      <h3 class="heading-6 mb-2 mt-3">Chương 1</h3>
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

  methods: {
    async handleAddChapter() {
      const elearning_id = getParamQuery("elearning_id");
      this.payload.elearning_id = elearning_id;
      const res = await this.$store.dispatch(
        `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.ADD}`,
        this.payload
      );
      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "message", ""));
        return;
      }
      this.$toasted.error(get(res, "message", ""));
    }
  }
};
</script>
