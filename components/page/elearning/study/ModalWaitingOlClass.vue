<template>
  <app-modal
    centered
    :width="750"
    :component-class="{ 'join-class-modal': true }"
    :footer="false"
    title="Phòng đợi"
    @close="close()"
  >
    <div slot="content" class="text-center">
      <div class="text-left">
        <h6 class="color-primary mb-3">Phòng học online số 1</h6>
        <div class="box12 border mb-4">
          <p class="mb-3">
            Giáo viên:
            <b>Trần Văn Nam</b>
          </p>
          <p class="mb-3">
            Giờ bắt đầu:
            <b>11:30 AM</b>
          </p>
          <p>
            Thời lượng:
            <b>1 giờ 30 phút</b>
          </p>
        </div>

        <p class="mb-3">
          Hãy nhấn nút
          <b>"Vào phòng học"</b> dưới đây để vào phòng.
          <b
            class="color-red"
          >Bạn không nên đóng cửa cho đến khi buổi học kết thúc.</b>
        </p>
        <p class="mb-3" v-if="dataLength > 1">
          <i>*Chú ý : buổi học này sẽ được chia thành 2 tiết học. Sau khi tiết học thứ nhất kết thúc, hãy quay lại màn hình này để vào học tiếp tiết học thứ 2</i>
        </p>
        <p class="mb-4" v-if="dataLength > 1">
          <i>*Bạn phải có trách nhiệm thông báo về việc phân chia tiết học cho học sinh, và thông báo về tiết học thứ 2 khi tiết học thứ 1 gần kết thúc</i>
        </p>

        <div class="mt-4 text-center">
          <div class="mb-10">Phòng học bắt đầu sau <span class="color-primary">15:01</span></div>
          <a
              target="blank"
              class="btn color-primary btn--square"
            >Thoát phòng đợi</a>
        </div>

        <!-- <hr /> -->
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
    id: null,
    info: Object
  },

  data() {
    return {
      data: [],
      dataLength: 0,
      loading: false,
      startTime: this.formatAMPM(this.info.recent_schedule.start_time),
      duration: this.formatHour(this.info.recent_schedule.duration)
    };
  },

  methods: {
    close(invite) {
      this.$emit("close", invite);
    },

    formatAMPM(time) {
      const date = new Date("2000-01-01 " + time);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },

    formatHour(time) {
      let minutes = time % 60;
      let hours = Math.floor(time / 60) == 0 ? "" : Math.floor(time / 60);
      let strTime = hours + " giờ " + minutes + " phút";
      return strTime;
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
        self.dataLength = self.data.length;
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
    })
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
strong {
  color: #222;
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