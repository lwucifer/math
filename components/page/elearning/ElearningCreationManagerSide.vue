<template>
  <div class="manager-side--creation">

    <n-link
      class="link-gray item"
      :class="active == 1 ? 'active' : ''"
      :to="'/elearning/manager/classroom/create'"
    >
      <app-checkbox
        :checked="active == 1"
      >
        Tạo phòng học online
      </app-checkbox>
    </n-link>

    <n-link
      class="link-gray item"
      :class="active == 2 ? 'active' : ''"
      :to="'/elearning/manager/classroom/exercise/create'"
    >
      <app-checkbox
        :checked="active == 2"
      >
        Bài tập
        <span class="cca-sub-text text-sub">(Tùy chọn)</span>
      </app-checkbox>
    </n-link>

    <n-link
      class="link-gray item"
      :class="active == 3 ? 'active' : ''"
      :to="'/elearning/manager/classroom/exam/create'"
    >
      <app-checkbox
        :checked="active == 3"
      >
        Bài kiểm tra
        <span class="cca-sub-text text-sub"> (Tùy chọn)</span>
      </app-checkbox>
    </n-link>
    <app-button
      square
      full-width
      normal
      size="md"
      class="mt-3"
    >
      Gửi lên
    </app-button>
  </div>
</template>

<script>
  export default {
    name: "ElearningCreationManagerSide",

    components: {},

    props: {
      active: {
        type: [String, Number]
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/elearning/_elearning-creation-manager-side.scss";
</style>