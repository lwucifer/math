<template>
  <div class="manager-side--creation">
    <div class="manager-side--creation__checklist">
      <div
        class="link-gray item"
        :class="active == 'classroom' ? 'active' : ''"
        @click="selectMenu({name: 'classroom'})"
      >
        <app-checkbox
          :checked="active == 1"
        >
          Tạo phòng học online
        </app-checkbox>
      </div>

      <div
        class="link-gray item"
        :class="active == 'exercise' ? 'active' : ''"
        @click="selectMenu({name: 'exercise'})"
      >
        <app-checkbox
          :checked="active == 2"
        >
          Bài tập
          <span class="cca-sub-text text-sub">(Tùy chọn)</span>
        </app-checkbox>
      </div>

      <div
        class="link-gray item"
        :class="active == 'exam' ? 'active' : ''"
        @click="selectMenu({name: 'exam'})"
      >
        <app-checkbox
          :checked="active == 3"
        >
          Bài kiểm tra
          <span class="cca-sub-text text-sub"> (Tùy chọn)</span>
        </app-checkbox>
      </div>
    </div>

    <div class="manager-side--creation__action mt-3">
      <app-button
        square
        full-width
        normal
        size="md"
      >
        Gửi lên
      </app-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CreateSide",

    components: {},

    props: {
      active: {
        type: String,
        default: 'classroom',
        validator: value => ['classroom', 'exercise', 'exam'].includes(value)
      }
    },
    methods: {
      selectMenu({ name }) {
        this.$emit('selectMenu', name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/classroom/create/_create-aside.scss";
</style>