<template>
  <div>
    <app-modal-confirm
      centered
      :width="476"
      v-if="showRequestCode"
      @cancel="$emit('handleCancel')"
    >
      <template #title>
        <h4 class="mb-3">Bài giảng riêng tư</h4>
      </template>

      <template #description>
        <p class="text-center mb-3">
          Vui lòng nhập mã riêng tư vào ô dưới đây để truy cập bài giảng
        </p>

        <app-input v-model="code" placeholder="Nhập mã"></app-input>
      </template>

      <template slot="actions" slot-scope="{ confirmLoading }">
        <app-button
          class="font-weight-semi-bold mr-3"
          color="default"
          outline
          @click="$emit('handleCancel')"
        >
          Hủy
        </app-button>

        <app-button
          class="font-weight-semi-bold"
          color="primary"
          :style="{ 'pointer-events': confirmLoading ? 'none' : '' }"
          @click="$emit('handleSubmit', code)"
        >
          <app-spin
            v-if="confirmLoading"
            class="mr-3"
            color="white"
            size="small"
          />
          Xác nhận
        </app-button>

        <div class="mt-4 mess text-secondary font-italic text-left">
          Nếu bạn chưa có mã riêng tư để truy cập, bạn có thể gửi yêu cầu tham
          gia bài giảng <a @click="handleRequestCode">tại đây</a>
        </div>
      </template>
    </app-modal-confirm>

    <app-modal-notify
      centered
      v-if="inputCodeSuccess"
      type="success"
      title="Gửi yêu cầu thành công!"
      @ok="inputCodeSuccess = false"
      @close="closeModalNoti"
    />
  </div>
</template>

<script>
import moment from "moment";
import { get } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      inputCodeSuccess: false,
      code: "",
    };
  },

  props: {
    showRequestCode: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState("auth", {
      token: "token",
    }),
  },

  methods: {
    async handleRequestCode() {
      const data = {
        class_name: "",
        elearning_id: get(this, "$route.params.id", ""),
        request_date: "",
        student_id: get(this, "token.id", ""),
        student_name: get(this, "token.fullname", ""),
      };
      const res = await this.$axios({
        url: "/elearning/request",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      if (get(res, "data.success", false)) {
        this.inputCodeSuccess = true;
        return;
      }
      this.$toasted.error(get(res, "data.message", "Có lỗi xảy ra"));
    },

    closeModalNoti() {
      this.inputCodeSuccess = false;
    },
  },
};
</script>
