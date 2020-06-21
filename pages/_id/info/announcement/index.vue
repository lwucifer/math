<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :active="5" />
      </div>
      <div class="col-md-9 cc-panel">
        <block-section :title="checkType == 'SOCIAL' ? '' : 'Elearning'">
          <template v-slot:content>
            <div class="wrap-notify-account-info">
              <div class="header-content">
                <h4>Danh sách thông báo</h4>
                <div class="ml-auto d-flex">
                  <n-link
                    @click.prevent="handleCheckAllRead"
                    class="d-flex align-items-center text-primary text-decoration-none"
                    to
                  >
                    <IconCheck24px class="fill-primary mr-3" />
                    Đánh dấu tất cả là đã đọc
                  </n-link>
                  <n-link
                    class="d-flex align-items-center ml-4 text-decoration-none text-gray"
                    :to="'/' + token.id + '/info/setting'"
                  >
                    <IconSettings24px class="mr-3" />
                    Cài đặt thông báo
                  </n-link>
                </div>
              </div>
              <template 
                v-if="checkType == 'SOCIAL'"
                class="content-notification" 
              >
                <notification-item
                  v-for="(item, index) in notiSocial"
                  :key="index"
                  :dataNoti="item"
                  :isReaded="isReaded"
                  @read="handleReadNotifi"
                  :typeTab="'social'"
                />
              </template>
              <template 
                v-else
                class="content-notification" 
              >
                <notification-item
                  v-for="(item, index) in notiElearning"
                  :key="index"
                  :dataNoti="item"
                  :isReaded="isReaded"
                  @read="handleReadNotifi"
                  :typeTab="'elearning'"
                />
                <!-- <app-pagination
                  :pagination="pagination"
                  @pagechange="onPageChange"
                  class="mt-5"
                /> -->
              </template>
            </div>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
          </template>
        </block-section>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import IconCheck24px from "~/assets/svg/v2-icons/check_24px.svg?inline";
import IconSettings24px from "~/assets/svg/v2-icons/settings_24px.svg?inline";
import { mapState, mapActions } from "vuex";
import { FETCH_SIZE, SOCIAL, ELEARNING } from "../../../../utils/config"
const STORE_NOTIFI = "elearning/study/notifications";
export default {
  layout: "account-info",

  components: {
    SchoolAccountSide,
    IconCheck24px,
    IconSettings24px,
  },
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
  //   return {checkType: query.type == 'SOCIAL' ? 'SOCIAL' : 'ELEARNING'}
  // },
  data() {
    return {
      isReaded: false,
      checkType: this.$route.query.type == SOCIAL ? SOCIAL : ELEARNING,
      pagination: {
        total_pages: 2,
        size: 10,
        total_elements: 20,
        first: 1,
        last: 0,
        number: 1,
      },
    };
  },
  computed: {
    ...mapState(STORE_NOTIFI, ["notiElearning", "notiSocial"]),
    ...mapState("auth", ["token"]),
  },

  created() {
    // this.getNotifications({
    //   fetch_size: FETCH_SIZE,
    //   service_type: ELEARNING,
    // });
  },

  methods: {
    ...mapActions(STORE_NOTIFI, [
      "getNotifications", 
      "getCountNotifications", 
      "handleCheckAllRead"
    ]),

    infiniteHandler($state) {
      // axios.get(api, {
      //   params: {
      //     page: this.page,
      //   },
      // })
      this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: ELEARNING,
      })
      .then(res => {
          console.log('infiniteHandler', res)
          // if (res.data) {
          //   this.page += 1;
          //   this.notiElearning.push(...res.data);
          //   $state.loaded();
          // } else {
          //   $state.complete();
          // }
        });
    },
    handleReadNotifi(val) {
      this.isReaded = val;
    },
    onPageChange(e) {
      this.$emit("pagechange", e);
    },
    handleCheckAllRead() {
      this.checkIsReadNotifications({
        type: "ALL",
        service_type: ELEARNING,
      }).then((res) => {
        if (res.data.success) {
          this.getNotifications({
            fetch_size: FETCH_SIZE,
            service_type: ELEARNING,
          });
          this.getCountNotifications({
            service_type: ELEARNING,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
.wrap-notify-account-info {
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  .header-content {
    display: flex;
    padding: 2rem;
    border: 1px solid #e0e0e0;
  }
  .content-notification {
    padding: 15px 5px;
  }
}
</style>
