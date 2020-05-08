<template>
  <sub-block-section
    title="Quản lý E-learning"
  >
    <template v-slot:content>
      <div class="manager-side">
        <n-link class="link-gray item pt-2" :to="'/elearning/manager/'" :class="active == 1 ? 'active' : ''">
          <IconDashboard width="20" height="20" />Tổng quan
        </n-link>
        <n-link
          class="link-gray item"
          :to="'/elearning/manager/courses/'"
          :class="active == 2 ? 'active' : ''"
        >
          <IconBooks width="20" height="20" />Bài giảng và khóa học
        </n-link>
        <n-link
          class="link-gray item"
          :to="'/elearning/manager/exams'"
          :class="active == 3 ? 'active' : ''"
        >
          <IconLibraryBooks width="20" height="20" />Bài tập và bài kiểm tra
        </n-link>
        <n-link
          class="link-gray item"
          :to="'/elearning/manager/warehouses'"
          :class="active == 4 ? 'active' : ''"
        >
          <IconVideoLibrary />Kho học liệu
        </n-link>
        <n-link
          class="link-gray item"
          :to="'/elearning/manager/online-class'"
          :class="active == 5 ? 'active' : ''"
        >
          <IconLaptop />Phòng học online
        </n-link>
        <n-link
          class="link-gray item"
          :to="'/elearning/manager/interacts'"
          :class="active == 6 ? 'active' : ''"
        >
          <IconUserCircle />Tương tác với học sinh
        </n-link>
        <n-link
          class="link-gray item"
          :to="'/elearning/manager/rates'"
          :class="active == 8 ? 'active' : ''"
        >
          <IconStar />Đánh giá và bình luận
        </n-link>
      </div>
    </template>
  </sub-block-section>
</template>

<script>
import IconFolderCheck from "~/assets/svg/design-icons/folder-check.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconDashboard from "~/assets/svg/v2-icons/dashboard_24px.svg?inline";
import IconDollarO from "~/assets/svg/icons/dollar-o.svg?inline";
import IconBooks from "~/assets/svg/v2-icons/collections_bookmark_24px.svg?inline";
import IconLibraryBooks from "~/assets/svg/v2-icons/library_books_24px.svg?inline";
import IconVideoLibrary from "~/assets/svg/v2-icons/video_library_24px.svg?inline";
import IconLaptop from "~/assets/svg/v2-icons/laptop_chromebook_24px.svg?inline";
import IconUserCircle from "~/assets/svg/v2-icons/supervised_user_circle_24px.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconChatUser from "~/assets/svg/icons/chat-user.svg?inline";
import IconStar from "~/assets/svg/v2-icons/star_24px.svg?inline";

export default {
  name: "E-learning",

  components: {
    IconFolderCheck,
    IconCalendar,
    IconDashboard,
    IconDollarO,
    IconBooks,
    IconBook,
    IconLibraryBooks,
    IconVideoLibrary,
    IconLaptop,
    IconChatUser,
    IconUserCircle,
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
@import "~/assets/scss/components/elearning/manager/_manager-side.scss";
</style>