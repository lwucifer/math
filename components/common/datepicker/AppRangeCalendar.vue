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
    <div class="d-flex app-range-calendar__options" v-if="showDropdown">
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
        type: Array
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
        console.log('change value: ', (newValue[0]).format('DD-MM-YYYY'))
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
        console.log("handleClickSelected");
        this.active = true
      },
      selectShortcut({item, index}) {
        this.shortcutActive = index
        if (get(item, 'showPanelDate', false)) {
          this.showRangeSelection = true
        } else {
          const rangeDate = item.onClick()
          this.localValue = rangeDate
          this.showRangeSelection = false
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
