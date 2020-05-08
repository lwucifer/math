<template>
  <div>
    <div class="container">
    <breadcrumb />
    
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
          <h5 class="page-title">
            Tạo phòng học online
          </h5>
          <div class="olclasses-create-main box">
            <div class="mt-4">
              <div class="form-item">
                <label>
                  <strong>Thuộc bài giảng/ khóa học</strong>
                </label>
                <app-vue-select
                  style="width: 100%"
                  class="app-vue-select form-item__selection"
                  v-model="filterCourse"
                  :options="courses"
                  label="text"
                  placeholder="Chọn"
                  searchable
                  clearable
                  @input="handleChangedCourse"
                ></app-vue-select>
              </div>

              <div class="form-item">
                <label>
                  <strong>Tên phòng học</strong> (Tối đa 60 ký tự)
                </label>
                <div class="input-limit">
                  <input type="text" :value="params.name" @input="changeName"/>
                  <span class="limit">{{params.name.length}}</span>
                </div>
              </div>

              <div class="form-item">
                <label>
                  <strong>Chế độ hiển thị</strong> (Hiển thị theo thuộc tính của bài giảng /khóa học liên quan)
                </label>
                <app-vue-select
                  style="width: 17rem"
                  class="app-vue-select form-item__selection"
                  v-model="filterPrivacy"
                  :options="privacies"
                  label="text"
                  placeholder="Công khai"
                  searchable
                  clearable
                  @input="handleChangedPrivacy"
                ></app-vue-select>
              </div>

              <div class="form-item">
                <label>
                  <strong>Gửi lời mời học đến toàn bộ học sinh đã tham gia bài giảng/ khóa học này của bạn</strong>
                </label>
                <app-radio name="sendmess" value="1" class="mr-6" v-model="sendMess">Có</app-radio>
                <app-radio name="sendmess" value="0" v-model="sendMess">Không</app-radio>
              </div>

              <!-- <div class="form-item">
                <label>
                  <strong>Cho phép học sinh tải video bài giảng của bạn</strong>
                </label>
                <app-radio name="dơwnloadvideo" value="1" class="mr-6" v-model="downloadVideo">Có</app-radio>
                <app-radio name="dơwnloadvideo" value="0" v-model="downloadVideo">Không</app-radio>
              </div> -->

              <div class="form-item">
                <p><strong>Lịch học</strong> (Việc tạo lịch học là bắt buộc)</p>

                <div class="box22 border mt-3" v-for="(item, index) in timeArray" :key="index">
                  <div class="">
                    <h6 class="mb-3">Giờ học</h6>
                    <div class="d-flex-center">
                    <div class="d-flex-center mb-4 mr-6">
                      <label class="mr-3">Bắt đầu vào lúc</label>
                      <app-vue-select
                        style="width: 10rem"
                        class="app-vue-select form-item__selection mr-3"
                        v-model="startTime.time"
                        :options="times"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedTime"
                      ></app-vue-select>
                      <app-vue-select
                        style="width: 9rem"
                        class="app-vue-select form-item__selection"
                        v-model="startTime.type"
                        :options="timeTypes"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedTime"
                      ></app-vue-select>
                    </div>
                    <div class="d-flex-center  mb-4">
                      <label class="mr-3">Thời lượng</label>
                      <app-vue-select
                        style="width: 9rem"
                        class="app-vue-select form-item__selection mr-2"
                        v-model="duration.hours"
                        :options="hours"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedDuration"
                      ></app-vue-select>
                      <app-vue-select
                        style="width: 10rem"
                        class="app-vue-select form-item__selection ml-3 mr-2"
                        v-model="duration.minutes"
                        :options="minutes"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedDuration"
                      ></app-vue-select>
                    </div>
                    </div>
                  </div>

                  <div class="form-item mb-5">
                    <label>
                      <strong>Ngày học trong tuần</strong>
                    </label>
                    <div class="d-flex-center mt-3">
                      <app-checkbox
                        @change="check($event, 'MON')"
                        :checked="selectedItems.includes('MON')"
                        label="Thứ 2"
                      ></app-checkbox>
                      <app-checkbox
                        @change="check($event, 'TUE')"
                        :checked="selectedItems.includes('TUE')"
                        label="Thứ 3"
                      />
                      <app-checkbox
                        @change="check($event, 'WED')"
                        :checked="selectedItems.includes('WED')"
                        label="Thứ 4"
                      />
                      <app-checkbox
                        @change="check($event, 'THU')"
                        :checked="selectedItems.includes('THU')"
                        label="Thứ 5"
                      />
                      <app-checkbox
                        @change="check($event, 'FRI')"
                        :checked="selectedItems.includes('FRI')"
                        label="Thứ 6"
                      />
                      <app-checkbox
                        @change="check($event, 'SAT')"
                        :checked="selectedItems.includes('SAT')"
                        label="Thứ 7"
                      />
                      <app-checkbox
                        @change="check($event, 'SUN')"
                        :checked="selectedItems.includes('SUN')"
                        label="Chủ nhật"
                      />
                    </div>
                  </div>

                  <div class="form-item">
                    <label>
                      <strong>Thời gian áp dụng</strong>
                    </label>
                    <div class="d-flex-center mt-15">
                      <div class="d-flex-center mr-4">
                        <label>Từ</label>
                        <app-date-picker
                          class="ml-3"
                          v-model="params.schedules[0].from_date"
                          square
                          size="sm"
                          placeholder="dd/mm/yyyy"
                        >
                          <template v-slot:icon-calendar>
                            <IconCalendar />
                          </template>
                        </app-date-picker>
                      </div>
                      <div class="d-flex-center">
                        <label>Đến</label>
                        <app-date-picker
                          class="ml-3"
                          v-model="params.schedules[0].to_date"
                          square
                          size="sm"
                          placeholder="dd/mm/yyyy"
                        >
                          <template v-slot:icon-calendar>
                            <IconCalendar />
                          </template>
                        </app-date-picker>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 mb-4">
              <app-button color="info" class="mr-3" @click="cancelTime">Hủy</app-button>
              <app-button @click="saveTime">Thêm lịch học</app-button>
              <button class="d-flex-center color-primary bold" @click="addTime"><IconPlus class="fill-primary mr-2" /> Thêm lịch học</button>
            </div>
          </div>

          <div class="mt-4 mb-4 text-right">
              <app-button color="info" class="mr-3" @click="fnCancel">Thiết lập lại</app-button>
              <app-button color="info" class="mr-3" @click="fnSave2" :disabled="!fullParams">Lưu nháp</app-button>
              <app-button @click="fnSave" :disabled="!fullParams">Tạo phòng học</app-button>
            </div>
        </div>
      </div>
    </div>

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancelModal"
      :footer="false" :header="false"
    />

    <app-modal
        centered
        :width="408"
        :component-class="{ 'app-modal-confirm': true }"
        @close="$router.push('/')"
        v-if="showNotify"
        :footer="false" :header="false"
    >
        <div slot="content">
          <div class="text-center pt-4 pb-4">
            <a class="btn-close" @click="showNotify = false">X</a>
            <p class="title mb-4">{{message}}</p>
            <div class="text-center">
                <app-button color="primary" size="sm" square @click="showNotify = false">OK</app-button>
            </div>
            </div>
        </div>
    </app-modal>
  </div>
