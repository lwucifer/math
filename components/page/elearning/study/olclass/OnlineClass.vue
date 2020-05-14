<template>
  <div class="box11 mb-4 pb-0">
    <h6>Phòng học online</h6>
    <div
      v-for="(item, index) in get(info, 'ol_classes', [])"
      :key="index"
      class="elearning-lesson-side__class"
    >
      <div class="d-flex">
        <span class="text-clickable" @click.prevent="handlJoinOlClass(item)"
          >{{ index + 1 }}. {{ item.name }}</span
        >
        <IconCalendarAlt
          class="ml-2 fill-blue text-clickable"
          height="18"
          width="18"
          title="Thời khoá biểu"
          @click.prevent="getTimetable(item)"
        />
      </div>
      <div class="d-flex-left mt-3">
        <div
          class="d-flex-center color-red ml-auto"
          v-if="item.status == liveStatus"
        >
          <IconCam24
            class="mr-2 fill-red text-clickable"
            height="18"
            width="18"
            @click.prevent="handlJoinOlClass(item)"
          />
          <span class="text-clickable" @click.prevent="handlJoinOlClass(item)"
            >Đang diễn ra</span
          >
        </div>
        <div
          class="d-flex-center color-yellow ml-auto"
          v-else-if="item.status == finishStatus && item.next_time"
        >
          <IconCam24
            class="mr-2 fill-yellow text-clickable"
            height="18"
            width="18"
            @click.prevent="handlJoinOlClass(item)"
          />
          <span class="text-clickable" @click.prevent="handlJoinOlClass(item)"
            >Sắp diễn ra {{ item.next_time | getDateTimeHH_MM_D_M_Y }}</span
          >
        </div>
        <div class="color-999 d-flex-center" v-else>
          <IconCam24 class="mr-2" />
          <span>Đã kết thúc</span>
        </div>
      </div>
    </div>

    <ModalWaitingOlClass
      v-if="modalShow"
      @close="modalShow = false"
      :targetClass="targetClass"
    />
    <Timetable
      v-if="isShowTimetable"
      @close="isShowTimetable = false"
      :timetables="convertedTimetables"
    />
  </div>
</template>

<script>
import IconCam24 from "~/assets/svg/v2-icons/videocam_24px.svg?inline";
import IconCalendarAlt from "~/assets/svg/design-icons/calendar-alt.svg?inline";
import { get } from "lodash";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
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
      targetClass: null,
      currentOlClass: null
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
    ...mapState("elearning/study/study-progress", ["currentSession"]),
    ...mapState("elearning/study/study", ["timetable"]),

    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"]),

    convertedTimetables() {
      return this.timetable.map(tt => {
        const schedules = [];
        for (const s in tt.schedules) {
          const arrTime = tt.schedules[s];
          schedules.push({
            [s]: arrTime.map(a => {
              return `${a.start_time}-${a.end_time}`;
            })
          });
        }
        return {
          from_date: tt.from_date,
          to_date: tt.to_date,
          schedules: schedules
        };
      });
    }
  },

  methods: {
    get,
    ...mapActions("elearning/teaching/olclass", [
      "teachingOlclassLessonSessionsList"
    ]),
    ...mapActions("elearning/study/study", ["elearningStudyListTimetable"]),

    ...mapMutations("elearning/study/study-progress", [
      "setStudyProgressCurrentSession"
    ]),

    handlJoinOlClass(item) {
      console.log("[handlJoinOlClass]", item);
      this.currentOlClass = item;

      this.teachingOlclassLessonSessionsList({
        params: { online_class_id: item.id }
      }).then(res => {
        console.log("[teachingOlclassLessonSessionsList] res", res);
        if (res.success == RESPONSE_SUCCESS) {
          const { data } = res;
          if (item.status == LESSION_ONLINE_STATUS.LIVE) {
            // lessiong is living => open zoom
            if (data.is_started == true) {
              const sessions = data.sessions || [];
              const zoom = sessions.find(
                s => s.position == data.session_starting_position
              );
              if (!zoom) return;

              // student open start_url or join_url
              if (this.isStudentRole) {
                window.open(zoom.join_url);
              }
            }

            // fake to test coming lesson
            this.modalShow = true;
            this.targetClass = data;
          } else if (
            item.status == LESSION_ONLINE_STATUS.FINISH &&
            item.next_time
          ) {
            // lession is coming => show modal Waiting
            this.modalShow = true;
            this.targetClass = data;
          }
        }
      });
    },

    getTimetable(olclass) {
      console.log("[getTimetable]", olclass);
      this.elearningStudyListTimetable({
        params: { online_class_id: olclass.id }
      }).then(res => {
        if (res.success == RESPONSE_SUCCESS) {
          console.log("[elearningStudyListTimetable]", res.data);
          this.isShowTimetable = !this.isShowTimetable;
        }
      });
    }
  },

  watch: {
    currentSession(_newVal, _oldVal) {
      console.log("[currentSession]", _newVal, _oldVal);
      if (_newVal != _oldVal) {
        // this.handlJoinOlClass(this.currentOlClass);
      }
    }
  }
};
</script>
