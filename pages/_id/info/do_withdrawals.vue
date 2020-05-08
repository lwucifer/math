<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="3" />
      </div>
      <div class="col-md-9">
        <block-section
          title="Rút tiền về tài khoản"
          has-icon
        >
          <template v-slot:content>
            <do-withdrawals-form
              :banks="banks"
            />
          </template>
        </block-section>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide"
import DoWithdrawalsForm from "~/components/page/account/forms/DoWithdrawals"
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",
  layout: 'account-info',

  components: {
    SchoolAccountSide,
    DoWithdrawalsForm,
  },

  data() {
    return {
      banks: [
        { value: 1, text: "Ngân hàng Agribank" },
        { value: 2, text: "Ngân hàng Techcombank" },
        { value: 3, text: "Ngân hàng Vietcombank" },
        { value: 4, text: "Ngân hàng TPBank" },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
  
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>