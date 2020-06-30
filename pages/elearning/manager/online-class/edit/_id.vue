<template>
  <div>
    <div class="container">
      <breadcrumb />
      <div class="row">
        <div class="col-md-3 sub-side">
          <sub-side>
            <template v-slot:content>
              <ElearningManagerSide active="5" />
            </template>
          </sub-side>
        </div>
        <div class="col-md-9">
          <sub-block-section :title="get(stateOnlineClassInfo, 'data.name', '')" has-icon>
            <template v-slot:content>
              <div class="olclasses-create-main">
              <div class="mt-2">
                <div class="form-item">
                  <label>
                    <strong>Thuộc bài giảng/ khóa học</strong>
                  </label>
                  <app-vue-select
                    style="width: 25rem"
                    class="app-vue-select form-item__selection"
                    :value="get(stateOnlineClassInfo, 'data.elearning', '')"
                    label="text"
                    :disabled="true"
                    has-border
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
                    :disabled="true"
                    label="text"
                    :placeholder="get(stateOnlineClassInfo, 'data.privacy', '') == 'PUBLIC' ? 'Công khai' :  'Rieeng tư'"
                    has-border
                  ></app-vue-select>
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
                          <div class="ml-auto" v-if="indexEdit === index">
                            <button v-on:click="indexEdit = null"><IconCreate height="20" width="20" class="fill-primary"/></button>
                            <button v-on:click="removeSchedule(index, true)"><IconTrashAlt height="20" width="20" class="fill-red"/></button>
                          </div>
                        </div>
                        <div class="d-flex-center">
                          <div class="d-flex-center mb-4 mr-6">
                            <label class="mr-3">Bắt đầu vào lúc</label>
                            <app-date-picker
                                class="ml-3"
                                v-model="schedules[index].start_time"
                                @input="changeSchedules"
                                square
                                size="sm"
                                valueFormat="hh:mm a"
                                placeholder="hh:mm a"
                                type="time"
                                :minuteStep="5"
                              >
                                <template v-slot:icon-calendar>
                                  <IconClock />
                                </template>
                              </app-date-picker>
                          </div>
                          <div class="d-flex-center mb-4">
                            <label class="mr-3">Thời lượng</label>
                            <app-date-picker
                                class="ml-3"
                                v-model="schedules[index].duration"
                                @input="changeSchedules"
                                square
                                size="sm"
                                :minute-step="15"
                                :hourOptions="hours"
                                valueFormat="HH:mm"
                                valueType="format"
                                type="time"
                                placeholder="HH:mm"
                              >
                                <template v-slot:icon-calendar>
                                  <IconClock />
                                </template>
                              </app-date-picker>
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
                            :checked="checkIncules(selectedItems[index],('MON'))"
                            label="Thứ 2"
                            :isChangeLabelColor="true"
                          ></app-checkbox>
                          <app-checkbox
                            @change="check($event, 'TUE', index)"
                            :checked="checkIncules(selectedItems[index],('TUE'))"
                            label="Thứ 3"
                            :isChangeLabelColor="true"
                          />
                          <app-checkbox
                            @change="check($event, 'WED', index)"
                            :checked="checkIncules(selectedItems[index],('WED'))"
                            label="Thứ 4"
                            :isChangeLabelColor="true"
                          />
                          <app-checkbox
                            @change="check($event, 'THU', index)"
                            :checked="checkIncules(selectedItems[index],('THU'))"
                            label="Thứ 5"
                            :isChangeLabelColor="true"
                          />
                          <app-checkbox
                            @change="check($event, 'FRI', index)"
                            :checked="checkIncules(selectedItems[index],('FRI'))"
                            label="Thứ 6"
                            :isChangeLabelColor="true"
                          />
                          <app-checkbox
                            @change="check($event, 'SAT', index)"
                            :checked="checkIncules(selectedItems[index],('SAT'))"
                            label="Thứ 7"
                            :isChangeLabelColor="true"
                          />
                          <app-checkbox
                            @change="check($event, 'SUN', index)"
                            :checked="checkIncules(selectedItems[index],('SUN'))"
                            label="Chủ nhật"
                            :isChangeLabelColor="true"
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
                                v-model="schedules[index].from_date"
                                square
                                size="sm"
                                placeholder="yyyy-mm-dd"
                                valueFormat="YYYY-MM-DD"
                                @input="(e) => schedulesDateChange(e, index, false)"
                                :clearDate="fromClear"
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
                                v-model="schedules[index].to_date"
                                square
                                size="sm"
                                placeholder="yyyy-mm-dd"
                                valueFormat="YYYY-MM-DD"
                                @input="(e) => schedulesDateChange(e, index, true)"
                                :clearDate="toClear"
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
                        {{getTimeHH_MM_A(schedules[index].start_time)}} - {{ getEndTime(schedules[index].start_time, schedules[index].duration) }}
                      </div>
                      <div class="mr-4">
                        {{convertDay(index)}}
                      </div>
                      <div>
                        {{getDateBirthDay(item.from_date)}} - {{getDateBirthDay(item.to_date)}}
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
                <button class="d-flex-center color-primary" @click="addTime">
                  <IconPlus class="fill-primary mr-2" />Thêm lịch học
                </button>
              </div>
            </div>

            <div class="mt-4 mb-4 text-right">
              <app-button @click="fnSave" :disabled="!fullParams" class="">
                <IconRight class="fill-white mr-3"/>Lưu phòng học
              </app-button>
            </div>
            </template>
          </sub-block-section>
        </div>
      </div>
    </div>

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      :width="550"
      @cancel="handleCancelModal"
      title="Bạn muốn tạo phòng học này?"
      description="Các thông tin phòng học không thể thay đổi sau khi được tạo."
    />
    
    <app-modal-confirm
      v-if="showModalConfirmDraf"
      :confirmLoading="confirmDrafLoading"
      @ok="handleDrafOk"
      :width="550"
      @cancel="handleDrafCancelModal"
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
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconPlus from "~/assets/svg/icons/plus2.svg?inline";
import IconCreate from '~/assets/svg/v2-icons/create_24px.svg?inline';
import IconTrashAlt from '~/assets/svg/icons/trash-alt.svg?inline';
import IconTrash from '~/assets/svg/v2-icons/trash-alt.svg?inline';
import IconClock from '~/assets/svg/icons/clock.svg?inline';
import IconRight from '~/assets/svg/v2-icons/arrow-right.svg?inline';
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";

