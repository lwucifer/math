<template>
    <div class="container">
        <AccountCover/>
        <div class="row">
            <div class="col-md-3">
                <AsideBox title="Cài đặt chung" class="side-links">
                    <n-link :to="'/account/settings'">Liên kết thêm trường</n-link>
                    <n-link :to="'/account/settings/referral'">Referral</n-link>
                    <n-link :to="'/account/settings/manual'">Hướng dẫn sử dụng</n-link>
                    <n-link to class="active">Trợ giúp khách hàng</n-link>
                </AsideBox>
            </div>
            <div class="col-md-9">
                <div class="account-settings__main box23">
                	<h3>Yêu cầu khách hàng</h3>
                	
                	<div class="content">
                    Ullamco magna et esse est nostrud adipisicing velit consectetur non velit pariatur. Aliqua ipsum voluptate id tempor nisi consectetur esse occaecat commodo mollit non tempor. Fugiat ipsum fugiat sint adipisicing exercitation do mollit. Incididunt Lorem nostrud mollit ullamco occaecat.
                    Ullamco elit labore commodo sint do excepteur velit ad proident ex aute qui do non. Consectetur voluptate incididunt aute id enim et voluptate tempor eiusmod. Exercitation tempor dolor minim consequat. Fugiat ad enim excepteur elit proident voluptate dolore ipsum. Nostrud Lorem labore qui exercitation adipisicing. Ullamco fugiat deserunt ullamco nostrud nisi. Mollit consectetur aliquip eu elit et irure fugiat.
                    Ipsum amet enim ut veniam proident magna velit do reprehenderit. Nisi laborum dolor sit consequat Lorem id culpa do ullamco. Sit elit eiusmod quis pariatur proident aliqua. Consequat fugiat velit voluptate amet Lorem dolore enim sint exercitation eiusmod sunt in.
                	</div>

                  <div class="text-center mt-4">
                  	<app-button class="account-settings-help-btn" size="xl">
                     Gửi yêu cầu 
                    </app-button>
                  </div>
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