</template>

<script>
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconPlus from "~/assets/svg/icons/plus2.svg?inline";
import HeaderCreate from "~/components/layout/header/HeaderCreate";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"

import { get, reject } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { useEffect, getParamQuery } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

function initialState (){
  return {
    tab: 1,
    timeArray: [{}],
    message: "",
    fullParams: false,
    sendMess: "0",
    downloadVideo: "0",
    showModalConfirm: false,
    showNotify: false,
    confirmLoading: false,
    showBonus: false,
    startTime: {
      time: {
        value: "1:00",
        text: "1:00"
      },
      type: {
        value: "AM",
        text: "AM"
      }
    },
    duration: {
      hours: {
        value: '1',
        text: '1 giờ'
      },
      minutes: {
        value: '30',
        text: '30 phút'
      }
    },
    hours: [
      {
        value: "1",
        text: "1 giờ"
      },
      {
        value: "2",
        text: "2 giờ"
      },
      {
        value: "3",
        text: "3 giờ"
      },
      {
        value: "4",
        text: "4 giờ"
      },
      {
        value: "5",
        text: "5 giờ"
      },
      {
        value: "6",
        text: "6 giờ"
      },
      {
        value: "7",
        text: "7 giờ"
      },
      {
        value: "8",
        text: "8 giờ"
      },
    ],
    minutes: [
      {
        value: "00",
        text: "00 phút"
      },
      {
        value: "15",
        text: "15 phút"
      },
      {
        value: "30",
        text: "30 phút"
      },
      {
        value: "45",
        text: "45 phút"
      }
    ],
    timeTypes: [
      {
        value: "AM",
        text: "AM"
      },
      {
        value: "PM",
        text: "PM"
      }
    ],
    times: [
      {
        value: "1:00",
        text: "1:00"
      },
      {
        value: "1:30",
        text: "1:30"
      },
      {
        value: "2:00",
        text: "2:00"
      },
      {
        value: "2:30",
        text: "2:30"
      },
      {
        value: "3:00",
        text: "3:00"
      },
      {
        value: "3:30",
        text: "3:30"
      },
      {
        value: "4:00",
        text: "4:00"
      },
      {
        value: "4:30",
        text: "4:30"
      },
      {
        value: "5:00",
        text: "5:00"
      },
      {
        value: "5:30",
        text: "5:30"
      },
      {
        value: "6:00",
        text: "6:00"
      },
      {
        value: "6:30",
        text: "6:30"
      },
      {
        value: "7:00",
        text: "7:00"
      },
      {
        value: "7:30",
        text: "7:30"
      },
      {
        value: "8:00",
        text: "8:00"
      },
      {
        value: "8:30",
        text: "8:30"
      },
      {
        value: "9:00",
        text: "9:00"
      },
      {
        value: "9:30",
        text: "9:30"
      },
      {
        value: "10:00",
        text: "10:00"
      },
      {
        value: "10:30",
        text: "10:30"
      },
      {
        value: "11:00",
        text: "11:00"
      },
      {
        value: "11:30",
        text: "11:30"
      },
      {
        value: "12:00",
        text: "12:00"
      },
      {
        value: "12:30",
        text: "12:30"
      }
    ],
    filterCourse: null,
    courses: [],
    filterPrivacy: {
      value: true,
      text: "Công khai"
    },
    privacies: [
      {
        value: true,
        text: "Công khai"
      },
      {
        value: false,
        text: "Riêng tư"
      }
    ],
    selectedItems: [],
    params: {
        elearning_id: "",
        name: "",
        enable: true,
        is_invite_all: false,
        is_allow_download: false,
        schedules: [
          {
            from_date: "",
            to_date: "",
            start_time: "1:30 AM",
            duration: 90,
            days_of_week: ""
          }
        ]
      }
  };
}

