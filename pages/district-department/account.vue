<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <menu-aside
          :school="school"
          :actived="actived"
          @selectMenu="changeContent"
        />
      </div>
      <div class="col-md-9">
        <div class="manager-content">
          <keep-alive>
            <component
              :is="currentComponent"
            >
            </component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuAside from "~/components/page/district-department/account/MenuAside";
  // Import faked data
  import { SCHOOL } from "~/server/fakedata/school/test";

  export default {
    layout: 'manage',

    components: {
      MenuAside,
      Profile: () => import('~/components/page/district-department/account/Profile'),
      Notification: () => import('~/components/page/district-department/account/Notification'),
      Transaction: () => import('~/components/page/district-department/account/Transaction'),
      Support: () => import('~/components/page/district-department/account/Support'),
    },

    data() {
      return {
        isAuthenticated: true,
        actived: 'profile',
        school: SCHOOL,
        avatar: [],
        avatarSrc: "https://picsum.photos/170/170"
      };
    },

    computed: {
      currentComponent: function() {
        const MATCHED_COMPONENTS = {
          profile: 'Profile',
          notification: 'Notification',
          transaction: 'Transaction',
          support: 'Support',
        }
        return MATCHED_COMPONENTS[this.actived]
      }
    },

    methods: {
      changeContent(data) {
        this.actived = data
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/district-department/_account.scss";
</style>