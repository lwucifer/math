<template>
  <div class="elearning-lesson__main-content">
    <!-- <div class="mb-4">
                  <strong>Phù hợp với</strong>
                  <p>
                    Bất cứ ai muốn trở thành một Vlogger, tìm hiểu thêm về ngành
                    làm vlog.
                  </p>
                </div> -->
    <div class="mb-4">
      <strong>Mô tả</strong>
      <span v-html="get(info, 'description', '')"></span>
      <!-- <p>
                    "Trong khoá học này, người xem sẽ có cái nhìn rõ ràng hơn về
                    nghề ""vlogger"", làm thế nào để trở thành một vlogger, làm
                    thế nào để xây dựng channel thành công, làm thế nào để kiếm
                    được tiền từ nghề và thật nhiều động lực, quyết tâm để có
                    thể xây dựng nên channel của riêng mình. Tự tin là khoá học
                    đầu tiên về Vlog, khoá học các bạn thực sự cần và chính là
                    khoá học bạn đang tìm kiếm. Trong khoá học, các bạn sẽ không
                    phải ""HỌC"", mà tất cả nội dung sẽ được giảng viên chia sẻ
                    dưới hình thức VLOG, mang đến cho các bạn sự gần gũi, thân
                    thuộc mà lại vô cùng hiệu quả. "
                  </p> -->
    </div>
    <!-- <div>
                  <strong>Yêu cầu</strong>
                  <p>
                    - Yêu cầu của khóa học.
                    <br />- Thời gian. <br />- Đồ ăn, uống (để "tận hưởng" khoá
                    học). <br />- Máy tính (để nghiên cứu, áp dụng). <br />- Máy
                    ảnh hoặc điện thoại (thực hành).
                  </p>
                </div> -->
  </div>
</template>

<script>
import { get } from "lodash";

export default {
  props: {
    info: {},
  },
  methods: { get },
};
</script>
