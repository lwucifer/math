<template>
  <app-modal
    centered
    :width="750"
    :component-class="{ 'join-class-modal': true }"
    :footer="false"
    title="Phòng đợi"
    @close="close()"
  >
    <div slot="content" v-if="loading">Loading...</div>
    <div slot="content" class="text-center" v-else>
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
            <b>{{formatAMPM(get(data,'extra_info.start_time', ''))}}</b>
          </p>
          <p>
            Thời lượng:
            <b>{{secondsToHms2(get(data,'extra_info.duration', ''))}}</b>
          </p>
        </div>

        <p class="mb-3" v-if="dataLength === 1 && !data.is_started">
          <b>Chú ý:</b> buổi học sẽ được bắt đầu sau giây lát. <b>Bạn không nên đóng cửa sổ này cho đến khi buổi học kết thúc.</b>
        </p>
        <p class="mb-3" v-if="dataLength === 1 && data.is_started">
          <b>Chú ý:</b> buổi học sẽ được bắt đầu sau giây lát. Bạn có thể ấn Vào phòng học để vào phòng trước. <b>Bạn không nên đóng cửa sổ này cho đến khi buổi học kết thúc.</b>
        </p>
        
        <p class="mb-3" v-if="dataLength > 1 && !data.is_started">
          <b>Chú ý:</b> buổi học này được chia thành 2 tiết học. Sau khi tiết học thứ nhất kết thúc, hãy đợi trong giây lát, hệ thống sẽ tự động chuyển sang tiết học tiếp theo. <b>Bạn không nên đóng cửa sổ này cho đến khi buổi học kết thúc.</b>
        </p>
        <p class="mb-3" v-if="dataLength > 1 && data.is_started">
          <b>Chú ý:</b> buổi học này được chia thành 2 tiết học. Sau khi tiết học thứ nhất kết thúc, hãy đợi trong giây lát, hệ thống sẽ tự động chuyển sang tiết học tiếp theo. Bạn phải có trách nhiệm thông báo về việc phân chia tiết học cho học sinh. <b>Bạn không nên đóng cửa sổ này cho đến khi buổi học kết thúc.</b>
        </p>

        <div class="mt-4 text-center">
          <p>Phòng học bắt đầu sau: <b class="h5 color-blue"> {{ secondsToHms(countDown)}}</b></p>
          <div class="mb-4 mt-4 d-flex-center justify-content-center"> 
            <a
              :href="get(data,'sessions[0].start_url', '')"
              target="blank"
              class="btn btn--color-primary btn--square mr-4 btn--size-lg"
              :v-if="data.is_started"
            >Vào phòng học</a>
            <app-button color="white" size="lg" @click="showModalConfirm = true">Thoát phòng đợi</app-button>
          </div>
          <div style="max-height: 300px; overflow-y: auto" v-if="dataLength > 1">
            <div class="text-left d-inline-block">
              <div v-for="(item, index) in data.sessions" :key="index" class="mb-4">
                <p>
                  <span style="color: #222">Tiết học {{index + 1}}: </span> 
                  <a class="bold text-decoration-none"
                    :href="item.start_url"
                    target="blank"
                  >{{formatAMPM(item.start_time, 0)}} - {{formatAMPM(item.start_time, item.duration)}}</a>
                </p>
              </div>
            </div>
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
      duration: this.formatHour(this.info.recent_schedule.duration),
      countDown: 0
    };
  },

  methods: {
    close(invite) {
      this.$emit("close", invite);
    },

    formatAMPM(time, duration) {
      let dur = duration ? parseInt(duration) * 60 * 1000 : 0;
      let date = new Date(time);
      date = new Date(date.getTime() + dur);
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
        self.dataLength = self.get(self.stateClass, "data.sessions", []).length;
        self.countDown = 100;
        //self.countDown = self.get(self.stateClass, "data.time_count_down", 0);
      } catch (e) {
      } finally {
        this.countDownTimer();
        this.loading = false;
      }
    },

    countDownTimer() {
      if(this.countDown > 0) {
        setTimeout(() => {
            this.countDown -= 1
            this.countDownTimer()
        }, 1000)
      }
    },

    secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? h + ":" : "";
      var mDisplay = m > 0 ? m + ":" : "";
      var sDisplay = s > 0 ? s : "";
      return hDisplay + mDisplay + sDisplay;
    },
    
    secondsToHms2(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? h + " giờ " : "";
      var mDisplay = m > 0 ? m + " phút " : "";
      var sDisplay = s > 0 ? s + " giây" : '';
      return hDisplay + mDisplay + sDisplay;
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
