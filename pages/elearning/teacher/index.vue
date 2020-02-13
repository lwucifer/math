<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningSide active="1" :teacher="teacher" />
      </div>
      <div class="col-md-9">
        <div class="elearning-account__main">
          <h3 class="color-primary mb-4">Thông tin tài khoản</h3>

          <app-input labelFixed :value="name" label="Họ và tên" disabled />

          <app-input labelFixed v-model="phone" label="Số điện thoại" />
          <app-input labelFixed v-model="email" label="Email" />
          <div class="app-inputs-inline">
            <app-input type="date" labelFixed v-model="birthday" label="Ngày sinh" />
            <app-input label="Giới tính">
                <app-select v-model="sex" :options="sexs" class="form-control" />
            </app-input>
          </div>

          <app-button color="red" square class="mt-3">
            <IconLock2 />
            <span class="ml-3">Thay đổi mật khẩu</span>
          </app-button>

          <div class="d-flex mt-5">
            <app-button class="ml-auto" square>Lưu thay đổi</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search2.svg?inline";
import IconLock2 from "~/assets/svg/icons/lock2.svg?inline";
import ElearningItem from "~/components/page/elearning/ElearningItem";
import ElearningSide from "~/components/page/elearning/ElearningSide";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningItem,
    IconSearch,
    IconFilter,
    IconLock2,
    ElearningSide
  },

  data() {
    return {
      isAuthenticated: true,
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
      },
      birthday: null,
      sex: "1",
      sexs: [
        { value: "1", text: "Nam" },
        { value: "2", text: "Nữ" }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  watch: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-account.scss";
</style>