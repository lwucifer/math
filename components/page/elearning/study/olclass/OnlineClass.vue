<template>
  <div class="bg-white mb-4 shadow-1">
    <div class="box bg-light-2">
      <h6>Phòng học online</h6>
    </div>
    <app-divider
      v-if="info.ol_classes && info.ol_classes.length"
      class="my-0"
      color="disabled"
    />
    <div v-if="!get(info, 'ol_classes', []).length" class="box caption">
      Không có phòng học online.
    </div>
    <div
      v-for="(item, index) in get(info, 'ol_classes', [])"
      :key="index"
      class="elearning-lesson-side__class box"
    >
      <div class="d-flex">
        <span
          class="body-3 text-clickable"
          @click.prevent="handlJoinOlClass(item)"
          >{{ index + 1 }}. {{ item.name }}</span
        >
        <IconCalendarAlt
          class="ml-2 icon body-2 text-info text-clickable"
          height="18"
          width="18"
          title="Thời khoá biểu"
          @click.prevent="getTimetable(item)"
        />
      </div>

      <div class="d-flex-left mt-2 caption">
        <div
          class="d-flex-center color-red ml-auto"
          v-if="item.status == liveStatus"
        >
          <IconCameraDot
            class="mr-2 icon heading-3 text-clickable"
            @click.prevent="handlJoinOlClass(item)"
          />
          <span
            class="text-clickable pt-2"
            @click.prevent="handlJoinOlClass(item)"
            >Đang diễn ra</span
          >
        </div>

        <div
          class="d-flex-center text-warning ml-auto"
          v-else-if="item.status == finishStatus && item.streaming_time"
        >
          <IconCam24
            class="mr-2 icon heading-3 text-clickable"
            @click.prevent="handlJoinOlClass(item)"
          />
          <span class="text-clickable" @click.prevent="handlJoinOlClass(item)"
            >Sắp diễn ra -
            {{ item.streaming_time | getDateTimeHH_MM_D_M_Y }}</span
          >
        </div>

        <div
          class="d-flex-center color-999 ml-auto"
          v-else-if="item.status == finishStatus && item.next_time"
        >
          <IconCam24 class="mr-2" />
          <span
            >Thời gian học kế tiếp -
            {{ item.next_time | getDateTimeHH_MM_D_M_Y }}</span
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
      :data="targetClass"
      :contentLoading="waitingClassLoading"
      :isShowModal="modalShow"
    />
    <Timetable
      v-if="isShowTimetable"
      @close="isShowTimetable = false"
      :timetables="convertedTimetables"
      :contentLoading="timetableContentLoading"
    />
  </div>
</template>

<script>
import IconCam24 from "~/assets/svg/v2-icons/videocam_24px.svg?inline";
import IconCalendarAlt from "~/assets/svg/design-icons/calendar-alt.svg?inline";
import IconCameraDot from "~/assets/svg/icons/camera-dot.svg?inline";
import { get } from "lodash";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { LESSION_ONLINE_STATUS, DAY_SECTION } from "~/utils/constants";
import { RESPONSE_SUCCESS } from "~/utils/config";

import ModalWaitingOlClass from "~/components/page/elearning/study/olclass/ModalWaitingOlClass";
import Timetable from "~/components/page/elearning/study/olclass/Timetable";
import {
  convertLocalTimeForTimetable,
  addDurationToUTCDate,
  getTodayDDD,
  isTodayInRangeDate
} from "~/utils/moment";

