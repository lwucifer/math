<template>
  <header-frame
    search-placeholder="Tìm kiếm"
  >
    <template v-slot:functionMenu>
      <div class="d-md-flex">

        <n-link
          to="/"
          class="link-dark link--pure"
          :class="{ 'link--actived': true }"
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
        <app-notification-header/>
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

  export default {
    components: {
      HeaderFrame,
      UserHeader,
      ModalSigninByPhone,
      IconCaretDown,
      IconTickGray
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
  .link--pure,
  .link--dropdown {
    margin: 0 1rem;
    display: inline-block;
    position: relative;

    &:hover {
      color: $color-primary;
    }
  }

  .link--pure {
    line-height: 4.7rem;
  }

  .link--dropdown {

    &__title {
      line-height: 4.7rem;

      &:hover,
      &:focus {
        outline: none;
        color: $color-primary;
        text-stroke: .6px $color-primary; // alternative of font-weight bold https://dev.to/mingyena/fix-inline-elements-shifting-issue-in-bold-on-hover-4fb
        -webkit-text-stroke: .6px $color-primary; //Firefox and Edge

        svg path {
          fill: $color-primary;
        }
      }
    }

    &__content {
      width: 16rem;

      &__item {
        padding: 1rem 2rem;
        border-bottom: 1px solid #eee;
        svg {
          margin-right: 1rem;
        }

        &:hover {
          svg path {
            fill: $color-primary;
          }
        }
      }
    }

    &:before {
      content: "";
      position: absolute;
      height: 24px;
      width: 1px;
      background-color: rgba($color-dark, .32);
      left: -1rem;
      top: calc(50% - 12px);
    }

    &__content {
      ul {
        list-style-type: none;
      }
    }
  }

  .link--actived {
    font-weight: bold;
    color: $color-primary;

    &:after {
      content: "";
      position: absolute;
      height: 3px;
      background-color: $color-primary;
      bottom: 0;
      width: 4.4rem;
      left: calc(50% - 2.2rem);
      bottom: -2rem;
    }
  }
</style>