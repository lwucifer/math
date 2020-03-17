<template>
  <div class="cc-tab-panel">
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
</template>

<script>
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import AddDocumentFile from "~/components/page/course/create/AddDocumentFile";

export default {
  components: {
    IconClose,
    IconTrashAlt,
    AddDocumentFile
  },

  data() {
    return {
      payload: {
        doc: "",
        lesson_id: "",
        name: "",
        format: ""
      }
    };
  },

  methods: {
    handleSelectFile(file) {
      this.payload.doc = file;
    }
  }
};
</script>
