<template>
  <sub-block-section
    title="Góc học tập"
  >
    <template v-slot:content>
      <div class="manager-side">
        <n-link class="link-gray item pt-2" 
            to="" :class="active == 1 ? 'active' : ''">
          <IconDashboard width="20" height="20" />Tổng quan
        </n-link>
        <n-link
          class="link-gray item"
          to=""
          :class="active == 2 ? 'active' : ''"
        >
          <IconBooks width="20" height="20" />Bài giảng và khóa học
        </n-link>

        <n-link
          class="link-gray item"
          to=""
          :class="active == 3 ? 'active' : ''"
        >
          <IconLibraryBooks width="20" height="20" />Bài tập và bài kiểm tra
        </n-link>

        <n-link
          class="link-gray item"
          to=""
          :class="active == 4 ? 'active' : ''"
        >
          <IconToday24px />Thời khóa biểu
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
import IconToday24px from '~/assets/svg/v2-icons/today_24px.svg?inline';

import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconChatUser from "~/assets/svg/icons/chat-user.svg?inline";


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
    IconChatUser,
    IconToday24px
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