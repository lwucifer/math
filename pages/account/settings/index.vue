<template>
    <div class="container">
        <AccountCover/>
        <div class="row">
            <div class="col-md-3">
                <AsideBox title="Cài đặt chung" class="side-links">
                    <n-link to class="active">Liên kết thêm trường</n-link>
                    <n-link :to="'/account/settings/referral'">Referral</n-link>
                    <n-link :to="'/account/settings/manual'">Hướng dẫn sử dụng</n-link>
                    <n-link :to="'/account/settings/help'">Trợ giúp khách hàng</n-link>
                </AsideBox>
            </div>
            <div class="col-md-9">
                <div class="account-settings__main box23">
                	<h3>Liên kết trường</h3>

                	<div class="row mt-3">
                		<div class="col-md-8 col-sm-12 form-group">
                			<input type="text" v-model="code" placeholder="nhập mã liên kết" class="form-control">
                		</div>
                		<div class="col-md-4 col-sm-12">
                			<app-button square fullWidth>Kích hoạt</app-button>
                		</div>
                	</div>

                	<n-link :to="'/account/settings/manual'" class="account-settings__main-help"><IconExclamationO class="mr-2"/>Hướng dẫn sử dụng</n-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AsideBox from "~/components/layout/asideBox/AsideBox";
import IconExclamationO from '~/assets/svg/icons/exclamation-o.svg?inline';

export default {
  components: {
  	AsideBox,
  	IconExclamationO
  },

  data() {
    return {
    };
  },

  computed: {},

  methods: {}
};
</script>

<style lang="scss">
    @import "~/assets/scss/components/account/_account-settings.scss";
</style>


