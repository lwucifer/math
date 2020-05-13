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
          @click.prevent="isShowTimetable = !isShowTimetable"
        />
      </div>
      <div class="d-flex-left mt-3">
        <div
          class="d-flex-center color-red ml-auto"
          v-if="item.status == liveStatus"
          @click.prevent="handleLiveClass(item)"
        >
          <IconCam24 class="mr-2 fill-red text-clickable" height="18" width="18" />
          <span class="text-clickable">Đang diễn ra</span>
        </div>
        <div
          class="d-flex-center color-yellow ml-auto"
          v-else-if="item.next_time"
          @click.prevent="handleComingClass(item)"
        >
          <IconCam24 class="mr-2 fill-yellow text-clickable" height="18" width="18" />
          <span class="text-clickable">Sắp diễn ra {{ item.next_time | getDateTimeHH_MM_D_M_Y }}</span>
        </div>
        <div class="color-999 d-flex-center" v-else-if="item.status == finishStatus">
          <IconCam24 class="mr-2" />
          <span>Đã kết thúc</span>
        </div>
      </div>
    </div>

    <ModalWaitingOlClass v-if="modalShow" @close="modalShow = false" :targetClass="targetClass" />
    <Timetable v-if="isShowTimetable" @close="isShowTimetable = false" />
  </div>
</template>



<script>
import IconCam24 from "~/assets/svg/v2-icons/videocam_24px.svg?inline";
import IconCalendarAlt from "~/assets/svg/design-icons/calendar-alt.svg?inline";
import { get } from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";
import { LESSION_ONLINE_STATUS } from "~/utils/constants";
import { RESPONSE_SUCCESS } from "~/utils/config";
import { TEACHING_OLCLASS_LESSON_SESSIONS } from "~/utils/action-types";

import ModalWaitingOlClass from "~/components/page/elearning/study/olclass/ModalWaitingOlClass";
import Timetable from "~/components/page/elearning/study/olclass/Timetable";

export default {
  data() {
    return {
      // comingStatus: LESSION_ONLINE_STATUS.COMING,
      liveStatus: LESSION_ONLINE_STATUS.LIVE,
      finishStatus: LESSION_ONLINE_STATUS.FINISH,
      modalShow: false,
      isShowTimetable: false,
      targetClass: null
    };
  },
  components: {
    IconCam24,
    IconCalendarAlt,
    ModalWaitingOlClass,
    Timetable
  },

  computed: {
    ...mapState("elearning/study/study-info", ["info"]),

    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"])
  },

  methods: {
    get,
    ...mapActions("elearning/teaching/olclass", [
      "teachingOlclassLessonSessionsList"
    ]),

    handleOlClassSignin(item) {
      console.log("[handleOlClassSignin]", item);
    },

    handleLiveClass(item) {
      console.log("[handleLiveClass]", item);
      this.teachingOlclassLessonSessionsList({
        params: { online_class_id: item.id }
      }).then(res => {
        console.log("[teachingOlclassLessonSessionsList] res", res);
        if (res.success == RESPONSE_SUCCESS) {
          const {data} = res;
          if (data.is_started == true) {
            const sessions = data.sessions || [];
            const zoom = sessions.find(
              s => s.position == data.session_starting_position
            );
            if (!zoom) return;

            // check user role is teach or student to open start_url or join_url
            if (this.isTeacherRole) {
              window.open(zoom.start_url);
            } else if (this.isStudentRole) {
              window.open(zoom.join_url);
            }
          }
        }
      });
    },

    handleComingClass(item) {
      console.log("[handleComingClass]", item);
      this.teachingOlclassLessonSessionsList({
        params: { online_class_id: item.id }
      }).then(res => {
        console.log("[teachingOlclassLessonSessionsList] res", res);
        this.modalShow = true;
        if (res.success == RESPONSE_SUCCESS) {
          this.targetClass = { data };
        }
      });
    }
  }
};
</script>
