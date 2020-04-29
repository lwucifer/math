<template>
  <div class="manager-side">
    <n-link
      v-if="checkMenuGuard(1)"
      class="link-gray item"
      :to="'/elearning/manager/'"
      :class="active == 1 ? 'active' : ''"
    >
      <IconDashboard width="20" height="20" />Tổng quan
    </n-link>
    <n-link
      v-if="checkMenuGuard(2)"
      class="link-gray item"
      :to="'/elearning/manager/courses/'"
      :class="active == 2 ? 'active' : ''"
    >
      <IconBook width="20" height="20" />Bài giảng và khóa học
    </n-link>
    <n-link
      v-if="checkMenuGuard(3)"
      class="link-gray item"
      :to="'/elearning/manager/exams'"
      :class="active == 3 ? 'active' : ''"
    >
      <IconCalendar />Bài tập và bài kiểm tra
    </n-link>
    <n-link
      v-if="checkMenuGuard(4)"
      class="link-gray item"
      :to="'/elearning/manager/warehouses'"
      :class="active == 4 ? 'active' : ''"
    >
      <IconBooks />Kho học liệu
    </n-link>
    <n-link
      v-if="checkMenuGuard(5)"
      class="link-gray item"
      :to="'/elearning/manager/online-class'"
      :class="active == 5 ? 'active' : ''"
    >
      <IconFolderCheck />Phòng học online
    </n-link>
    <n-link
      v-if="checkMenuGuard(6)"
      class="link-gray item"
      :to="'/elearning/manager/interacts'"
      :class="active == 6 ? 'active' : ''"
    >
      <IconChatUser />Tương tác với học sinh
    </n-link>
    <n-link
      v-if="checkMenuGuard(7)"
      class="link-gray item"
      :to="'/elearning/manager/rates'"
      :class="active == 8 ? 'active' : ''"
    >
      <IconStar />Đánh giá và bình luận
    </n-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { USER_ROLES } from "~/utils/constants";
import { isCommonElementIn2Array } from "~/utils/common";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";

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
  },

  computed: {
    ...mapState("account", { profile: "profileList" }),

    userRoles() {
      return this.get(this, "profile.role.authority", false) || [];
    }
  },
  methods: {
    async fetchProfile() {
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`)
      ]);
    },

    checkMenuGuard(_menuActive) {
      let isValidMenu = true;
      switch (_menuActive) {
        // TONG QUAN
        case 1:
          isValidMenu = true; // always active Tong Quan menu
          break;

        // Bai Giang & Khoa hoc
        case 2:
          isValidMenu = true;
          break;

        // Bai tap & bai kiem tra
        case 3:
          isValidMenu = true;
          break;

        // Kho hoc lieu
        case 4:
          isValidMenu = true;
          break;

        // Phong hoc online
        case 5:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_TEACHER,
            USER_ROLES.ROLE_STUDENT
          ]);
          break;

        // Tuong tac voi hoc sinh
        case 6:
          isValidMenu = true;
          break;

        // Danh gia & binh luan
        case 7:
          isValidMenu = true;
          break;

        default:
          isValidMenu = true;
          break;
      }

      console.log("[checkMenuGuard]", _menuActive, isValidMenu);
      return isValidMenu;
    },

    get
  },
  async created() {
    await this.fetchProfile();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_manager-side.scss";
</style>