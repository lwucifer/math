<template>
  <div>
    <div class="container">
      <breadcrumb />

      <div class="row">
        <div class="col-md-3">
          <ElearningManagerSide active="5" />
        </div>
        <div class="col-md-9">
          <h5 class="page-title">Tạo phòng học online</h5>
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
                  placeholder="Chọn bài giảng/khóa học"
                  searchable
                  clearable
                  @input="handleChangedCourse"
                ></app-vue-select>
              </div>

              <div class="form-item">
                <label>
                  <strong>Tên phòng học</strong> (Tối đa 150 ký tự)
                </label>
                <div class="input-limit">
                  <input type="text" :value="params.name" @input="changeName" />
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

              <div class="form-item">
                <p>
                  <strong>Lịch học</strong> (Việc tạo lịch học là bắt buộc)
                </p>

                <div
                  class="box22 border mt-3"
                  v-for="(item, index) in params.schedules"
                  :key="index"
                >
                  <div v-if="indexEdit === index || indexShow === index">
                    <div class>
                      <div class="d-flex-center">
                        <h6 class="mb-3">Giờ học</h6>
                        <!-- <div class="ml-auto" v-if="indexEdit === index">
                          <button v-on:click="indexEdit = null"><IconCreate height="20" width="20" class="fill-primary"/></button>
                          <button v-on:click="removeSchedule(index)"><IconTrashAlt height="20" width="20" class="fill-red"/></button>
                         </div> -->
                      </div>
                      <div class="d-flex-center">
                        <div class="d-flex-center mb-4 mr-6">
                          <label class="mr-3">Bắt đầu vào lúc</label>
                          <app-vue-select
                            style="width: 10rem"
                            class="app-vue-select form-item__selection mr-3"
                            :value="startTime[index].time.value"
                            :options="times"
                            label="text"
                            searchable
                            clearable
                            @input="(e)=>handleChangedTime(e,index)"
                          ></app-vue-select>
                          <app-vue-select
                            style="width: 9rem"
                            class="app-vue-select form-item__selection"
                            :value="startTime[index].type.value"
                            :options="timeTypes"
                            label="text"
                            searchable
                            clearable
                            @input="(e)=>handleChangedTime(e,index, true)"
                          ></app-vue-select>
                        </div>
                        <div class="d-flex-center mb-4">
                          <label class="mr-3">Thời lượng</label>
                          <app-vue-select
                            style="width: 9rem"
                            class="app-vue-select form-item__selection mr-2"
                            :value="duration[index].hours.value"
                            :options="hours"
                            label="text"
                            searchable
                            clearable
                            @input="(e)=>handleChangedDuration(e, index)"
                          ></app-vue-select>
                          <app-vue-select
                            style="width: 10rem"
                            class="app-vue-select form-item__selection ml-3 mr-2"
                            :value="duration[index].minutes.value"
                            :options="minutes"
                            label="text"
                            searchable
                            clearable
                            @input="(e) => handleChangedDuration(e, index, true)"
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
                          @change="check($event, 'MON', index)"
                          :checked="selectedItems[index].includes('MON')"
                          label="Thứ 2"
                        ></app-checkbox>
                        <app-checkbox
                          @change="check($event, 'TUE', index)"
                          :checked="selectedItems[index].includes('TUE')"
                          label="Thứ 3"
                        />
                        <app-checkbox
                          @change="check($event, 'WED', index)"
                          :checked="selectedItems[index].includes('WED')"
                          label="Thứ 4"
                        />
                        <app-checkbox
                          @change="check($event, 'THU', index)"
                          :checked="selectedItems[index].includes('THU')"
                          label="Thứ 5"
                        />
                        <app-checkbox
                          @change="check($event, 'FRI', index)"
                          :checked="selectedItems[index].includes('FRI')"
                          label="Thứ 6"
                        />
                        <app-checkbox
                          @change="check($event, 'SAT', index)"
                          :checked="selectedItems[index].includes('SAT')"
                          label="Thứ 7"
                        />
                        <app-checkbox
                          @change="check($event, 'SUN', index)"
                          :checked="selectedItems[index].includes('SUN')"
                          label="Chủ nhật"
                        />
                      </div>
                    </div>

                    <div class="form-item mb-0">
                      <label>
                        <strong>Thời gian áp dụng</strong>
                      </label>
                      <div>
                        <div class="d-flex-center mt-15">
                          <div class="d-flex-center mr-4">
                            <label>Từ</label>
                            <app-date-picker
                              class="ml-3"
                              v-model="params.schedules[index].from_date"
                              square
                              size="sm"
                              placeholder="yyyy-mm-dd"
                              valueFormat="YYYY-MM-DD"
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
                              v-model="params.schedules[index].to_date"
                              square
                              size="sm"
                              placeholder="yyyy-mm-dd"
                              valueFormat="YYYY-MM-DD"
                            >
                              <template v-slot:icon-calendar>
                                <IconCalendar />
                              </template>
                            </app-date-picker>
                          </div>
                        </div>

                        <div class="mt-5">
                          <app-button
                            color="white"
                            class="mr-4 color-red border"
                            @click="cancelTime(index)"
                          >Hủy</app-button>
                          <app-button @click="saveTime(index)" :disabled="!checkSchedule">
                            <span v-if="index == indexEdit">Cập nhật</span>
                            <span v-else>Thêm lịch học</span>
                          </app-button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else class="d-flex-center">
                    <div class="mr-4">
                      {{item.start_time}} - {{getEndTime(index)}}
                    </div>
                    <div class="mr-4">
                      {{convertDay(index)}}
                    </div>
                    <div>
                      {{convertDate(item.from_date)}} - {{convertDate(item.to_date)}}
                    </div>
                    <div class="ml-auto">
                      <button v-on:click="editSchedule(index)"><IconCreate height="20" width="20" class="fill-primary"/></button>
                      <button v-on:click="removeSchedule(index)"><IconTrashAlt height="20" width="20" class="fill-red"/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 mb-4" v-if="indexEdit === null && indexShow === null">
              <button class="d-flex-center color-primary bold" @click="addTime">
                <IconPlus class="fill-primary mr-2" />Thêm lịch học
              </button>
            </div>
          </div>

          <div class="mt-4 mb-4 text-right">
            <app-button color="info" class="mr-3" @click="fnCancel">Thiết lập lại</app-button>
            <app-button color="info" class="mr-3" @click="fnSave" :disabled="!fullParams">Lưu nháp</app-button>
            <app-button @click="fnSave" :disabled="!fullParams">Tạo phòng học</app-button>
          </div>
        </div>
      </div>
    </div>

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      :width="550"
      @cancel="handleCancelModal"
      :footer="false"
      :header="false"
      title="Bạn muốn tạo phòng học này?"
      description="Các thông tin phòng học không thể thay đổi sau khi được tạo."
    />
    
    <app-modal-confirm
      v-if="showModalConfirmDraf"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      :width="550"
      @cancel="handleCancelModal"
      :footer="false"
      :header="false"
      title="Bạn muốn lưu bản nháp tạo phòng học này?"
      description="Các thông tin phòng học sẽ được lưu thánh một bản nháp."
    />

    <app-modal-notify
      :width="550"
      @ok="showNotify = false"
      @close="showNotify = false"
      v-if="showNotify"
      :footer="false"
      :header="false"
      title=""
      :description="message"
    >
    </app-modal-notify>
  </div>
