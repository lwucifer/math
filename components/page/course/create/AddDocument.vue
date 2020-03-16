<template>
  <div class="cc-box__bg-gray px-4 pt-3 pb-4">
    <div class="d-flex justify-content-between">
      <span>Thêm tài liệu bài giảng</span>
      <a href>
        <IconClose class="icon fill-gray" />
      </a>
    </div>

    <app-divider class="mt-3 mb-4" />

    <div class="cc-tabs">
      <a
        href
        class="cc-tab-item"
        :class="{ active: tabAddDocument === 'upload' }"
        @click.prevent="changeTabAddDocument('upload')"
        >Upload tài liệu</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabAddDocument === 'choose' }"
        @click.prevent="changeTabAddDocument('choose')"
        >Chọn từ kho học liệu</a
      >
    </div>

    <div class="cc-tab-panel" v-if="tabAddDocument === 'upload'">
      <app-upload class="clc-upload-video">
        <div slot="hint" class="mt-2 caption">
          <b class="text-gray">Lưu ý:</b>
          <span class="text-sub">{{
            `Upload tài liệu bổ trợ cho bài giảng của bạn, dung lượng không quá 1GB cho 1 file`
          }}</span>
        </div>
      </app-upload>
    </div>

    <div class="cc-tab-panel" v-if="tabAddDocument === 'choose'">
      <div class="d-flex justify-content-end">
        <app-input
          placeholder="Nhập để tìm kiếm..."
          style="width: 260px"
        ></app-input>
      </div>

      <div class="clc-table-wrapper">
        <table class="clc-table">
          <thead>
            <tr>
              <th>Tên file</th>
              <th>Loại</th>
              <th>Ngày tháng</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tên tài liệu</td>
              <td>Tài liệu</td>
              <td>15/10/2019</td>
              <td>
                <a href class="clc-table-action mr-4">Chọn</a>
                <a href class="clc-table-action clc-table-action-delete">
                  <IconTrashAlt class="icon" />
                </a>
              </td>
            </tr>
            <tr>
              <td>Tên tài liệu</td>
              <td>Tài liệu</td>
              <td>15/10/2019</td>
              <td>
                <a href class="clc-table-action mr-4">Chọn</a>
                <a href class="clc-table-action clc-table-action-delete">
                  <IconTrashAlt class="icon" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <app-button
        class="clc-btn font-weight-semi-bold mr-4"
        size="sm"
        color="disabled"
        square
        >Huỷ bỏ</app-button
      >
      <app-button class="clc-btn font-weight-semi-bold" size="sm" square
        >Thêm nội dung</app-button
      >
    </div>
  </div>
</template>

<script>
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  components: {
    IconClose
  },

  data() {
    return {
      tabAddDocument: "upload"
    };
  },

  methods: {
    changeTabAddDocument(type) {
      this.tabAddDocument = type;
    }
  }
};
</script>
