<template>
  <app-modal centered :width="420" :component-class="{ 'join-class-modal': true }">
    <div slot="content" class="text-center box22">
      <div class="title-modal mb-4">
        <h3>Phòng đợi</h3>
      </div>
      <div class="text-left">
        <!-- <p>Tên phòng học: {{data.online_class_name}}</p>
        <p>Giáo viên: {{data.online_class_name}}</p>
        <p>Thời lượng: {{data.recent_schedule.duration}} phút</p>

        <div>Phòng học bắt đầu lúc {{data.recent_schedule.start_time}}</div> -->

        <div v-for="(item, index) in data" :key="index" class="mb-3">
          <span class="pr-3">Tiết học {{index + 1}}</span>
          <a :href="item.start_url" target="blank" class="btn btn--color-primary btn--square">Vào phòng học</a>
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close()">Đóng</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";

export default {
  components: {},

  props: {
    id: null
  },

  data() {
    return {
      data: [],
      loading: false
    };
  },

  methods: {
    close(invite) {
      this.$emit("close", invite);
    },

    async getList() {
      const self = this;
      try {
        self.loading = true;
        let params = { online_class_id: this.id };
        await self.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSON_SESSIONS.LIST}`,
          { params }
        );

        self.data = self.get(self.stateClass, "data", []);
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

    get
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateClass: "LessonSessions"
    }),
  },

  created() {
    this.getList();
  }
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