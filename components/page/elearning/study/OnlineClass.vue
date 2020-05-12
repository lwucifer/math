<template>
  <div class="box11 mb-4 pb-0">
    <h6>Phòng học online</h6>
    <div
      v-for="(item, index) in get(info, 'ol_classes', [])"
      :key="index"
      class="elearning-lesson-side__class"
    >
      <div class="d-flex">
        <span
          class="text-clickable"
          @click.prevent="handleOlClassSignin(item)"
        >{{ index + 1 }}. {{ item.name }}</span>
        <IconCalendarAlt
          class="ml-2 fill-blue text-clickable"
          height="18"
          width="18"
          title="Thời khoá biểu"
        />
      </div>
      <div class="d-flex-left mt-3">
        <div class="d-flex-center color-red ml-auto" v-if="item.status == finishStatus">
          <IconCam24 class="mr-2 fill-red" height="18" width="18" />
          <span>Đang diễn ra</span>
        </div>
        <div class="d-flex-center color-yellow ml-auto" v-else-if="item.next_time">
          <IconCam24 class="mr-2 fill-yellow" height="18" width="18" />
          <span>Sắp diễn ra {{ item.next_time | getDateTimeHH_MM_D_M_Y }}</span>
        </div>
        <div class="color-999 d-flex-center" v-else-if="item.status == liveStatus">
          <IconCam24 class="mr-2" />
          <span>Đã kết thúc</span>
        </div>
      </div>
    </div>

    <ModalWaitingOlClass v-if="modalShow" @close="modalShow = false" :info="{recent_schedule: '', recent_schedule: ''}" :id="''"/>
  </div>
</template>



<script>
import IconCam24 from "~/assets/svg/v2-icons/videocam_24px.svg?inline";
import IconCalendarAlt from "~/assets/svg/design-icons/calendar-alt.svg?inline";
import { get } from "lodash";
import { mapState } from "vuex";
import { LESSION_ONLINE_STATUS } from "~/utils/constants";

import ModalWaitingOlClass from "~/components/page/elearning/study/ModalWaitingOlClass";

export default {
  data() {
    return {
      // comingStatus: LESSION_ONLINE_STATUS.COMING,
      liveStatus: LESSION_ONLINE_STATUS.LIVE,
      finishStatus: LESSION_ONLINE_STATUS.FINISH,
      modalShow: false,
    };
  },
  components: {
    IconCam24,
    IconCalendarAlt,
    ModalWaitingOlClass,
  },

  computed: {
    ...mapState("elearning/study/study-info", ["info"])
  },

  methods: {
    get,
    handleOlClassSignin(item) {
      console.log("[handleOlClassSignin]", item);
    }
  }
};
</script>
