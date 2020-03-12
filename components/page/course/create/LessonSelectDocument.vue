<template>
  <div class="clc-type-tab-panel">
    <div class="cc-tabs">
      <a
        href
        class="cc-tab-item"
        :class="{ active: tabDocument === 'typing' }"
        @click.prevent="changeTabDocument('typing')"
        >Soạn văn bản</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabDocument === 'upload' }"
        @click.prevent="changeTabDocument('upload')"
        >Upload bài giảng</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabDocument === 'choose' }"
        @click.prevent="changeTabDocument('choose')"
        >Chọn từ kho học liệu</a
      >
    </div>

    <div class="cc-tab-panel" v-if="tabDocument === 'typing'">
      <app-editor class="bg-white" />
    </div>

    <div class="cc-tab-panel" v-if="tabDocument === 'upload'">
      <app-upload class="clc-upload-video">
        <div slot="hint" class="mt-2 caption">
          <b class="text-gray">Lưu ý:</b>
          <span class="text-sub">{{ `...` }}</span>
        </div>
      </app-upload>
    </div>

    <div class="cc-tab-panel" v-if="tabDocument === 'choose'">
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
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");

export default {
  components: {
    IconTrashAlt
  },

  data() {
    return {
      tabDocument: "typing"
    };
  },

  methods: {
    changeTabDocument(type) {
      this.tabDocument = type;
    },

    changeTabAddDocument(type) {
      this.tabAddDocument = type;
    }
  }
};
</script>
