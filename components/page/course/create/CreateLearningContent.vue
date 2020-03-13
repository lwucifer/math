<template>
  <div>
    <!-- <create-action /> -->
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left">
              <h2 class="cc-box__title heading-6">Bài giảng đại số lớp 10</h2>
              <button class="cc-box__btn cc-box__btn-edit">
                <IconEditAlt class="icon" />
              </button>
            </div>

            <div class="cc-box__head-right">
              <a @click="handleAddLesson($event)" href>Thêm nội dung bài giảng</a>
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <app-button
              size="sm"
              outline
              square
              class="font-weight-semi-bold clc-btn-add-docs"
              v-if="isShowButtonAdd"
            >
              <IconPlus class="icon"></IconPlus>Thêm tài liệu giảng dạy
            </app-button>

            <AddContent v-if="isShowFormAdd" />

            <CourseContentDetail />

          </div>
        </div>
      </div>
    </div>

    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left">
              <h2 class="cc-box__title heading-6">Bài giảng đại số lớp 10</h2>
              <button class="cc-box__btn cc-box__btn-edit">
                <IconEditAlt class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <h3 class="heading-6 mb-2 mt-3">Bài giảng đại số lớp 10</h3>
            <div class="cc-box__bg-gray px-4 pt-3 pb-4">
              <span>Chọn loại bài giảng</span>

              <app-divider class="mt-3 mb-4" />

              <div class="clc-type-tabs">
                <a
                  href
                  class="clc-type-tab-item"
                  :class="{ active: tabType === 'video' }"
                  @click.prevent="changeTabType('video')"
                >
                  <span class="clc-type-tab-item__icon">
                    <IconVideo class="icon" />
                  </span>
                  <span class="clc-type-tab-item__text">Video</span>
                </a>

                <a
                  href
                  class="clc-type-tab-item"
                  :class="{ active: tabType === 'document' }"
                  @click.prevent="changeTabType('document')"
                >
                  <span class="clc-type-tab-item__icon">
                    <IconFileBlank class="icon" />
                  </span>
                  <span class="clc-type-tab-item__text">Văn bản</span>
                </a>
              </div>

              <app-divider class="my-4" />

              <div class="clc-type-tab-panel" v-if="tabType === 'video'">
                <div class="cc-tabs">
                  <a
                    href
                    class="cc-tab-item"
                    :class="{ active: tabVideo === 'upload' }"
                    @click.prevent="changeTabVideo('upload')"
                    >Upload bài giảng</a
                  >

                  <a
                    href
                    class="cc-tab-item"
                    :class="{ active: tabVideo === 'choose' }"
                    @click.prevent="changeTabVideo('choose')"
                    >Chọn từ kho học liệu</a
                  >
                </div>

                <div class="cc-tab-panel" v-if="tabVideo === 'upload'">
                  <app-upload class="clc-upload-video">
                    <div slot="hint" class="mt-2 caption">
                      <b class="text-gray">Lưu ý:</b>
                      <span class="text-sub">{{
                        `Chỉ upload file <3GB, định dạng .mp4`
                      }}</span>
                    </div>
                  </app-upload>
                </div>

                <div class="cc-tab-panel" v-if="tabVideo === 'choose'">
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
                            <a
                              href
                              class="clc-table-action clc-table-action-delete"
                            >
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
                            <a
                              href
                              class="clc-table-action clc-table-action-delete"
                            >
                              <IconTrashAlt class="icon" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="clc-type-tab-panel" v-if="tabType === 'document'">
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
                            <a
                              href
                              class="clc-table-action clc-table-action-delete"
                            >
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
                            <a
                              href
                              class="clc-table-action clc-table-action-delete"
                            >
                              <IconTrashAlt class="icon" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                <app-button
                  class="clc-btn font-weight-semi-bold"
                  size="sm"
                  square
                  >Thêm nội dung</app-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left">
              <h2 class="cc-box__title heading-6">Bài giảng đại số lớp 10</h2>
            </div>

            <div class="cc-box__head-right">
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body py-4">
            <div class="clc-video">
              <div class="clc-video__image">
                <img src="https://picsum.photos/160/90" alt />
              </div>
              <div class="clc-video__right">
                <h4 class="clc-video__name heading-6 mb-3">
                  Tên video: Bài giảng đại số lớp 10a
                </h4>
                <div class="clc-video__time text-gray mb-3">6:30</div>
                <div class="clc-video__actions">
                  <a href class="clc-video__btn-edit text-primary mr-5">
                    <IconEditAlt class="icon" />Sửa nội dung
                  </a>
                  <a href class="clc-video__btn-delete text-secondary">
                    <IconTrashAlt class="icon" />Xoá nội dung
                  </a>
                </div>
              </div>
            </div>

            <app-divider class="my-4" />

            <app-button
              size="sm"
              outline
              square
              class="font-weight-semi-bold clc-btn-add-docs"
            >
              <IconPlus class="icon"></IconPlus>Thêm tài liệu giảng dạy
            </app-button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left">
              <h2 class="cc-box__title heading-6">Bài giảng đại số lớp 10</h2>
            </div>

            <div class="cc-box__head-right">
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body py-4">
            <div class="clc-video">
              <div class="clc-video__image">
                <img src="https://picsum.photos/160/90" alt />
              </div>
              <div class="clc-video__right">
                <h4 class="clc-video__name heading-6 mb-3">
                  Tên video: Bài giảng đại số lớp 10a
                </h4>
                <div class="clc-video__time text-gray mb-3">6:30</div>
                <div class="clc-video__actions">
                  <a href class="clc-video__btn-edit text-primary mr-5">
                    <IconEditAlt class="icon" />Sửa nội dung
                  </a>
                  <a href class="clc-video__btn-delete text-secondary">
                    <IconTrashAlt class="icon" />Xoá nội dung
                  </a>
                </div>
              </div>
            </div>

            <app-divider class="my-4" />

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
                          <a
                            href
                            class="clc-table-action clc-table-action-delete"
                          >
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
                          <a
                            href
                            class="clc-table-action clc-table-action-delete"
                          >
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
                <app-button
                  class="clc-btn font-weight-semi-bold"
                  size="sm"
                  square
                  >Thêm nội dung</app-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left">
              <h2 class="cc-box__title heading-6">Bài giảng đại số lớp 10</h2>
            </div>

            <div class="cc-box__head-right">
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body py-4">
            <div class="clc-video">
              <div class="clc-video__image">
                <img src="https://picsum.photos/160/90" alt />
              </div>
              <div class="clc-video__right">
                <h4 class="clc-video__name heading-6 mb-3">
                  Tên video: Bài giảng đại số lớp 10a
                </h4>
                <div class="clc-video__time text-gray mb-3">6:30</div>
                <div class="clc-video__actions">
                  <a href class="clc-video__btn-edit text-primary mr-5">
                    <IconEditAlt class="icon" />Sửa nội dung
                  </a>
                  <a href class="clc-video__btn-delete text-secondary">
                    <IconTrashAlt class="icon" />Xoá nội dung
                  </a>
                </div>
              </div>
            </div>

            <app-divider class="my-4" />

            <div class="mb-3">Tài liệu giảng dạy</div>

            <div
              class="clc-choosen-doc-item d-flex align-items-center justify-content-between mb-3"
            >
              <span class="text-sub d-flex align-items-center">
                <IconFileBlank class="icon body-1 mr-2" />tailieudaisolop10.docx
                (25.6kB)
              </span>

              <a href>
                <IconTrashAlt class="icon subheading fill-secondary" />
              </a>
            </div>

            <app-divider class="my-4" />

            <app-button
              size="sm"
              outline
              square
              class="font-weight-semi-bold clc-btn-add-docs"
            >
              <IconPlus class="icon"></IconPlus>Thêm tài liệu giảng dạy
            </app-button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getBase64 } from "~/utils/common";