</template>

<script>
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconPlus from "~/assets/svg/icons/plus2.svg?inline";
import IconCreate from '~/assets/svg/v2-icons/create_24px.svg?inline';
import IconTrashAlt from '~/assets/svg/icons/trash-alt.svg?inline';

import HeaderCreate from "~/components/layout/header/HeaderCreate";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";

import { get, reject } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { useEffect, getParamQuery } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

const initialSchedule = {
  from_date: "",
  to_date: "",
  start_time: "1:30 AM",
  duration: 90,
  days_of_week: ""
};
const initialDuration = {
  hours: {
    value: "1",
    text: "1 giờ"
  },
  minutes: {
    value: "30",
    text: "30 phút"
  }
};
const initialStartTime = {
  time: {
    value: "1:00",
    text: "1:00"
  },
  type: {
    value: "AM",
    text: "AM"
  }
};
function initialState() {
  return {
    indexEdit: null,
    indexShow: 0,
    tab: 1,
    message: "",
    sendMess: "0",
    downloadVideo: "0",
    showModalConfirmDraf: false,
    showModalConfirm: false,
    showNotify: false,
    confirmLoading: false,
    showBonus: false,
    startTime: [initialStartTime],
    duration: [initialDuration],
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
      }
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
    selectedItems: {0:[]},
    schedules: [],
    params: {
      elearning_id: "",
      name: "",
      enable: true,
      is_invite_all: false,
      is_allow_download: false,
      schedules: [initialSchedule]
    }
  };
}

