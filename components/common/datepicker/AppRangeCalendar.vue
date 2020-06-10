<template>
  <div
    class="app-range-calendar"
    :class="classes"
    @click="handleClickSelected"
    v-click-outside="hideOptions"
  >
    <input
      class="app-range-calendar__placeholder"
      :placeholder="placeholder"
      v-model="inputVal"
    >
    <i class="app-range-calendar__icon-select"><IconCalendar class="icon"/></i>
    <div class="d-flex app-range-calendar__options" v-if="active">
      <div
        v-if="shortcuts"
        class="app-range-calendar__shortcuts"
      >
        <button
          class="app-range-calendar__shortcut-item"
          :class="{ 'app-range-calendar__shortcut-item--active': shortcutActive == index }"
          v-for="(item, index) in shortcuts"
          :key="index"
          @click="selectShortcut({item, index})"
        >
          {{ item.text }}
        </button>
      </div>
      <div class="app-range-calendar__calendar" v-if="showRangeSelection">
        <app-range-picker-panel
          v-model="localValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import IconCalendar from "~/assets/svg/v2-icons/calendar_today_24px.svg?inline"
  import { get } from "lodash"
  import moment from "moment";

  export default {
    name: "AppCalendarRange",
    model: {
      prop: "value",
      event: "change",
    },
    props: {
      shortcuts: {
        type: Array,
        default: () => {
          return [
            {
              text: 'Hôm nay',
              onClick() {
                const start = moment();
                const end = moment();
                return [start, end]
              },
            },
            {
              text: 'Hôm qua',
              onClick() {
                const end = moment().subtract(1, 'day');
                const start = moment().subtract(1, 'day');
                return [start, end]
              },
            },
            {
              text: 'Tuần này',
              onClick() {
                const end = moment().endOf("week");
                const start = moment().startOf("week");
                return [start, end];
              },
            },
            {
              text: 'Tháng này',
              onClick() {
                const end = moment().endOf('month');
                const start = moment().startOf('month');
                return [start, end];
              },
            },
            {
              text: 'Tháng trước',
              onClick() {
                const end = moment().subtract(1, 'months').endOf('month');
                const start = moment().subtract(1, 'months').startOf('month');
                return [start, end];
              },
            },
            {
              text: 'Tùy chọn',
              showPanelDate: true
            }
          ]
        }
      },
      placeholder: {
        type: String
      },
      size: {
        type: String,
        default: 'sm'
      },
      rangeSeparator: {
        type: String,
        default: '-'
      },
      valueType: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      bordered: Boolean,
      value: {
        type: Array,
        default: () => []
      }
    },
    components: {
      IconCalendar
    },
    data() {
      return {
        active: false,
        showRangeSelection: false,
        shortcutActive: null,
        localValue: this.value
      }
    },
    watch: {
      localValue(newValue) {
        this.$emit('change', newValue)
      }
    },
    computed: {
      inputVal: function() {
        if (!this.localValue || this.localValue.length <= 0) {
          return null
        } else {
          return `${this.localValue[0]} ${this.rangeSeparator} ${this.localValue[1]}`
        }
      },
      classes() {
        return {
          active: this.active,
          "app-range-calendar--size-sm": this.size === "sm",
          "app-range-calendar--bordered": this.bordered,
        };
      },
      showDropdown() {
        return this.active
      }
    },
    methods: {
      handleClickSelected() {
        this.active = true
      },
      selectShortcut({item, index}) {
        this.shortcutActive = index
        console.log('select shortcut: ', item)
        if (get(item, 'showPanelDate', false)) {
          this.showRangeSelection = true
        } else {
          console.log('else ')
          this.showRangeSelection = false
          this.active = false
          console.log('after else: ', this.active)
          const rangeDate = item.onClick()
          this.localValue = rangeDate
          console.log('after clicK ', this.active)
        }

      },
      hideOptions() {
        this.active = false
      },
      get
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-range-calendar.scss";
</style>
