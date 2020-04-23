<template>
  <app-modal centered :width="420" :component-class="{ 'join-class-modal': true }">
    <div slot="content">
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close(false)">Hủy</app-button>
        <app-button size="sm" square @click="hanldeInvate">Mời</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>

export default {
  components: {},

  props: {
    data: {},
  },

  data() {
  },

  methods: {
  },
};
</script>

<style lang="scss">
.invite-student-modal .app-modal-content {
  padding: 2rem 1.5rem;
}
.student-list {
  background: #fbfbfb;
  padding: 1.2rem 1.5rem;
  margin-top: 2rem;
  .item {
    display: block;
    margin-bottom: 1rem;
    .app-checkbox {
      display: inline-block;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>