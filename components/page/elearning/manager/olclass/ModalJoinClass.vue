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
        <h6 class="color-primary mb-3">{{get(data,'extra_info.online_class_name', '')}}</h6>
        <div class="box12 border mb-4">
          <p class="mb-3">
            Tên phòng:
            <b>{{get(data,'extra_info.online_class_name', '')}}</b>
          </p>
          <p class="mb-3">
            Giáo viên:
            <b>{{get(data,'extra_info.teacher_name', '')}}</b>
          </p>
          <p class="mb-3">
            Giờ bắt đầu:
            <b>{{get(data,'extra_info.start_time', '')}}</b>
          </p>
          <p>
            Thời lượng:
            <b>{{get(data,'extra_info.duration', '')}}</b>
          </p>
        </div>

        <p class="mb-3" v-if="dataLength === 1">
          <b>Chú ý:</b> buổi học sẽ được bắt đầu sau giây lát. <b>Bạn không nên đóng cửa sổ này cho đến khi buổi học kết thúc.</b>
        </p>
        <p class="mb-3" v-else>
          <b>Chú ý:</b> buổi học này được chia thành 2 tiết học. Sau khi tiết học thứ nhất kết thúc, hãy đợi trong giây lát, hệ thống sẽ tự động chuyển sang tiết học tiếp theo. <b>Bạn không nên đóng cửa sổ này cho đến khi buổi học kết thúc.</b>
        </p>
        <div class="mt-4 text-center" style="max-height: 400px; overflow-y: auto">
          <p>Phòng học bắt đầu sau: <b class="h5 color-blue">{{data.time_count_down}}</b></p>
          <div class="mb-4 mt-4"> 
            <a
              :href="get(data,'sessions[0].start_url', '')"
              target="blank"
              class="btn btn--color-primary btn--square mr-3"
              :v-if="data.is_started"
            >Vào phòng học</a>
            <app-button color="white" size="lg">Thoát phòng đợi</app-button>
          </div>
          <div v-for="(item, index) in data.sessions" :key="index" class="mb-4">
            <b class="pr-3">Tiết học {{index + 1}}</b>
          </div>
        </div>
      </div>

      <app-modal-confirm
        v-if="showModalConfirm"
        :confirmLoading="confirmLoading"
        @ok="close()"
        :width="550"
        @cancel="showModalConfirm = false"
        :footer="false"
        :header="false"
        title="Bạn có chắc chắn muốn thoát?"
        description="Việc thoát khỏi phòng đợi sẽ gây ảnh hưởng đến buổi học online của bạn."
      />
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
      showModalConfirm: false,
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
@import "~/assets/scss/components/elearning/olclass/join-class.scss";
</style>
