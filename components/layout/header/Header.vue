<template>
  <div class="the-header" v-sticky :sticky-z-index="100">
    <div class="the-header__content">
      <div class="the-header__logo">
        <n-link to="/">
          <Logo />
        </n-link>
      </div>

      <div class="the-header__search">
        <form class="the-header__search__form" @submit.prevent>
          <input type="text" placeholder="Tìm kiếm" />
          <button type="submit">
            <IconSearch width="15" height="15" class="fill-white" />
          </button>
        </form>
      </div>

      <ul class="the-header__menu">
        <li>
          <n-link to="/">Dòng thời gian</n-link>
        </li>
        <li>
          <n-link to="/elearning">E-learning</n-link>
        </li>
        <li>
          <n-link to="/school">Trường học</n-link>
        </li>
      </ul>
      <div v-if="isAuthenticated" class="the-header__user">
        <study-space />
        <button class="item" @click="redirectMessages">
          <IconMessager />
          <span class="number">9</span>
        </button>
        <button class="item" @click.prevent="$router.push('/payment/cart')">
          <IconShoppingCartAlt />
          <span
            v-if="get(cartCheckout, 'orders.length', 0)"
            class="number"
          >{{ get(cartCheckout, "orders.length", 0) }}</span>
        </button>
        <app-dropdown
          position="right"
          v-model="dropdownNotify"
          :content-width="'580px'"
          open-on-click
          class="link--dropdown link--dropdown-auth item p-0"
          @visible-change="handleVisibleChange"
        >
          <button class="item" slot="activator" slot-scope="{ on }" v-on="on">
            <IconBell />
            <span class="number" v-if="notiUnread > 0">{{ notiUnread }}</span>
          </button>
          <div class="link--dropdown__content">
            <ul>
              <li>
                <div class="d-flex">
                  <h6>Thông báo</h6>
                  <div class="ml-auto">
                    <n-link
                      class="text-primary"
                      to
                      @click.native="unreadAll"
                    >Đánh dấu tất cả đã đọc</n-link>
                    <n-link class="ml-3 text-primary" to="/account/info/setting">Cài đặt</n-link>
                  </div>
                </div>
              </li>
            </ul>
            <ul style="overflow-y: auto; max-height:400px" id="ul-noti" ref="ulNoti">
              <li
                v-for="(item, index) in notis && notis.listNotification
                  ? notis.listNotification
                  : []"
                :key="index"
                class="p-0"
              >
                <n-link to>
                  <div :class="item && item.is_read == 1 ? 'readed' : ''">
                    <div class="wrapitemnotify">
                      <app-avatar
                        :src="
                          item && item.image && item.image.low
                            ? item.image.low
                            : 'https://picsum.photos/60/60'
                        "
                      />
                      <div class="text-gray ml-3">
                        <p>{{ item && item.meta_data }}</p>
                        <p>{{ item && item.created_at | moment("from") }}</p>
                      </div>
                      <div class="d-flex flex-column align-items-center pl-3 ml-auto btn-hover">
                        <button
                          class="cc-box__btn cc-box__btn-edit"
                          v-tooltip.bottom="{
                            content: 'Xóa thông báo',
                            classes: ['tooltipAnnouncenment'],
                          }"
                        >
                          <IconTrashAlt class="icon fill-disabled" />
                        </button>
                        <button
                          class="cc-box__btn cc-box__btn-edit mt-2"
                          v-if="item && item.is_read == 0"
                          @click.prevent="handleReadNotify(item.id)"
                          v-tooltip.bottom="{
                            content: 'Đánh dấu đã đọc',
                            classes: ['tooltipAnnouncenment'],
                          }"
                        >
                          <IconEllipse class="d-block fill-gray" />
                        </button>
                        <button
                          class="cc-box__btn cc-box__btn-edit mt-2"
                          v-else
                          @click.prevent="handleReadNotify(item.id)"
                          v-tooltip.bottom="{
                            content: 'Đánh dấu chưa đọc',
                            classes: ['tooltipAnnouncenment'],
                          }"
                        >
                          <IconEllipseAlt class="d-block fill-gray" />
                        </button>
                      </div>
                    </div>
                  </div>
                </n-link>
              </li>
              <client-only>
                <infinite-loading v-if="dropdownNotify" @infinite="notiInfiniteHandler">
                  <template slot="no-more">Không còn thông báo.</template>
                </infinite-loading>
              </client-only>
            </ul>
          </div>
        </app-dropdown>

        <user-header />
      </div>

      <div v-else class="d-flex">
        <n-link
          class="btn btn--size-md btn--color-primary btn--square mr-3"
          :to="'/auth/signin'"
        >Đăng nhập</n-link>
        <n-link
          class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
          :to="'/auth/signup'"
        >Đăng ký</n-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconGlobeNoti from "~/assets/svg/icons/globe-noti.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import IconShoppingCartAlt from "~/assets/svg/design-icons/shopping-cart-alt.svg?inline";
