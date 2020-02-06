<template>
  <div class="course-teacher-info">
    <h3>Giảng viên</h3>
    <div class="teacher-top">
      <app-avatar src="https://picsum.photos/125/125" :size="125" />
      <div class="info">
        <h4 class="name">Vũ Ngọc Quyền</h4>
        <p>Giảng viên</p>
        <div class="stars">
            <app-stars :stars="4"/>
        </div>
      </div>

      <div class="right">
        <div>
          <strong class="color-primary">2</strong>
          Khóa học
        </div>
        <div>
          <strong class="color-primary">2.254</strong>
          Học viên
        </div>
      </div>
    </div>

    <div class="mt-4 teacher-bottom">
      <h4 class="mb-3">Tiểu sử</h4>
      <p>- Bạn đang mong muốn xây dựng một Hệ thống Kinh doanh Online Bài Bản cho riêng mình mà vẫn chưa tìm được hướng đi rõ ràng từ việc xác định sản phẩm kinh doanh - mô hình kinh doanh phù hợp, cách để liên hệ nhà cung cấp để đàm phán nhập hàng, cách nghiên cứu khách hàng, đối thủ, quảng cáo và tối ưu...... ?</p>
      <p>- Bạn đã có kinh nghiệm Kinh doanh online, và đang mong muốn mở rộng Hệ Thống Online Đa Kênh ngoài kênh truyền thống sang Facebook, Instagram, Zalo, Youtube, Email Marketing, Website, SMS...?</p>
      <div class="text-center mt-4 mb-3">
        <a class="btn-load-more">Xem thêm</a>
      </div>
    </div>
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";

export default {
  components: {
      IconStar,
      IconStarO
  },

  props: {
    teacher: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-teacher-info.scss";
</style>