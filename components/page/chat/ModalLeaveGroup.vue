<template>
  <app-modal centered :width="300" :component-class="{ 'message-modal': true }">
    <div slot="content" class="text-center">
      <h5 class="mb-3">Bạn muốn rời nhóm <span class="color-red">Tên nhóm?</span></h5>
      <div class="mt-3">
        <app-button size="sm" color="info" class="mr-3" square @click="close()">Hủy</app-button>
        <app-button size="sm" square>Xác nhận</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},

  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("close");
    }
  },

  computed: {}
};
</script>