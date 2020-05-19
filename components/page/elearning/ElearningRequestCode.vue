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
          gia bài giảng tại đây
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

  methods: {
    closeModalNoti() {
      this.inputCodeSuccess = false;
    },
  },
};
</script>
