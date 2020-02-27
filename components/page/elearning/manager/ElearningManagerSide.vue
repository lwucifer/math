<template>
  <div class="elearning-history-side">
    <n-link class="link-gray item" :to="'/elearning/manager/'" :class="active == 1 ? 'active' : ''">
      <IconDashboard width="20" height="20" />Tổng quan
    </n-link>
    <n-link class="link-gray item" to :class="active == 2 ? 'active' : ''">
      <IconBook width="20" height="20" />Bài giảng và khóa học
    </n-link>
    <n-link class="link-gray item" :to="'/elearning/manager/test/'" :class="active == 3 ? 'active' : ''">
      <IconCalendar />Bài tập và bài kiểm tra
    </n-link>
    <n-link class="link-gray item" :to="'/elearning/manager/materials/'" :class="active == 4 ? 'active' : ''">
      <IconBooks />Kho học liệu
    </n-link>
    <n-link class="link-gray item" to :class="active == 5 ? 'active' : ''">
      <IconFolderCheck />Phòng học online
    </n-link>
    <n-link class="link-gray item" :to ="'/elearning/manager/interactive'" :class="active == 6 ? 'active' : ''">
      <IconChatUser />Tương tác với học sinh
    </n-link>
    <n-link class="link-gray item" :to="'/elearning/manager/revenue'" :class="active == 7 ? 'active' : ''">
      <IconDollarO />Thống kê doanh thu
    </n-link>
    <n-link class="link-gray item" :to="'/elearning/manager/ratecomment'" :class="active == 8 ? 'active' : ''">
      <IconStar />Đánh giá và bình luận
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
import IconStar from "~/assets/svg/design-icons/star-alt.svg?inline";

export default {
  name: "E-learning",

  components: {
    IconFolderCheck,
    IconCalendar,
    IconDashboard,
    IconDollarO,
    IconBooks,
    IconBook,
    IconChatUser,
    IconStar
  },

  props: {
    active: {
      type: [String, Number]
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-side.scss";
</style>