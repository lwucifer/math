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
            Tên phòng:
            <b>{{ get(targetClass, "extra_info.online_class_name", "--") }}</b>
          </p>
          <p class="mb-3">
            Giáo viên:
            <b>{{ get(targetClass, "extra_info.teacher_name", "--") }}</b>
          </p>
          <p class="mb-3">
            Giờ bắt đầu:
            <b>{{ get(targetClass, "extra_info.start_time", "--:--") }}</b>
          </p>
          <p>
            Thời lượng:
            <b>{{ get(targetClass, "extra_info.duration", 0) | formatHour }}</b>
          </p>
        </div>

        <!-- <p class="mb-3">
          Hãy nhấn nút
          <b>"Vào phòng học"</b> dưới đây để vào phòng.
          <b
            class="color-red"
          >Bạn không nên đóng cửa cho đến khi buổi học kết thúc.</b>
        </p>-->
        <p class="mb-3" v-if="dataLength > 1">
          <i>
            Chú ý : buổi học này sẽ được chia thành 2 tiết học. Sau khi tiết học
            thứ nhất kết thúc, hãy đợi trong giây lát, hệ thống sẽ tự động
            chuyển sang tiết học tiếp theo. Bạn không nên đóng cửa sổ này cho
            đến khi buổi học kết thúc.
          </i>
        </p>
        <!-- <p class="mb-4" v-if="dataLength > 1"> -->
        <!-- <p class="mb-4">
          <i>*Bạn phải có trách nhiệm thông báo về việc phân chia tiết học cho học sinh, và thông báo về tiết học thứ 2 khi tiết học thứ 1 gần kết thúc</i>
        </p>-->

        <div class="mt-4 text-center">
          <div class="mb-10">
            Phòng học bắt đầu sau
            <span class="color-primary">{{ countdown }}</span>
          </div>
          <a
            href
            class="btn color-primary btn--square"
            @click.prevent="exitRoom"
            >Thoát phòng đợi</a
          >
        </div>

        <!-- <hr /> -->
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect, getCountdown_HH_MM_SS } from "~/utils/common";

let interval = null;

export default {
  props: {
    targetClass: Object
  },

  data() {
    return {
      duration: 30, // in minutes
      countdown: "--:--",
      seconds: null,
      currentZoom: null,
    };
  },

  methods: {
    get,
    ...mapMutations("elearning/study/study-progress", [
      "setStudyProgressCurrentSession"
    ]),

    exitRoom() {
      console.log("[exitRoom]", this.targetClass);
    },

    close() {
      console.log("[close]", interval);
      clearInterval(interval);
      this.$emit("close");
    },

    setCountdown() {
      let seconds = this.targetClass.time_count_down || 0; // in seconds
      const duration = get(this.targetClass, "extra_info.duration", 0);
      // const session_starting_position = get(this.targetClass, "session_starting_position", 0);
      const session_starting_position = 1;
      const isStudentRole = this.isStudentRole;

      interval = setInterval(() => {
        console.log("[setCountdown]", seconds);
        this.countdown = getCountdown_HH_MM_SS(seconds);
        this.seconds = seconds;

        if (seconds <= 0) {
          // auto join to room
          const sessions = this.targetClass.sessions || [];
          const zoom = sessions.find(
            s => s.position == session_starting_position
          );

          if (!zoom) return;
          this.currentZoom = zoom;

          clearInterval(interval);

          // student open start_url or join_url
          if (isStudentRole) {
            window.open(zoom.join_url);
          }
        }
        seconds -= 1;
      }, 1000);
    }
  },

  computed: {
    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"]),

    dataLength() {
      return this.targetClass.sessions.length || 0;
    }
  },

  mounted() {
    console.log("[targetClass]", this.targetClass);
    this.setCountdown();
  },

  watch: {
    seconds(_newVal) {
      console.log("[seconds] _newVal", _newVal);
      if(_newVal <= 0){
        this.setStudyProgressCurrentSession(this.currentZoom);
      }
    }
  },

  beforeDestroy() {
    clearInterval(interval);
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
