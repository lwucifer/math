
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="6" />
      </div>
      <div class="col-md-9">
        <div class="wrap-content-create-notify__ElearningManagerInteractive">
          <h5 class="notify-title">
            <ArrowLeft class="mr-3" />Tạo thông báo
          </h5>

          <div class="notify-content">
            <div class="d-flex flex-column">
              <h5>Chọn bài giảng/ khóa học liên quan</h5>
              <app-select
                label="text"
                placeholder="Chọn"
                searchable
                clearable
                class="content-select__ElearningManagerInteractive"
              ></app-select>
            </div>

            <div class="form">
              <h5>Tiêu đề thông báo</h5>
              <app-input placeholder="Nhập tiêu đề" />
            </div>

            <div class="form">
              <h5>Nội dung thông báo</h5>
              <app-input
                textarea
                placeholder="Xin chào..."
                class="textArea__ElearningManagerInteractive"
              />
            </div>

            <div class="d-flex justify-content-center">
              <app-button square size="sm">Hoàn thành</app-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppNotifyModal
      v-if="showModal"
      message="Tạo thông báo thành công!"
      :show="true"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import IconClose from "~/assets/svg/design-icons/multiply.svg?inline";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import ArrowLeft from "~/assets/svg/v2-icons/arrow_left_black.svg?inline";
import AppNotifyModal from "~/components/common/modal/AppNotifyModal";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    IconClose,
    ArrowLeft,
    AppNotifyModal
  },
  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      showModal: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-interactive.scss";
</style>