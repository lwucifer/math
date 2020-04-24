<template>
  <app-modal centered :width="420" :component-class="{ 'join-class-modal': true }">
    <div slot="content">
      <div class="title-moal">
        <h5>Phòng đợi</h5>
        <button @click="close">X</button>
      </div>
      <div>
        <p>Tên phòng học: {{data.online_class_name}}</p>
        <p>Giáo viên: {{data.online_class_name}}</p>
        <p>Thời lượng: {{data.recent_schedule.duration}} phút</p>

        <div>
          Phòng học bắt đầu lúc {{data.recent_schedule.start_time}}
        </div>

        <div>
          Tiết học 1
          <app-button full-width nuxt :to="data.recent_schedule.schedule_id">Vào phòng học</app-button>
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close">Hủy</app-button>
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