export default {
  layout: "default",
  name: "onlineclass",

  components: {
    HeaderCreate,
    IconAngleUp,
    IconPlus,
    IconAngleDown,
    IconCalendar,
    ElearningManagerSide
  },

  data() {
    return initialState();
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_PUBLIC_SEARCH, {
      stateLessons: "Lessons"
    })
  },

  watch: {
    sendMess(newValue, oldValue) {
      this.params.is_invite_all = newValue == '1';
    },
    downloadVideo(newValue, oldValue) {
      this.params.is_allow_download = newValue == '1';
    },
    params: {
      handler(newValue){
        this.fullParams =
        newValue.elearning_id != "" &&
        newValue.name != "" &&
        newValue.schedules[0].to_date != "" &&
        newValue.schedules[0].from_date != "" &&
        newValue.schedules[0].start_time != "" &&
        newValue.schedules[0].duration != "" &&
        newValue.schedules[0].days_of_week != "" ;
     },
     deep: true
      
    },
  },

  methods: {
    addTime() {
      this.timeArray.push({});
    },
    saveTime() {
      
    },
    cancelTime() {
      
    },
    changeName(e) {
      if (e.target.value.length < 61) {
        this.params.name =  e.target.value;
      } else {
        e.target.value = this.params.name;
      }
    },

    async handleOk() {
      try {
        this.confirmLoading = true;
        const doCreate = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.ADD}`,
          JSON.stringify(this.params)
        );
        if (doCreate.success) {
          this.fnCancel();
          this.message = "Tạo phòng học thành công!"
          this.showNotify = true;
        }
      } catch (e) {
        this.message = e;
        this.showNotify = true;
      } finally {
        this.confirmLoading = false;
        this.showModalConfirm = false;
      }
    },

    fnCancel() {
      let temp = [...this.courses];
      Object.assign(this.$data, initialState());
      this.courses = [...temp];
    },

    fnSave() {
      this.showModalConfirm = true;
    },
    fnSave2() {
      this.showModalConfirm = true;
    },
    
    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    async getLessons() {
      try {
        let userId = this.$store.state.auth.token
          ? this.$store.state.auth.token.id
          : "";
        await this.$store.dispatch(
          `${STORE_PUBLIC_SEARCH}/${actionTypes.ELEARNING_PUBLIC_SEARCH.DETAIL}`,
          { userId }
        );
        let lessonList = this.get(this.stateLessons, "data.content", []);
        let list = [];
        lessonList.forEach(element => {
          list.push({
            value: element.id,
            text: element.name
          });
        });
        this.courses = list;
      } catch (e) {
      } finally {
      }
    },

    handleChangedTime() {
      this.params.schedules[0].start_time = this.startTime.time.value + ' ' +this.startTime.type.value;
    },
    
    handleChangedDuration() {
      let duration = parseInt(this.duration.hours.value) * 60 + parseInt(this.duration.minutes.value);
      this.params.schedules[0].duration = parseInt(duration);
    },

    handleChangedCourse() {
      this.params.elearning_id = this.filterCourse.value;
    },
    handleChangedPrivacy() {
      this.params.enable = this.filterPrivacy.value;
    },
    check(checked, item) {
      if (checked) {
        this.pushSelectedIndexes(item);
      } else {
        this.popSelectedIndexes(item);
      }
    },
    popSelectedIndexes(item) {
      if (_.some(this.selectedItems, item)) {
        this.selectedItems = _.reject(
          this.selectedItems,
          ({ id }) => id === item.id
        );
      }
      this.params.schedules[0].days_of_week = this.arrayToString(this.selectedItems);
    },
    pushSelectedIndexes(item) {
      if (!_.some(this.selectedItems, item)) {
        this.selectedItems.push(item);
      }
      this.params.schedules[0].days_of_week = this.arrayToString(this.selectedItems);
    },

    arrayToString(data) {
      return data.reduce((result, item) => {
        const com = result ? ',' : '';
        return result = result + com + item;
      }, '')
    },

    get
  },

  created () {
    this.getLessons();
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-olclasses.scss";
strong {
  color: #222;
}
.input-limit {
  position: relative;
  input {
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    height: 4rem;
    width: 100%;
    padding: 0 5rem 0 1.5rem;
  }
  .limit {
    background: $color-primary;
    padding: 0 1rem;
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    text-align: center;
  }
}
</style>