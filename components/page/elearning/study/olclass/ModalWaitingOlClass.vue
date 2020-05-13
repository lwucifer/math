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
        <!-- <p class="mb-3" v-if="dataLength > 1">
          <i>*Chú ý : buổi học này sẽ được chia thành 2 tiết học. Sau khi tiết học thứ nhất kết thúc, hãy quay lại màn hình này để vào học tiếp tiết học thứ 2</i>
        </p>-->
        <!-- <p class="mb-4" v-if="dataLength > 1"> -->
        <p class="mb-4">
          <i>*Bạn phải có trách nhiệm thông báo về việc phân chia tiết học cho học sinh, và thông báo về tiết học thứ 2 khi tiết học thứ 1 gần kết thúc</i>
        </p>

        <div class="mt-4 text-center">
          <div class="mb-10">
            Phòng học bắt đầu sau
            <span class="color-primary">{{ countdown }}</span>
          </div>
          <a href class="btn color-primary btn--square" @click.prevent="exitRoom">Thoát phòng đợi</a>
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
import { getCountdown_HH_MM_SS } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";

export default {
  props: {
    targetClass: Object
  },

  data() {
    return {
      duration: 30, // in minutes
      countdown: "--:--"
    };
  },

  methods: {
    get,

    exitRoom() {
      console.log("[exitRoom]", this.targetClass);
    },

    close(invite) {
      // this.$emit("close", invite);
      this.$emit('close');
    },

    setCountdown() {
      let seconds = (this.targetClass.duration || 0) * 60; // in seconds
      this.interval = setInterval(() => {
        console.log("[setCountdown]", seconds);
        this.countdown = getCountdown_HH_MM_SS(seconds);
        if (seconds <= 0) {
          // auto join to room

          clearInterval(this.countdown);
          this.$emit('close');
        }
        seconds -= 1;
      }, 1000);
    }
  },

  computed: {},

  mounted() {
    // this.setCountdown();
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