export default {
  name: "onlineclass",

  components: {
    HeaderCreate,
    IconAngleUp,
    IconPlus,
    IconAngleDown,
    IconCalendar,
    IconTrashAlt,
    IconCreate,
    ElearningManagerSide
  },

  middleware: ["teacher-role"],

  data() {
    return initialState();
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_PUBLIC_SEARCH, {
      stateLessons: "Lessons"
    }),
    fullParams() {
      return this.params.elearning_id  &&
          this.params.name  &&
          this.indexShow === null &&
          this.indexEdit === null
    },
    checkSchedule() {
      let index = this.indexEdit != null ? this.indexEdit : this.indexShow;
      const item = this.params.schedules[index];
      return this.params.schedules[index].from_date  &&
             this.params.schedules[index].to_date &&
             this.params.schedules[index].start_time  &&
             this.params.schedules[index].duration != 0 &&
             this.params.schedules[index].days_of_week;
    },
  },

  watch: {
    sendMess(newValue, oldValue) {
      this.params.is_invite_all = newValue == "1";
    },
    downloadVideo(newValue, oldValue) {
      this.params.is_allow_download = newValue == "1";
    }
  },

  methods: {
    convertDate(time) {
      const date = new Date(time);
      var strTime =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return strTime;
    },

    convertDay(index) {
      const items = this.selectedItems[index];
      return items.reduce((result, item, index) => {
        let text = '';
        switch (item) {
          case 'MON': text = '2'; break;
          case 'TUE': text = '3'; break;
          case 'WED': text = '4'; break;
          case 'THU': text = '5'; break;
          case 'FRI': text = '6'; break;
          case 'SAT': text = '7'; break;
          case 'SUN': text = 'CN'; break;
        }
        const com = index > 0 ? ", " : "";
        return (result = result + com + text);
      }, "Hàng tuần vào thứ ");
    },
    getEndTime(index) {
      const date = new Date(
        "2000-01-01 " + this.params.schedules[index].start_time
      );
      const endDate = new Date(date.getTime() + this.params.schedules[index].duration*60000);
      var hours = endDate.getHours();
      var minutes = endDate.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    removeSchedule(index){
      this.params.schedules = _.reject([...this.params.schedules], (i, inx) => inx === index);
      if (this.params.schedules.length === 0 ) {
        this.params.schedules.push(initialSchedule);
        this.indexShow = 0;
      }
    },
    editSchedule: function (index){
      this.indexEdit = index;
      this.indexShow = null;
    },

    addTime() {
      this.indexEdit = null;
      this.indexShow = this.params.schedules.length;
      this.params.schedules.push(initialSchedule);
      this.selectedItems = {...this.selectedItems, [this.indexShow]: []};
      this.duration.push(initialDuration);
      this.startTime.push(initialStartTime);
    },

    cancelTime(index) {
      if (this.params.schedules.length === index + 1 && this.indexEdit == null && index > 0 ) {
        this.params.schedules.pop();
        this.indexShow = null;
      } else if (this.params.schedules.length > 1){
        this.indexShow = null;
        this.indexEdit = null;
      } else {
        //this.params.schedules[0] = initialSchedule;
      }
    },
    saveTime(index) {
      this.indexEdit = null;
      this.indexShow = null;
      this.schedules = [...this.params.schedules];
    },

    changeName(e) {
      if (e.target.value.length < 151) {
        this.params.name = e.target.value;
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
          this.message = "Tạo phòng học thành công!";
          this.showNotify = true;
        } else if (doCreate.message) {
          this.message = doCreate.message;
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
        console.log(this.get(this.stateLessons, "data.content", []));
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

    handleChangedTime(e, index, type = false) {
      let post = {
        value: e.value,
        text: e.value
      };

      if (type) {
        this.startTime.splice(index, 1, { ...this.startTime[index],
          type: post
        })
      } else {
        this.startTime.splice(index, 1, { ...this.startTime[index],
          time: post
        })
      }

      this.params.schedules.splice(index, 1, {
        ...this.params.schedules[index],
        start_time:
          this.startTime[index].time.value +
          " " +
          this.startTime[index].type.value
      })
    },

    handleChangedDuration(e, index, minutes = false) {
      let post = {
        value: e.value,
        text: e.value
      };

      if (minutes) {
        this.duration.splice(index, 1, { ...this.duration[index],
          minutes: post
        })
      } else {
        this.duration.splice(index, 1, { ...this.duration[index],
          hours: post
        })
      }
      let duration =
        parseInt(this.duration[index].hours.value) * 60 +
        parseInt(this.duration[index].minutes.value);
      
      this.params.schedules.splice(index, 1, {
        ...this.params.schedules[index],
        duration: parseInt(duration)
      });
    },

    handleChangedCourse() {
      this.params.elearning_id = this.filterCourse.value;
    },
    handleChangedPrivacy() {
      this.params.enable = this.filterPrivacy.value;
    },
    check(checked, item, index) {
      if (checked) {
        this.pushSelectedIndexes(item, index);
      } else {
        this.popSelectedIndexes(item, index);
      }
    },
    popSelectedIndexes(item, index) {
      if (this.selectedItems[index].includes(item)) {
        let xxx = [...this.selectedItems[index]].filter(i => {
          return i !== item
        });
        this.selectedItems = {...this.selectedItems, [index] : xxx};

        this.params.schedules.splice(index, 1, {
          ...this.params.schedules[index],
          days_of_week: this.arrayToString(this.selectedItems[index])
        });
        console.log(this.selectedItems[index], xxx)
      }
    },
    pushSelectedIndexes(item, index) {
      if (!_.some(this.selectedItems[index], item)) {
        this.selectedItems[index].push(item);
        this.params.schedules.splice(index, 1, {
          ...this.params.schedules[index],
          days_of_week: this.arrayToString(this.selectedItems[index])
        });
      }
      //console.log(this.selectedItems[index])
    },

    arrayToString(data) {
      return data.reduce((result, item) => {
        const com = result ? "," : "";
        return (result = result + com + item);
      }, "");
    },

    get
  },

  created() {
    this.getLessons();
  }
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
    border: 1px solid #e0e0e0;
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