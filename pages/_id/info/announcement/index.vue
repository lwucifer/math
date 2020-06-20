<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :active="5" />
      </div>
      <div class="col-md-9 cc-panel">
        <block-section title="Elearning">
          <template v-slot:content>
            <div class="wrap-notify-account-info">
              <div class="header-content">
                <h4>Danh sách thông báo</h4>
                <div class="ml-auto d-flex">
                  <n-link
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
              <div class="content-notification">
                <notification-item
                  v-for="(item, index) in notis"
                  :key="index"
                  :dataNoti="item"
                  :isReaded="isReaded"
                  @read="handleReadNotifi"
									:typeTab="'elearning'"
                />
                <app-pagination
                  :pagination="pagination"
                  @pagechange="onPageChange"
                  class="mt-5"
                />
              </div>
            </div>
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
const STORE_NOTIFI = "elearning/study/notifications";
export default {
  layout: "account-info",

  components: {
    SchoolAccountSide,
    IconCheck24px,
    IconSettings24px,
  },
  data() {
    return {
      isReaded: false,
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
    ...mapState("elearning/study/notifications", ["notis"]),
    ...mapState("auth", ["token"]),
  },
  created() {
    this.getNotifications({
      fetch_size: 50,
      service_type: "ELEARNING",
    });
  },
  methods: {
    ...mapActions(STORE_NOTIFI, ["getNotifications"]),
    handleReadNotifi(val) {
      this.isReaded = val;
    },
    onPageChange(e) {
      this.$emit("pagechange", e);
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
