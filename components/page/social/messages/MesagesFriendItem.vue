<template>
  <div class="messages-friend-item">
    <div class="messages-friend-item__avatar">
      <app-avatar :src="avatar" :size="avatarSize" />
      <div v-if="online" class="messages-friend-item__dot"></div>
    </div>
    <span class="messages-friend-item__name">{{ name }}</span>
    <button v-if="showButtonAdd" type="button" class="messages-friend-item__add" @click="$emit('add')">
      <IconPersonAdd class="icon fill-opacity-1" />
    </button>
  </div>
</template>

<script>
import IconPersonAdd from "~/assets/svg/v2-icons/person_add_24px.svg?inline";

export default {
  components: {
    IconPersonAdd
  },

  props: {
    avatar: String,
    avatarSize: String,
    name: String,
    online: Boolean,
    showButtonAdd: Boolean
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/social/_messages-friend-item.scss";
</style>