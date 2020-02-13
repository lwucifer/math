<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <n-link to class="footer__logo mb-3">
            <LogoGradient />
          </n-link>
          <div
            class="footer__brand-desc"
          >Cuộc cách mạng khẳng định TẦM NHÌN – TRÍ TUỆ Việt trong kỷ nguyên công nghệ 4.0. Ứng dụng kết nối thông minh trong lĩnh vực Giáo dục</div>
          <img src="~assets/images/footer/bo-cong-thuong.png" width="147" alt="Đã đăng ký bộ công thương">
        </div>

        <div class="col-md-4">
          <h2 class="footer__title">Về Schoolly</h2>
          <ul class="footer__menu">
            <li><a href="">Điều khoản sử dụng</a></li>
            <li><a href="">Quy chế hoạt động</a></li>
            <li><a href="">Chính sách bảo mật</a></li>
            <li><a href="">Trung tâm chăm sóc khách hàng</a></li>
            <li><a href="">Chính sách hoàn tiền</a></li>
          </ul>
        </div>

        <div class="col-md-4">
          <h2 class="footer__title">Tải ngay App Schoolly</h2>
          <div class="footer__download">
            <span>
              <img src="~assets/images/footer/playstore.png" width="171" alt="">
            </span>
            <span>
              <img src="~assets/images/footer/appstore.png" width="176" alt="">
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__copyright">
      <div class="container footer__copyright__container">
        <div class="footer__copyright__text">Copyright @ website by FamTech</div>
        <ul class="footer__copyright__menu">
          <li><a href="">Trang chủ</a></li>
          <li><a href="">Dịch vụ</a></li>
          <li><a href="">Liên hệ</a></li>
          <li><a href="">Chính sách & bảo mật</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import LogoGradient from "~/assets/svg/logo/logo-gradient.svg?inline";

export default {
  components: {
    LogoGradient
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/footer/_footer.scss";
</style>