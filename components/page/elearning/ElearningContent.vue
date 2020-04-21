<template>
  <section
    class="box elearning-view__content scroll-target mb-4"
    id="course-content"
  >
    <h5>Nội dung {{ title }}</h5>
    <div class="row flex-wrap info">
      <div class="col-auto">
        Trình độ:
        <strong class="color-primary">{{ get(program, "level", "") }}</strong>
      </div>
      <div class="col-auto">
        Môn học:
        <strong class="color-primary">{{ get(program, "subject", "") }}</strong>
      </div>
      <div class="col-auto">
        Số bài giảng:
        <strong class="color-primary">chưa ghép</strong>
      </div>
      <div class="col-auto">
        Thời lượng:
        <strong class="color-primary">{{
          get(program, "duration", "--")
        }}</strong>
      </div>
    </div>

    <div class="evlc-item mb-3">
      <div class="evlc-item__head">
        <div class="evlc-item__head-left mr-4">
          Bài giảng đại số lớp 10
        </div>
        <div class="evlc-item__head-right ml-auto">
          <button class="evlc-item__btn evlc-item__btn-collapse active">
            <IconAngleDown class="icon" />
          </button>
        </div>
      </div>

      <div class="evlc-item__body bg-input-gray">
        <div class="d-flex align-items-center text-error py-3">
          <IconFileAlt class="icon subheading mr-2" />Bài tập số 1
        </div>
        <app-divider class="my-0" />
        <div class="d-flex align-items-center text-error py-3">
          <IconFileAlt class="icon subheading mr-2" />Bài tập số 2
        </div>
      </div>
    </div>

    <div class="evlc-item mb-3">
      <div class="evlc-item__head">
        <div class="evlc-item__head-left mr-4">
          <b>Chương 1:</b> Tạo và tối ưu tài khoản Instagram trên máy tính
        </div>
        <div class="evlc-item__head-right d-flex align-items-center ml-auto">
          <span class="mr-3">3 Bài</span>
          <button class="evlc-item__btn evlc-item__btn-collapse active">
            <IconAngleDown class="icon" />
          </button>
        </div>
      </div>

      <div class="evlc-item__body bg-input-gray">
        <div class="d-flex align-items-center py-3">
          <div class="d-flex align-items-center mr-4">
            <IconPlayCircle class="icon subheading mr-2 text-primary" />Bài 1:
            Tạo và tối ưu tài khoản instagran trên máy tính
          </div>
          <div class="ml-auto">10:15</div>
        </div>
        <app-divider class="my-0" />
        <div class="d-flex align-items-center py-3">
          <div class="d-flex align-items-center mr-4">
            <IconPlayCircle class="icon subheading mr-2 text-primary" />Bài 2:
            Tạo và tối ưu tài khoản instagran trên máy tính
          </div>
          <div class="ml-auto">10:15</div>
        </div>
        <app-divider class="my-0" />
        <div class="d-flex align-items-center py-3">
          <div class="d-flex align-items-center mr-4">
            <IconPlayCircle class="icon subheading mr-2 text-primary" />Bài 3:
            Tạo và tối ưu tài khoản instagran trên máy tính
          </div>
          <div class="ml-auto">10:15</div>
        </div>
        <app-divider class="my-0" />
      </div>
    </div>

    <div class="evlc-item mb-3">
      <div class="evlc-item__head">
        <div class="evlc-item__head-left mr-4">
          <b>Chương 2:</b> Tạo và tối ưu tài khoản Instagram trên máy tính
        </div>
        <div class="evlc-item__head-right d-flex align-items-center ml-auto">
          <span class="mr-3">3 Bài</span>
          <button class="evlc-item__btn evlc-item__btn-collapse">
            <IconAngleDown class="icon" />
          </button>
        </div>
      </div>
    </div>

    <div class="download-item">
      <IconBooks class="fill-primary mr-3" />Tài liệu đính kèm
      <a
        href
        class="ml-auto color-primary d-flex-center font-weight-bold text-decoration-none"
      >
        Tải về
        <IconDownload class="ml-2" />
      </a>
    </div>
  </section>
</template>

<script>
const IconFileAlt = () =>
  import("~/assets/svg/design-icons/file-alt.svg?inline");
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
const IconPlayCircle = () =>
  import("~/assets/svg/design-icons/play-circle.svg?inline");
import { get } from "lodash";

export default {
  components: {
    IconFileAlt,
    IconDownload,
    IconBooks,
    IconAngleDown,
    IconPlayCircle,
  },
  props: {
    title: {},
    program: {},
  },
  methods: { get },
};
</script>
