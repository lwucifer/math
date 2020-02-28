<template>
  <div class="manager-side">
    <n-link class="link-gray item" :to="'/school/manager/'" :class="active == 1 ? 'active' : ''">
      <IconDashboard width="20" height="20" />Tổng quan
    </n-link>
    <n-link class="link-gray item" to :class="active == 2 ? 'active' : ''">
      <IconBook width="20" height="20" />Bài giảng và khóa học
    </n-link>
    <n-link
      class="link-gray item"
      :to="'/school/manager/test/'"
      :class="active == 3 ? 'active' : ''"
    >
      <IconCalendar />Quản lý tổ chuyên môn
    </n-link>
    <div class="item" :class="active == 42 || active == 41? 'active' : ''">
      <div>
        <IconBooks />Quản lý giáo viên
        <button @click="tab = 1">
          <IconAngleDown />
          <IconAngleUp />
        </button>
      </div>
      <ul v-if="tab == 1">
        <li>
          <n-link
            class="link-gray"
            :to="'/school/manager/teacher/'"
            :class="active == 4 ? 'active' : ''"
          >Hồ sơ giáo viên</n-link>
        </li>
        <li>
          <n-link
            class="link-gray"
            :to="'/school/manager/teacher/'"
            :class="active == 4 ? 'active' : ''"
          >Phân công giảng dạy</n-link>
        </li>
      </ul>
    </div>
    <n-link class="link-gray item" to :class="active == 5 ? 'active' : ''">
      <IconFolderCheck />Quản lý lớp học
    </n-link>
    <n-link
      class="link-gray item"
      :to="'/school/manager/interactive'"
      :class="active == 6 ? 'active' : ''"
    >
      <IconChatUser />Quản lý học sinh
    </n-link>
  </div>
</template>

<script>
import IconFolderCheck from "~/assets/svg/design-icons/folder-check.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconDashboard from "~/assets/svg/design-icons/dashboard.svg?inline";
import IconDollarO from "~/assets/svg/icons/dollar-o.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconChatUser from "~/assets/svg/icons/chat-user.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";

export default {
  components: {
    IconFolderCheck,
    IconCalendar,
    IconDashboard,
    IconDollarO,
    IconBooks,
    IconBook,
    IconChatUser,
    IconAngleDown,
    IconAngleUp
  },

  props: {
    active: {
      type: [String, Number]
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_manager-side.scss";
</style>