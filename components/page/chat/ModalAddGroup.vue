<template>
  <app-modal centered :width="420" :component-class="{ 'create-group-chat-modal': true }">
    <div slot="content">
      <h5>Tạo nhóm chat</h5>
      <div class="d-flex-center">
        <app-upload class="cgi-upload-avt change-avatar-group mr-3" @change="handleUploadChange">
          <template>
            <IconCamera width="20" height="20" />
          </template>
        </app-upload>
        <input type="text" class="input-name-group" placeholder="Tên nhóm chat" />
      </div>
      <app-search class="mb-0" />
      <div class="contact-list">
        <div class="item d-flex-center" v-for="(item, index) in friends" :key="index">
          <app-avatar :src="item.avatar" :size="30" class="mr-3" />
          <span>{{item.name}}</span>
          <app-checkbox class="ml-auto" />
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close()">Hủy</app-button>
        <app-button size="sm" square>Tạo</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},

  props: {
    friends: {
      type: Array,
      default: () => [],
      required: true
    }
  },

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