import IconMessager from "~/assets/svg/icons/messager.svg?inline";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import AnnoucementItem from "~/components/page/account/Info/AnnouncementItem";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconEllipseAlt from "~/assets/svg/icons/ellipse-alt.svg?inline";
import IconEllipse from "~/assets/svg/icons/ellipse.svg?inline";
import Notifications from "~/services/notification/notifications";
import * as actionTypes from "~/utils/action-types";
import { get, isEmpty } from "lodash";
import { UPDATE_NOTI } from "~/utils/constants";
import { detectBrowser } from "~/utils/common";

export default {
  components: {
    Logo,
    IconSearch,
    IconGlobeNoti,
    IconCaretDown,
    IconBell,
    IconShoppingCartAlt,
    IconMessager,
    AnnoucementItem,
    IconTrashAlt,
    IconEllipseAlt,
    IconEllipse
  },

  data: () => ({
    showLogin: false,
    dropdownAuth: false,
    dropdownCourse: false,
    dropdownNotify: false,
    readAnnouncenment: true,
    read: false,
    notiList: [],
    infiniteId: +new Date(),
    checkPayload: false
  }),
  computed: {
    ...mapState("notifications", ["notis", "notiUnread"]),
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    ...mapGetters("cart", ["cartCheckout"])
  },
  mounted() {
    this.$fireMess.onMessage(payload => {
      console.log("Message received. ", payload);
      const data = {
        ...payload.data,
        is_read: 0,
        meta_data: payload.notification.body
      };
      this.reviceNoti(data);
      this.socialNotifications({
        params: {
          page: 1
        }
      });
      this.checkPayload = true;
    });
    // console.log("detectBrowser", detectBrowser());
    this.cartList();
  },
  created() {
    this.getNotiUnread();
  },
  methods: {
    get,
    ...mapMutations("auth", ["removeToken"]),
    ...mapMutations("notifications", ["reviceNoti"]),
    ...mapActions("notifications", [
      "socialNotifications",
      "readNotification",
      "getNotiUnread"
    ]),
    ...mapActions("cart", ["cartList"]),
    redirectSignin() {
      this.$router.push("/auth/signin");
    },
    redirectMessages() {
      this.$router.push("/messages/t");
    },
    handleLogout() {
      this.removeToken();
      this.redirectSignin();
    },
    // Handle read/unread 1 noti
    handleReadNotify(id) {
      const params = {
        update: UPDATE_NOTI.ONLY_ONE,
        notification_id: id
      };
      this.readNotification(params).then(result => {
        if (result.success == true) {
        }
      });
    },
    // Handle unread all noti
    unreadAll() {
      const params = {
        update: UPDATE_NOTI.ALL
      };
      this.readNotification(params).then(result => {
        if (result.success == true) {
        }
      });
    },
    handleVisibleChange(isvisible) {
      // console.log("this.$refs", this.$refs);
      if (isvisible && this.checkPayload) {
        this.$refs.ulNoti.scrollTop = 0;
        this.checkPayload = false;
      }
    },
    async notiInfiniteHandler($state) {
      const getData = await this.$store.dispatch(
        `notifications/${actionTypes.SOCIAL_NOTIFICATIONS.LIST}`,
        {
          params: {
            page: get(this, "notis.page.number", 0) + 1
          }
        }
      );
      console.log("getData", getData);
      if (getData.success && !isEmpty(getData.data)) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/the-header/_the-header.scss";
@import "~/assets/scss/components/account/_account-info-announcement-item.scss";
</style>
