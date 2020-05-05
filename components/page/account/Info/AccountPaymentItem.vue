<template>
    <div class="wrap-account">
      <p>Ngân hàng: <strong>{{get(this,"bank.bank_name","")}}</strong></p>
      <p>Chi nhánh: <strong>{{get(this,"bank.branch","")}}</strong></p>
      <p>Tên chủ tài khoản: <strong>{{get(this,"bank.account_name","")}}</strong></p>
      <p>Số tài khoản: <strong>{{get(this,"bank.account_number","")}}</strong></p>
      <div class="d-flex justify-content-center">
        <button 
          class="cc-box__btn cc-box__btn-edit mr-4"
          @click="handleRefreshAccountBank"
          >
          <IconEditAlt class="icon d-block subheading fill-primary" />
        </button>
        <button class="cc-box__btn cc-box__btn-edit"
           @click="handleDeleteAccountBank"
        >
          <IconTrashAlt class="icon d-block subheading fill-secondary" />
        </button>
      </div>
    </div>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline"
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
export default {
  components:{
    IconEditAlt,
    IconTrashAlt
  },
  props:{
    bank: {
      type: Object,
      default: null
    }
  },
  methods:{
    get,
    async handleDeleteAccountBank(){
      const payload = get(this,"bank.user_bank_id","");
      console.log(payload)
      const result = await this.$store.dispatch(`bank/${actionTypes.ACCOUNT_BANKS.DELETE}`,payload)
      if (get(result, "success", false)) {
        this.$toasted.success(get(result, "message", ""));
        this.$emit("handleRefreshAccountBank");
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    },
    handleRefreshAccountBank(){
      this.$emit("handleRefreshAccountBank");
    }
  }
}
</script>

<style lang="scss">
 
</style>