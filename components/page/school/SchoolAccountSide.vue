<template>
  <div class="school-side menu-side">
    <aside-menu :selected-item="active" :items="menuItems"></aside-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { USER_ROLES } from "~/utils/constants";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { getToken } from "~/utils/auth";



export default {
  components: {},
  data() {
    return {
      menuItems: []
    };
  },
  props: {
    active: {
      type: [String, Number]
    }
  },
  computed: {
    ...mapState("account", { profile: "profileList" }),

    getConstantMenu() {
      const accountObj = getToken();
      if (!!accountObj) {
        return [
          {
            label: "Thông tin tài khoản",
            key: 1,
            icon: "user.svg",
            link: `/${accountObj.id}/info`
          },
          {
            label: "Thông báo",
            key: 5,
            icon: "bell.svg",
            link: `/${accountObj.id}/info/announcement`
          },
          {
            label: "Cài đặt chung",
            key: 6,
            icon: "cog.svg",
            link: `/${accountObj.id}/info/setting`
          },
          {
            label: "Trợ giúp",
            key: 7,
            icon: "exclamation.svg",
            link: `/${accountObj.id}/info/support`
          }
        ];
      }
    },

    getAuthMenu() {
      const accountObj = getToken();
      if (!!accountObj) {
        return [
          {
            label: "Lịch sử giao dịch",
            key: 4,
            icon: "history.svg",
            link: `/${accountObj.id}/info/transactions`,
            roles: [
              USER_ROLES.ROLE_USER,
              USER_ROLES.ROLE_STUDENT,
              USER_ROLES.ROLE_TEACHER,
              USER_ROLES.ROLE_PARENT
            ]
          },
          {
            label: "Thống kê doanh thu",
            key: 3,
            icon: "exclamation.svg",
            link: `/${accountObj.id}/info/revenues`,
            roles: [USER_ROLES.ROLE_TEACHER]
          }
        ];
      }
    }
  },
  methods: {
    async fetchProfile() {
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`)
      ]);
    },
    genMenuItem() {
      const data = [];
      const currentRole = this.get(this, "profile.role.authority", false);
      if (currentRole) {
        const menuLeng = this.getAuthMenu ? this.getAuthMenu.length : 0;
        for (let i = 0; i < menuLeng; i++) {
          const tmp = this.getAuthMenu[i];
          if (tmp.roles.includes(currentRole)) {
            data.push(tmp);
          }
        }
      }
      this.menuItems = this.getConstantMenu.concat(data);
    },
    get
  },
  async created() {
    await this.fetchProfile();
    this.genMenuItem();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>