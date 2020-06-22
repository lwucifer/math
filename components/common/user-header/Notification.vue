<template>
  <div class="wrap-notification-header" v-click-outside="handleClickOutside">
    <button @click="showMenuNotifi = !showMenuNotifi" class="item">
      <IconNotifications24px class="fill-gray" />
      <span class="number" v-if="countSumNoti > 0">{{ countSumNoti }}</span>
    </button>
    <div v-if="showMenuNotifi" class="content-dropdown">
      <div class="header-content">
        <h4>Thông báo</h4>
        <div class="ml-auto d-flex">
          <a
            @click.prevent="handleCheckAllRead"
            class="d-flex align-items-center text-primary text-decoration-none"
          >
            <IconCheck24px class="fill-primary mr-3" />
            Đánh dấu tất cả là đã đọc
          </a>
          <a
            class="d-flex align-items-center ml-4 text-decoration-none text-gray"
            :href="'/' + token.id + '/info/setting'"
          >
            <IconSettings24px class="mr-3" />
            Cài đặt thông báo
          </a>
        </div>
      </div>
      <hr />
      <div class="notification-tabs">
        <a
          :class="{ active: tab === 'elearning' }"
          @click="changeTab('elearning')"
        >
          <div class="d-flex">
            e-leaning
            <div class="count-notification" v-if="countNotiElearning > 0">
              {{ countNotiElearning }}
            </div>
          </div>
        </a>
        <a :class="{ active: tab === 'social' }" @click="changeTab('social')">
          <div class="d-flex">
            mạng xã hội
            <div class="count-notification" v-if="countNotiSocial > 0">
              {{ countNotiSocial }}
            </div>
          </div>
        </a>
      </div>
      <div v-if="tab === 'elearning'">
        <div class="tab-notification">
          <notification-item
            v-for="(item, index) in notiElearning"
            :key="index"
            :dataNoti="item"
            :typeTab="tab"
          />
        </div>
        <client-only>
          <infinite-loading @infinite="infiniteHandler">
            <template slot="no-more">Không còn tin nhắn nào.</template>
          </infinite-loading>
        </client-only>
      </div>
      <div v-if="tab === 'social'">
        <div class="tab-notification">
          <notification-item
            v-for="(item, index) in notiSocial"
            :key="index"
            :dataNoti="item"
            :typeTab="tab"
          />
        </div>
         <client-only>
          <infinite-loading @infinite="infiniteHandler">
            <template slot="no-more">Không còn tin nhắn nào.</template>
          </infinite-loading>
        </client-only>
      </div>

      <div class="footer-notification">
        <a :href="getNotificationLink" @click="handleShowMore">
          Xem thêm
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconNotifications24px from "~/assets/svg/v2-icons/notifications_24px.svg?inline";
import IconCheck24px from "~/assets/svg/v2-icons/check_24px.svg?inline";
import IconSettings24px from "~/assets/svg/v2-icons/settings_24px.svg?inline";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { FETCH_SIZE, SOCIAL, ELEARNING } from "~/utils/config";
import { getToken } from "~/utils/auth";
const STORE_NOTIFI = "elearning/study/notifications";
export default {
  components: {
    IconNotifications24px,
    IconCheck24px,
    IconSettings24px,
  },

  data() {
    return {
      showMenuNotifi: false,
      tab: "elearning",
      isReaded: false,
      fromNotifyId: "",
    };
  },

  computed: {
    ...mapState("auth", ["token"]),
    ...mapGetters("elearning/study/notifications", ["countSumNoti"]),
    ...mapState("elearning/study/notifications", [
      "notiElearning",
      "notiSocial",
      "countNotiElearning",
      "countNotiSocial",
      "checkfireBase"
    ]),
    getNotificationLink() {
      const accountObj = getToken();
      if (!!accountObj) {
        return this.tab == "elearning"
          ? `/${accountObj.id}/info/announcement?type=${ELEARNING}`
          : `/${accountObj.id}/info/announcement?type=${SOCIAL}`;
      }
    },
  },

  methods: {
    ...mapActions(STORE_NOTIFI, [
      "getNotifications",
      "getCountNotifications",
      "checkIsReadNotifications",
    ]),
    ...mapMutations(STORE_NOTIFI, ["setCheckFireBase"]),

    async infiniteHandler($state) {
      this.fromNotifyId =
        this.tab == "social"
          ? this.notiSocial[this.notiSocial.length - 1]
          : this.notiElearning[this.notiElearning.length - 1];
      this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: this.tab == "social" ? SOCIAL : ELEARNING,
        from_notification_id: this.fromNotifyId && this.fromNotifyId.id,
      }).then((res) => {
        if (res && res.length) {
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },

    changeTab(_tab) {
      this.tab = _tab;
    },

    handleClickOutside() {
      this.showMenuNotifi = false;
    },

    handleCheckAllRead() {
      this.checkIsReadNotifications({
        type: "ALL",
        service_type: this.tab == "elearning" ? ELEARNING : SOCIAL,
      }).then((res) => {
        if (res.data.success) {
          if (this.tab == "elearning") {
            this.updateCountElearning();
          } else {
            this.updateCountSocial();
          }
        }
      });
    },

    updateCountElearning() {
      this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: ELEARNING,
      });
      this.getCountNotifications({
        service_type: ELEARNING,
      });
    },
    updateCountSocial() {
      this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: SOCIAL,
      });
      this.getCountNotifications({
        service_type: SOCIAL,
      });
    },

    handleShowMore() {
      this.showMenuNotifi = !this.showMenuNotifi;
    },
  },

  watch: {
    showMenuNotifi(newVal) {
      if(this.checkfireBase){
        this.getNotifications({
          fetch_size: FETCH_SIZE,
          service_type: ELEARNING
        });
        this.getNotifications({
            fetch_size: FETCH_SIZE,
            service_type: SOCIAL
        });
      }
      this.setCheckFireBase(false)
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-notication-header.scss";
</style>
