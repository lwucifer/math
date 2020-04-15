<template>
  <div>
    <HeaderCreate @clickSave="fnSave" @clickDelete="fnDelete" />
    <div class="container">
      <div class="row">
        <div class="col-md-3 olclasses-create-side">
          <div class="olclasses-create-side-title">
            <app-checkbox :checked="true" class="mr-3" />
            <span>Thông tin phòng học</span>
          </div>
          <app-button full-width square normal>Tạo phòng học</app-button>
        </div>
        <div class="col-md-9">
          <div class="olclasses-create-main box">
            <h5 class="color-primary mb-3">Tạo phòng học online</h5>
            <hr />
            <div class="mt-4">
              <div class="form-item">
                <label>
                  <strong>Thuộc bài giảng/ khóa học</strong>
                </label>
                <app-vue-select
                  style="width: 17rem"
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
                  <strong>Tên phòng học</strong>(Tối đa 60 ký tự)
                </label>
                <app-input v-model="itemName" size="sm" />
              </div>

              <div class="form-item">
                <label>
                  <strong>Chế độ hiển thị</strong>(Hiển thị theo thuộc tính của bài giảng /khóa học liên quan)
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
                <app-radio name="sendmess" value="0" class="mr-6" v-model="sendMess">Có</app-radio>
                <app-radio name="sendmess" value="1" v-model="sendMess">Không</app-radio>
              </div>

              <div class="form-item">
                <label>
                  <strong>Cho phép học sinh tải video bài giảng của bạn</strong>
                </label>
                <app-radio name="dơwnloadvideo" value="0" class="mr-6" v-model="downloadVideo">Có</app-radio>
                <app-radio name="dơwnloadvideo" value="1" v-model="downloadVideo">Không</app-radio>
              </div>

              <div class="form-item">
                <button
                  @click="showBonus = !showBonus"
                  class="btn-toggle color-primary d-flex-center mb-15"
                >
                  <strong>Thêm lịch học</strong>
                  <IconAngleUp v-if="showBonus" class="fill-primary" />
                  <IconAngleDown v-else class="fill-primary" />
                </button>

                <div v-if="showBonus">
                  <div class="form-item-box mb-4">
                    <h6 class="mb-3">Thời khóa biểu</h6>
                    <div class="d-flex-center mb-4">
                      <label class="mr-3">Bắt đầu vào lúc</label>
                      <app-vue-select
                        style="width: 11rem"
                        class="app-vue-select form-item__selection mr-3"
                        v-model="startTime.value"
                        :options="times"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedTime"
                      ></app-vue-select>
                      <app-vue-select
                        style="width: 10rem"
                        class="app-vue-select form-item__selection"
                        v-model="startTime.type"
                        :options="timeTypes"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedTimeType"
                      ></app-vue-select>
                    </div>
                    <div class="d-flex-center">
                      <label class="mr-3">Thời lượng</label>
                      <app-vue-select
                        style="width: 9rem"
                        class="app-vue-select form-item__selection mr-2"
                        v-model="startTime.hours"
                        :options="hours"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedTime"
                      ></app-vue-select>
                      <span>Giờ</span>
                      <app-vue-select
                        style="width: 9rem"
                        class="app-vue-select form-item__selection ml-3 mr-2"
                        v-model="startTime.minutes"
                        :options="minutes"
                        label="text"
                        searchable
                        clearable
                        @input="handleChangedTimeType"
                      ></app-vue-select>
                      <span>Phút</span>
                    </div>
                  </div>

                  <div class="form-item">
                    <label>
                      <strong>Ngày học trong tuần</strong>
                    </label>
                    <div class="d-flex-center">
                      <app-checkbox
                        @change="check($event, 2)"
                        :checked="selectedItems.includes(2)"
                        label="Thứ 2"
                      ></app-checkbox>
                      <app-checkbox
                        @change="check($event, 3)"
                        :checked="selectedItems.includes(3)"
                        label="Thứ 3"
                      />
                      <app-checkbox
                        @change="check($event, 4)"
                        :checked="selectedItems.includes(4)"
                        label="Thứ 4"
                      />
                      <app-checkbox
                        @change="check($event, 5)"
                        :checked="selectedItems.includes(5)"
                        label="Thứ 5"
                      />
                      <app-checkbox
                        @change="check($event, 6)"
                        :checked="selectedItems.includes(6)"
                        label="Thứ 6"
                      />
                      <app-checkbox
                        @change="check($event, 7)"
                        :checked="selectedItems.includes(7)"
                        label="Thứ 7"
                      />
                      <app-checkbox
                        @change="check($event, 8)"
                        :checked="selectedItems.includes(8)"
                        label="Chủ nhật"
                      />
                    </div>
                  </div>

                  <div class="form-item">
                    <label>
                      <strong>Thời gian áp dụng</strong>
                    </label>
                    <div>
                      <app-date-picker
                        class="ml-3"
                        v-model="timeApply.start"
                        square
                        size="sm"
                        label="Từ"
                        placeholder="dd/mm/yyyy"
                      >
                        <template v-slot:icon-calendar>
                          <IconCalendar />
                        </template>
                      </app-date-picker>
                      <app-date-picker
                        class="ml-3"
                        v-model="timeApply.end"
                        square
                        size="sm"
                        label="Đến"
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

            <div class="text-right mt-4 mb-4">
              <app-button square size="sm" normal color="info" class="mr-3" @click="fnDelete">Hủy</app-button>
              <app-button square size="sm" normal @click="fnSave">Tạo lịch</app-button>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";

