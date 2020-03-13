<template>
  <header-frame
    search-placeholder="Tìm kiếm"
  >
    <template v-slot:functionMenu>
      <div class="d-md-flex">

        <n-link
          to="/"
          class="link-dark link--pure"
        >
          Dòng thời gian
        </n-link>

        <n-link
          to="/"
          class="link-dark link--pure"
        >
          E-learning
        </n-link>

        <n-link
          to="/"
          class="link-dark link--pure"
        >
          Giáo viên
        </n-link>

        <app-dropdown
          class="link-dark link--dropdown mr-0"
          position="left"
          v-model="dropdownShow"
          :content-width="'230px'"
        >
          <button slot="activator" type="button" class="link--dropdown__title">
            <span>Bài giảng và khóa học</span>&nbsp;
            <span><IconCaretDown width="10" height="6"/></span>
          </button>
          <div class="link--dropdown__content">
            <ul>
              <li class="link--dropdown__content__item">
                <n-link to="/" class="link-dark">
                  <IconTickGray/>
                  <span>Item 1</span>
                </n-link>
              </li>
              <li class="link--dropdown__content__item">
                <n-link to="/" class="link-dark">
                  <IconTickGray/>
                  <span>Item 2</span>
                </n-link>
              </li>
            </ul>
          </div>
        </app-dropdown>

      </div>
    </template>

    <template v-slot:rightMenu>
      <div v-if="isAuthenticated">
        <div class="app-noti-header">
          <ul>
            <li>
              <a href class="app-noti-header__item">
                <IconMessenger height="22" width="22"/>
                <span class="text-white">12</span>
              </a>
            </li>
            <li>
              <a href class="app-noti-header__item">
                <IconBell height="22" width="22"/>
                <span class="text-white">2</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="isAuthenticated">
        <user-header/>
      </div>

      <div v-else class="d-flex">
        <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
        <n-link
          class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
          :to="'/auth/signup'"
        >Đăng ký
        </n-link>
      </div>

      <div v-else class="d-flex">
        <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
        <n-link
          class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
          :to="'/auth/signup'"
        >Đăng ký
        </n-link>
      </div>

      <ModalSigninByPhone :visible="showLogin" @click-close="showLogin = false"/>
    </template>
  </header-frame>
</template>

<script>
  import ModalSigninByPhone from "~/components/page/auth/ModalSigninByPhone";
  import HeaderFrame from "~/components/common/header/HeaderFrame";
  import UserHeader from "~/components/common/user-header/UserHeader";
  import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
  import IconTickGray from "~/assets/svg/icons/tick-gray.svg?inline";
  import IconBell from "~/assets/svg/icons/bell.svg?inline";
  import IconMessenger from "~/assets/svg/icons/messenger2.svg?inline";

  export default {
    components: {
      HeaderFrame,
      UserHeader,
      ModalSigninByPhone,
      IconCaretDown,
      IconTickGray,
      IconBell,
      IconMessenger
    },

    data: () => ({
      showLogin: false,
      dropdownShow: false
    }),
    computed: {
      isAuthenticated() {
        return true;
        return this.$store.getters["auth/isAuthenticated"];
      }
    },
    methods: {
      redirectSignin() {
        this.$router.push("/auth/signin");
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/header-department/_header-department"
</style>