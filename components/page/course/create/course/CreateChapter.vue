<template>
  <fragment>
    <div class="cc-box__bg-gray px-4 pt-3 pb-4">
      <h3 class="heading-6 mb-2 mt-3">
        Chương {{ get(chapters, "data.length", 0) + 1 }} <span class="text-base font-weight-normal">(Tối đa 60 ký tự)</span>
      </h3>
      <app-input
        :counter="60"
        placeholder="Tên chương"
        v-model="payload.name"
      />

      <div class="d-flex justify-content-end mt-4">
        <app-button
          class="clc-btn font-weight-semi-bold mr-4 text-secondary"
          size="md"
          color="default"
          outline
          @click="$emit('cancel')"
          >Huỷ bỏ</app-button
        >
        <app-button
          class="clc-btn font-weight-semi-bold"
          size="md"
          @click="handleAddChapter"
          >Thêm chương</app-button
        >
      </div>
    </div>
    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
    />
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
      },
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-chapter", {
      chapters: "chapters",
    }),
  },

  methods: {
    async handleAddChapter() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id,
        },
      };
      this.payload.elearning_id = elearning_id;
      const res = await this.$store.dispatch(
        `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.ADD}`,
        this.payload
      );

      this.handleCancelModal();

      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "message", "Thành công"));
        this.payload.name = "";
        this.$emit("cancel");
        this.$store.dispatch(`elearning/create/getContent`);
        this.$store.dispatch(`elearning/create/getProgress`);
        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    get,
  },
};
</script>
