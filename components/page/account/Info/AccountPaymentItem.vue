<template>
    <div class="wrap-account">
      <p>Ngân hàng: <strong>Vietcombank</strong></p>
      <p>Chi nhánh: <strong>Thăng Long</strong></p>
      <p>Tên chủ tài khoản: <strong>Tài Văn Khoản</strong></p>
      <p>Số tài khoản: <strong>1956546545</strong></p>
      <div class="d-flex justify-content-center">
        <button class="cc-box__btn cc-box__btn-edit mr-4">
          <IconEditAlt class="icon d-block subheading fill-primary" />
        </button>
        <button class="cc-box__btn cc-box__btn-edit">
          <IconTrashAlt class="icon d-block subheading fill-secondary" />
        </button>
      </div>
    </div>
</template>

<script>
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline"
export default {
  components:{
    IconEditAlt,
    IconTrashAlt
  }
}
</script>

<style lang="scss">
 
</style>