import HeaderCreate from "~/components/layout/header/HeaderCreate";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import OlclassesService from "~/services/elearning/creating/Olclasses";
import { createPayloadAddOlclass } from "~/models/elearning/Olclass";

const STORE_NAMESPACE = "elearning/creating/creating-olclasses";

export default {
  layout: "no-header",
  name: "onlineclasses",

  components: {
    HeaderCreate,
    IconAngleUp,
    IconAngleDown,
    IconCalendar
  },

  data() {
    return {
      tab: 1,
      itemName: "",
      sendMess: "0",
      downloadVideo: "0",
      showBonus: false,
      timeApply: {
        start: null,
        end: null
      },
      startTime: {
        value: "1:00",
        type: "AM"
      },
      allSelected: [],
      filter: [],
      filterCourse: null,
      filterPrivacy: null,
      schedules: {
        days_of_week: "",
        duration: 0,
        from_date: "",
        schedule_id: "",
        start_time: "",
        to_date: ""
      },
      hours: [
        {
          value: "1",
          text: "1"
        },
        {
          value: "2",
          text: "2"
        },
        {
          value: "3",
          text: "3"
        },
        {
          value: "4",
          text: "4"
        },
        {
          value: "5",
          text: "5"
        },
        {
          value: "6",
          text: "6"
        }
      ],
      minutes: [
        {
          value: "0",
          text: "00"
        },
        {
          value: "15",
          text: "15"
        },
        {
          value: "30",
          text: "30"
        },
        {
          value: "45",
          text: "45"
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
      courses: [
        {
          value: 1,
          text: "Khóa học 1"
        },
        {
          value: 2,
          text: "Khóa học 2"
        }
      ],
      privacies: [
        {
          value: 1,
          text: "Công khai"
        },
        {
          value: 2,
          text: "Chỉ mình tôi"
        }
      ],
      selectedItems: [],
      params: {
        elearning_id: "xxxxxx",
        enable: true
      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    async fnSave() {
      try {
        this.loading = true;
        let params = { ...this.params };
        const payload = createPayloadAddOlclass(this.params);
        const para = {
          dto: {
            elearning_id: "string",
            enable: true,
            id: "string",
            is_allow_download: true,
            is_invite_all: true,
            name: "string",
            schedules: [
              {
                days_of_week: "string",
                duration: 0,
                from_date: "string",
                schedule_id: "string",
                start_time: "string",
                to_date: "string"
              }
            ]
          }
        };
        console.log(payload);
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.CREATING_OLCLASSES.ADD}`,
          { para }
        );
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },
    fnDelete() {
      alert(333);
    },
    handleChangedCourse(val) {
      this.filter.course = this.filterCourse.value;
    },
    handleChangedPrivacy(val) {
      this.filter.privacy = this.filterPrivacy.value;
    },
    check(checked, item) {
      if (checked) {
        this.pushSelectedIndexes(item);
      } else {
        this.popSelectedIndexes(item);
      }
      this.$emit("check", item);
    },
    popSelectedIndexes(item) {
      if (_.some(this.selectedItems, item)) {
        this.selectedItems = _.reject(
          this.selectedItems,
          ({ id }) => id === item.id
        );
      }
    },
    pushSelectedIndexes(item) {
      if (!_.some(this.selectedItems, item)) {
        this.selectedItems.push(item);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-olclasses.scss";
</style>