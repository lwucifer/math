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
            <td>Video bài giảng.mp4</td>
            <td>Video</td>
            <td>15/10/2019</td>
            <td>
              <a href class="clc-table-action mr-4">Chọn</a>
              <a href class="clc-table-action clc-table-action-delete">
                <IconTrashAlt class="icon" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Video bài giảng.mp4</td>
            <td>Video</td>
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
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");

export default {
  components: {
    IconTrashAlt
  }
};
</script>
