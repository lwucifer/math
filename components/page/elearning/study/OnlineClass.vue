<template>
  <div class="box11 mb-4 pb-0">
    <h6>Phòng học online</h6>
    <div
      v-for="(item, index) in get(info, 'ol_classes', [])"
      :key="index"
      class="elearning-lesson-side__class"
    >
      <div class="d-flex">
        <span>{{ index + 1 }}. {{ item.name }}</span>
        <IconCalendarAlt
          class="ml-2 fill-blue text-clickable"
          height="18"
          width="18"
          @click.prevent="handleOlClassSignin(item)"
        />
        <!-- <app-checkbox v-model="item.status" class="ml-auto" /> -->
      </div>
      <div class="d-flex-left mt-3">
        <div class="color-999 d-flex-center" v-if="item.status == liveStatus">
          <IconCam24 class="mr-2" />
          <span>Đang diễn ra</span>
        </div>
        <div class="d-flex-center color-yellow ml-auto" v-else-if="item.next_time">
          <IconCam24 class="mr-2 fill-yellow" height="18" width="18" />
          <span>Sắp diễn ra {{ item.next_time | getDateTimeHH_MM_D_M_Y }}</span>
        </div>
        <div class="d-flex-center color-red ml-auto" v-else-if="item.status == finishStatus">
          <IconCam24 class="mr-2 fill-red" height="18" width="18" />
          <span>Đã kết thúc</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconCam24 from "~/assets/svg/v2-icons/videocam_24px.svg?inline";
import IconCalendarAlt from "~/assets/svg/design-icons/calendar-alt.svg?inline";
import { get } from "lodash";
import { mapState } from "vuex";
import { LESSION_ONLINE_STATUS } from "~/utils/constants";

export default {
  data() {
    return {
      // comingStatus: LESSION_ONLINE_STATUS.COMING,
      liveStatus: LESSION_ONLINE_STATUS.LIVE,
      finishStatus: LESSION_ONLINE_STATUS.FINISH
    };
  },
  components: {
    IconCam24,
    IconCalendarAlt
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
