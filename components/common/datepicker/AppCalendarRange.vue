<template>
  <div
    class="app-calendar-range"
    :class="classes"
    @click="handleClickSelected"
  >
    <input
      class="app-calendar-range__placeholder"
      tabindex="0"
      :placeholder="placeholder"
    >
    <i class="app-calendar-range__icon-select"><IconCalendar class="icon"/></i>
    <div class="d-flex">
      <div
        v-if="shortcuts"
        class="app-calendar-range__shortcuts"
      >
        <button
          class="app-calendar-range__shortcut-item"
          v-for="(item, index) in shortcuts"
          :key="index"
        >
          {{ item.text }}
        </button>
      </div>
      <div class="app-calendar-range__calendar">
        <app-calendar format="DD-MM-YYYY" />
        <app-calendar format="DD-MM-YYYY" />
      </div>
    </div>
  </div>
</template>

<script>
  import IconCalendar from "~/assets/svg/v2-icons/calendar_today_24px.svg?inline"

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
      bordered: Boolean
    },
    components: {
      IconCalendar
    },
    data() {
      return {
        active: false,
        from: null,
        to: null
      }
    },
    computed: {
      inputVal: function() {
        return this.placeholder
      },
      classes() {
        return {
          active: this.active,
          "app-calendar-range--size-sm": this.size === "sm",
          "app-calendar-range--bordered": this.bordered,
        };
      },
    },
    methods: {
      handleClickSelected() {
        console.log("handleClickSelected");
        this.active = !this.active;
      },
    }
  }
</script>

<style lang="scss">
  .app-calendar-range {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
    position: relative;
    &:hover {
      cursor: pointer;
    }

    &.active {
      .app-calendar-range__placeholder {
        border: 1px solid $color-primary;
      }
    }
  }

  .app-calendar-range--size-sm {
    .app-calendar-range__placeholder {
      height: 3.2rem;
    }
  }

  .app-calendar-range__placeholder {
    color: $color-text-gray-2;
    line-height: 2rem;
    background-color: #fff;
    font-size: 1.4rem;
    white-space: nowrap;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    border-radius: 2px;
    width: 100%;
    border: none;
  }

  .app-calendar-range__dropdown {
    position: absolute;
    display: flex;
  }
  .app-calendar-range__shortcuts {
    display: block;
    background: #fff;
    padding: 0.6rem;
    width: 100%;
    min-height: 30rem;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  .app-calendar-range__shortcut-item {
    display: block;
    height: 3.6rem;
    background: $color-text-light-2;
    width: 100%;
    text-align: left;
    padding: 0.6rem 1.1rem;
    margin-bottom: 0.8rem;
    border-radius: 2px;
    &:hover {
      color: $color-primary;
    }
  }
  .app-calendar-range__calendar {
    display: flex;
    position: absolute;
    transform: translateX(100%);
    right: -1rem;
    justify-content: space-between;
    background: #fff;
    border-radius: 2px;
    .app-calendar {
      width: 27.4rem;
      height: 30rem;
      padding: 0.6rem 1.2rem;
    }
  }
  .app-calendar-range__icon-select {
    position: absolute;
    right: 1rem;
    top: 0.9rem;
    svg path {
      fill: $color-primary;
      fill-opacity: 1;
    }
  }
</style>