export default {
  data() {
    return {
      // comingStatus: LESSION_ONLINE_STATUS.COMING,
      liveStatus: LESSION_ONLINE_STATUS.LIVE,
      finishStatus: LESSION_ONLINE_STATUS.FINISH,
      modalShow: false,
      isShowTimetable: false,
      targetClass: null,
      currentOlClass: null,
      timetableContentLoading: true,
      waitingClassLoading: true
    };
  },
  components: {
    IconCam24,
    IconCalendarAlt,
    IconCameraDot,
    ModalWaitingOlClass,
    Timetable
  },

  computed: {
    ...mapState("elearning/study/study-info", ["info"]),
    ...mapState("elearning/study/study-progress", ["currentSession"]),
    ...mapState("elearning/study/study", ["timetables"]),

    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"]),

    olclassLink() {
      const olclasses = get(this.info, "ol_classes", []);
      const olclassLink = olclasses.map(item => {
        let joinLink = "#";

        return {
          ...item,
          href: joinLink
        };
      });
    },

    convertedTimetables() {
      return this.timetables.map(tt => {
        const schedules = [];
        const times = {};
        const timeMorning = {};
        const timeAfternoon = {};
        const timeEvening = {};
        const currentDayInWeek = getTodayDDD();
        const todayInRange = isTodayInRangeDate(tt.from_date, tt.to_date);
        console.log("[todayInRange]", todayInRange);

        for (const s in tt.schedules) {
          const arrTime = tt.schedules[s];
          if (!arrTime || arrTime.length < 1) {
            timeMorning[s] = "";
            timeAfternoon[s] = "";
            timeEvening[s] = "";
          } else {
            arrTime.map(a => {
              const start_time = convertLocalTimeForTimetable(a.start_time);
              const end_time = convertLocalTimeForTimetable(a.end_time);

              const checkWhichTimeInDay = this.checkWhichTimeInDay(end_time);
              const value = `${start_time} - ${end_time}`;
              if (checkWhichTimeInDay == DAY_SECTION.MORNING) {
                timeMorning[s] = value;
              } else if (checkWhichTimeInDay == DAY_SECTION.AFTERNOON) {
                timeAfternoon[s] = value;
              } else if (checkWhichTimeInDay == DAY_SECTION.EVENING) {
                timeEvening[s] = value;
              }
            });
            timeMorning["day"] = DAY_SECTION.MORNING;
            timeAfternoon["day"] = DAY_SECTION.AFTERNOON;
            timeEvening["day"] = DAY_SECTION.EVENING;
          }

          // set active day in week
          // console.log("[currentDayInWeek]", currentDayInWeek, s);
          if (s == currentDayInWeek && todayInRange) {
            timeMorning["today"] = "today";
            timeAfternoon["today"] = "today";
            timeEvening["today"] = "today";
          }
        }
        schedules.push(timeMorning);
        schedules.push(timeAfternoon);
        schedules.push(timeEvening);
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
    ...mapActions("elearning/study/study-olclass", [
      "elearningStudyOlclassLessonSessionsList"
    ]),
    ...mapActions("elearning/study/study", ["elearningStudyListTimetable"]),

    ...mapMutations("elearning/study/study-progress", [
      "setStudyProgressCurrentSession"
    ]),

    handlJoinOlClass(item) {
      console.log("[handlJoinOlClass]", item);
      this.targetClass = { ...item };
      this.currentOlClass = item;
      this.modalShow = true;

      this.elearningStudyOlclassLessonSessionsList({
        params: { online_class_id: item.id }
      }).then(res => {
        console.log("[elearningStudyOlclassLessonSessionsList] res", res);
        if (res.success == RESPONSE_SUCCESS) {
          const tartgetClass = res.data;
          const sessions = tartgetClass.sessions || [];
          const sessionImpls = sessions.map(s => {
            return {
              ...s,
              end_time: addDurationToUTCDate(s.start_time, s.duration, "m")
            };
          });
          this.targetClass = { ...res.data, sessions: sessionImpls };
        }
        this.waitingClassLoading = false;
      });
    },

    getTimetable(olclass) {
      console.log("[getTimetable]", olclass);
      this.isShowTimetable = !this.isShowTimetable;
      this.elearningStudyListTimetable({
        params: { online_class_id: olclass.id }
      }).then(res => {
        if (res.success == RESPONSE_SUCCESS) {
          console.log("[elearningStudyListTimetable]", res.data);
        }
        this.timetableContentLoading = false;
      });
    },

    /**
     * @param: hh:mm
     * return 1: morning, 2: afternoon, 3: evening
     */
    checkWhichTimeInDay(time) {
      if (!time) return 1;
      const splits = time.split(":");
      const hh = parseInt(splits[0]);
      if (hh >= 0 && hh <= 12) {
        return DAY_SECTION.MORNING;
      } else if (hh > 12 && hh <= 18) {
        return DAY_SECTION.AFTERNOON;
      } else if (hh > 18 && hh <= 24) {
        return DAY_SECTION.EVENING;
      }
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