import {
  getDateBirthDay,
  getUTCDateTime,
  getTimeHH_MM_A,
  getUTCDateTimeHH_MM_A,
  getEndTime,
  hoursToMinutes
} from "~/utils/moment";
import { get, reject } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { useEffect, getParamQuery } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";

const initialSchedule = {
  from_date: "",
  to_date: "",
  start_time: "",
  duration: "",
  days_of_week: ""
};

function initialState() {
  return {
    schedulesUpdate: 0,
    fromClear: false,
    toClear: false,
    indexEdit: null,
    indexShow: null,
    tab: 1,
    hours: Array.from({ length: 9 }).map((_, i) => i),
    message: "",
    sendMess: false,
    downloadVideo: false,
    showModalConfirmDraf: false,
    showModalConfirm: false,
    showNotify: false,
    confirmLoading: false,
    confirmDrafLoading: false,
    showBonus: false,
    schedules: [initialSchedule],
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
    selectedItems: [[]],
    params: {
      elearning_id: "",
      name: "",
      enable: true,
      privacy: true,
      is_invite_all: false,
      is_allow_download: false,
      schedules: [initialSchedule]
    }
  };
}

export default {
  name: "onlineclass",

  components: {
    IconTrash,
    IconClock,
    IconPlus,
    IconCalendar,
    IconTrashAlt,
    IconCreate,
    IconRight,
    ElearningManagerSide
  },

  middleware: ["teacher-role"],

  async fetch({ params, query, store, route }) {
    await Promise.all([
      store.dispatch(`${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.INFO}`,
        get(route.params, 'id', ''))
    ]);
  },

  data() {
    return initialState();
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateOnlineClassInfo: "OnlineClassInfo"
    }),
    fullParams() {
      return this.params.elearning_id  &&
          this.params.name  &&
          this.indexShow === null &&
          this.indexEdit === null
    },
    checkSchedule() {
      let index = this.indexEdit != null ? this.indexEdit : this.indexShow;
      let update = this.schedulesUpdate;
      let item = this.schedules[index];
      return this.schedules[index].from_date  &&
             this.schedules[index].to_date &&
             this.schedules[index].start_time  &&
             this.schedules[index].duration &&
             this.schedules[index].days_of_week;
    },
  },

  watch: {
    downloadVideo(newValue, oldValue) {
      this.params.is_allow_download = newValue;
    },
    schedulesUpdate(newValue, oldValue) {
      this.updateSchedules();
    },
    schedules: {
      handler: function (newValue, oldValue) {
        this.updateSchedules();
      },
      deep: true
    }
  },

  methods: {
    getTimeHH_MM_A,
    getDateBirthDay,
    getEndTime,
    
    changeSchedules() {
      this.schedulesUpdate++;
    },

    updateSchedules () {
      let schedules = [...this.schedules].reduce((result, item) => {
          let start_time = getUTCDateTimeHH_MM_A(new Date ('2020-01-01 ' + item.start_time));
          let duration = hoursToMinutes(item.duration);
          result.push({...item, start_time: start_time, duration: duration});
          return result;
        }, []);
      this.params = {...this.params, schedules: schedules};
    },

    schedulesDateChange(e, index, isTo) {
      this.fromClear = false;
      this.toClear = false;
      if (isTo) {
        if(this.schedules[index].from_date && this.schedules[index].from_date > e ) {
          this.fromClear = true;
          this.schedules[index] = {...this.schedules[index], from_date: null};
        } else {
          this.schedules[index] = {...this.schedules[index], to_date: e};
        }
      } else {     
        if(this.schedules[index].to_date && this.schedules[index].to_date < e ) {
          this.toClear = true;
          this.schedules[index] = {...this.schedules[index], to_date: null};
        } else {
          this.schedules[index] = {...this.schedules[index], from_date: e};
        }
      }
      this.schedulesUpdate++;
    },

    checkIncules(list, val){
      let result = list ? list.includes(val) : false;
      return result
    },

    convertDay(index) {
      const items = this.selectedItems[index];
      const sorter = {
        "mon": 1,
        "tue": 2,
        "wed": 3,
        "thu": 4,
        "fri": 5,
        "sat": 6,
        "sun": 7
      };
      let tmp = {};
      items.forEach(function(value) {
        let index = sorter[value.toLowerCase()];
        tmp[index] = value;
      });

      let i = 0;
      return Object.values(tmp).reduce((result, item) => {
        let text = '';
        if (item) i++;
        switch (item) {
          case 'MON': text = '2'; break;
          case 'TUE': text = '3'; break;
          case 'WED': text = '4'; break;
          case 'THU': text = '5'; break;
          case 'FRI': text = '6'; break;
          case 'SAT': text = '7'; break;
          case 'SUN': text = 'CN'; break;
        }
        const com = i > 1 ? ", " : "";
        return (result = result + com + text);
      }, "Hàng tuần vào thứ ");
    },

    removeSchedule(index, editting){
      this.schedules = _.reject([...this.schedules], (i, inx) => inx === index);
      this.selectedItems = _.reject([...this.selectedItems], (i, inx) => inx === index);
      if (this.schedules.length === 0 ) {
        this.schedules.push(initialSchedule);
        this.selectedItems.push([]);
        this.indexShow = 0;
      } else {
        if(this.indexShow != null && this.indexShow > index) this.indexShow = this.indexShow - 1;
        if(this.indexEdit != null && this.indexEdit > index) this.indexEdit = this.indexEdit - 1;
        if(editting) this.indexEdit = null;
      }
    },
    editSchedule: function (index){
      if (this.indexShow != null) {
        this.schedules.pop();
        this.selectedItems.pop();
      }
      this.indexEdit = index;
      this.indexShow = null;
    },

    addTime() {
      this.indexEdit = null;
      this.indexShow = this.schedules.length;
      this.schedules.push(initialSchedule);
      this.selectedItems.push([]);
    },

    cancelTime(index) {
      if (this.schedules.length === index + 1 && this.indexEdit == null && index > 0 ) {
        this.schedules.pop();
        this.selectedItems.pop();
        this.indexShow = null;
      } else if (this.schedules.length > 1){
        this.indexShow = null;
        this.indexEdit = null;
      } else {
        //this.schedules[0] = initialSchedule;
      }
    },
    saveTime(index) {
      if (this.checkSchedule) {
        this.indexEdit = null;
        this.indexShow = null;
      }
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
          JSON.stringify({...this.params, enable: true})
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

    async handleDrafOk() {
      try {
        this.confirmDrafLoading = true;
        const doCreate = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.ADD}`,
          JSON.stringify({...this.params, enable: false})
        );
        if (doCreate.success) {
          this.fnCancel();
          this.message = "Lưu bản nháp phòng học thành công!";
          this.showNotify = true;
        } else if (doCreate.message) {
          this.message = doCreate.message;
          this.showNotify = true;
        }
      } catch (e) {
        this.message = e;
        this.showNotify = true;
      } finally {
        this.confirmDrafLoading = false;
        this.showModalConfirmDraf = false;
      }
    },

    fnCancel() {
      Object.assign(this.$data, initialState());
    },

    fnSave() {
      if (this.fullParams) {
        this.showModalConfirm = true;
      }
    },
    fnSaveDraf() {
      this.showModalConfirmDraf = true;
    },

    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },
    
    handleDrafCancelModal() {
      this.showModalConfirmDraf = false;
      this.confirmDrafLoading = false;
    },

    handleChangedPrivacy() {
      this.params.privacy = this.filterPrivacy.value;
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
        let temp = [...this.selectedItems[index]].filter(i => {
          return i !== item
        });
        this.selectedItems.splice(index, 1, temp);
        this.schedules.splice(index, 1, {
          ...this.schedules[index],
          days_of_week: this.arrayToString(this.selectedItems[index])
        });
      }
    },
    pushSelectedIndexes(item, index) {
      if (!_.some(this.selectedItems[index], item)) {
        this.selectedItems[index].push(item);
        this.schedules.splice(index, 1, {
          ...this.schedules[index],
          days_of_week: this.arrayToString(this.selectedItems[index])
        });
      }
    },

    get
  },

  created() {
    const that = this;
    this.params = this.get(this.stateOnlineClassInfo, 'data', {});
    this.schedules = this.get(this.stateOnlineClassInfo, 'data.schedules', []);
    let schedules = this.get(this.stateOnlineClassInfo, 'data.schedules', []);
    schedules.forEach(function(item, index) {
      that.selectedItems[index] = (item.days_of_week).split(',');
      that.schedules[index] = {...that.schedules, start_time: '10:00 AM'}
      //that.schedules[index] = {...that.schedules, duration: '2:30'}
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-olclasses.scss"
</style>