<template>
    <div class="container">
        <AccountCover/>
        <div class="row">
            <div class="col-md-3">
                <AsideBox title="Cài đặt chung" class="side-links">
                    <n-link :to="'/account/settings'">Liên kết thêm trường</n-link>
                    <n-link to class="active">Referral</n-link>
                    <n-link :to="'/account/settings/manual'">Hướng dẫn sử dụng</n-link>
                    <n-link :to="'/account/settings/help'">Trợ giúp khách hàng</n-link>
                </AsideBox>
            </div>
            <div class="col-md-9 account-settings__main">
                <div class="box23 account-settings__main-item">
                	<h3>Liên kết trường</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Mã giới thiệu</td>
                        <td class="bold">MJS2SJAA <IconPages class="ml-3"/></td>
                      </tr> 
                      <tr>
                        <td>Mã giới thiệu</td>
                        <td class="bold">152</td>
                      </tr> 
                      <tr>
                        <td>Tiền hoa hồng</td>
                        <td class="bold">1.325.669 VNĐ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="box23 account-settings__main-item">
                  <h3>Danh sách bạn bè giới thiệu</h3>
                  <div class="row">
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                    <div class="col-md-4 col-sm-6 col-xs-12">Irma Lane</div>
                  </div>
                </div>

                <div class="box23 account-settings__main-item">
                  <h3>Lịch sử hoa hồng</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>2.500.000</td>
                        <td>April 27, 2019 9:05 AM</td>
                      </tr> 
                      <tr>
                        <td>5.500.000</td>
                        <td>April 17, 2018 9:05 AM</td>
                      </tr> 
                      <tr>
                        <td>2.500.000</td>
                        <td>April 27, 2018 9:05 AM</td>
                      </tr> 
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AsideBox from "~/components/layout/asideBox/AsideBox";
import IconPages from '~/assets/svg/icons/pages.svg?inline';

export default {
  components: {
  	AsideBox,
  	IconPages
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