import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconVideo = () => import("~/assets/svg/design-icons/video.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import CreateAction from "~/components/page/course/create/CreateAction";
import AddContent from "~/components/page/course/create/AddContent";
import CourseContentDetail from "~/components/page/course/create/CourseContentDetail";

export default {
  components: {
    IconCamera,
    IconClose,
    IconEditAlt,
    IconAngleDown,
    IconPlus,
    IconVideo,
    IconFileBlank,
    IconTrashAlt,
    CreateAction,
    AddContent,
    CourseContentDetail
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null,
      tabType: "video",
      tabVideo: "upload",
      tabDocument: "typing",
      tabAddDocument: "upload",
      isShowButtonAdd: false,
      isShowFormAdd: false
    };
  },

  methods: {
    handleUploadChange(event) {
      this.avatar = Array.from(event.target.files);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
    },

    removeAvatar() {
      this.avatar = [];
    },

    changeTabType(type) {
      this.tabType = type;
    },

    changeTabVideo(type) {
      this.tabVideo = type;
    },

    changeTabDocument(type) {
      this.tabDocument = type;
    },

    changeTabAddDocument(type) {
      this.tabAddDocument = type;
    },

    handleAddLesson(e) {
      this.isShowButtonAdd = false;
      this.isShowFormAdd = !this.isShowFormAdd;
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
