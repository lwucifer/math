<template>
  <div>
    <create-action type="add_contents" />

    <!-- STEP 1 -->
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Nội dung học tập
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <!-- <app-input
                ref="inputCourseName"
                class="cc-box__input-title mb-0 w-100"
                size="sm"
                type="text"
              /> -->
              <h2 class="cc-box__title heading-6">
                {{ get(general, "name", "") }}
              </h2>

              <!-- <template v-if="isEditCourseName">
                <button class="cc-box__btn mr-2 text-success">
                  <IconCheck class="icon" />
                </button>
                <button
                  class="cc-box__btn text-error"
                  @click="cancelEditCourseName"
                >
                  <IconTimes class="icon" />
                </button>
              </template> -->

              <!-- <button
                v-else
                class="cc-box__btn cc-box__btn-edit"
                @click="editCourseName"
              >
                <IconEditAlt class="icon" />
              </button> -->
            </div>

            <div class="cc-box__head-right">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="handleShowAddChapter"
              >
                <IconPlusCircle class="icon subheading" />&nbsp;Thêm chương
              </a>
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <ListChapter />
            <CreateChapter
              v-if="isShowFormAddChapter"
              @handleCancelAddChapter="handleCancelAddChapter"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- END STEP 1 -->

    <!-- STEP 2 -->
    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Nội dung học tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <app-input
                v-if="isEditCourseName"
                v-model="courseNameModel"
                ref="inputCourseName"
                class="cc-box__input-title mb-0 w-100"
                size="sm"
                type="text"
              />
              <h2 v-else class="cc-box__title heading-6">{{ get(general, "name", "") }}</h2>

              <template v-if="isEditCourseName">
                <button class="cc-box__btn mr-2 text-success">
                  <IconCheck class="icon" />
                </button>
                <button class="cc-box__btn text-error" @click="cancelEditCourseName">
                  <IconTimes class="icon" />
                </button>
              </template>

              <button v-else class="cc-box__btn cc-box__btn-edit" @click="editCourseName">
                <IconEditAlt class="icon" />
              </button>
            </div>

            <div class="cc-box__head-right" v-if="isShowButtonAddLesson">
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <div class="cc-box__bg-gray px-4 pt-3 pb-4">
              <h3 class="heading-6 mb-2 mt-3">Chương 1</h3>
              <app-input :counter="80" placeholder="Tên chương" />

              <div class="d-flex justify-content-end mt-4">
                <app-button
                  class="clc-btn font-weight-semi-bold mr-4"
                  size="sm"
                  color="disabled"
                  square
                >Huỷ bỏ</app-button>
                <app-button class="clc-btn font-weight-semi-bold" size="sm" square>Tạo chương</app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END STEP 2 -->

    <!-- STEP 3 -->
    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Nội dung học tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <app-input
                v-if="isEditCourseName"
                v-model="courseNameModel"
                ref="inputCourseName"
                class="cc-box__input-title mb-0 w-100"
                size="sm"
                type="text"
              />
              <h2 v-else class="cc-box__title heading-6">{{ get(general, "name", "") }}</h2>

              <template v-if="isEditCourseName">
                <button class="cc-box__btn mr-2 text-success">
                  <IconCheck class="icon" />
                </button>
                <button class="cc-box__btn text-error" @click="cancelEditCourseName">
                  <IconTimes class="icon" />
                </button>
              </template>

              <button v-else class="cc-box__btn cc-box__btn-edit" @click="editCourseName">
                <IconEditAlt class="icon" />
              </button>
            </div>

            <div class="cc-box__head-right" v-if="isShowButtonAddLesson">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="addChaper"
              >
                <IconPlusCircle class="icon subheading" />&nbsp;Thêm chương
              </a>
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 1:
                  <span class="font-weight-normal">Giới thiệu về toán lớp 11</span>
                </h3>
                <a href class="ce-item__action edit mr-3">
                  <IconEditAlt class="icon d-block subheading fill-primary" />
                </a>
                <a href class="ce-item__action delete mr-3">
                  <IconTrashAlt class="icon d-block subheading fill-secondary" />
                </a>
              </div>

              <div class="ce-item__right">
                <a href>Thêm bài giảng</a>
              </div>
            </div>

            <app-divider class="my-0" />

            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 2:
                  <span class="font-weight-normal">Chương 2 giảng dạy</span>
                </h3>
                <a href class="ce-item__action edit mr-3">
                  <IconEditAlt class="icon d-block subheading fill-primary" />
                </a>
                <a href class="ce-item__action delete mr-3">
                  <IconTrashAlt class="icon d-block subheading fill-secondary" />
                </a>
              </div>

              <div class="ce-item__right">
                <a href>Thêm bài giảng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END STEP 3 -->

    <!-- STEP 4 -->
    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Nội dung học tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <app-input
                v-if="isEditCourseName"
                v-model="courseNameModel"
                ref="inputCourseName"
                class="cc-box__input-title mb-0 w-100"
                size="sm"
                type="text"
              />
              <h2 v-else class="cc-box__title heading-6">{{ get(general, "name", "") }}</h2>

              <template v-if="isEditCourseName">
                <button class="cc-box__btn mr-2 text-success">
                  <IconCheck class="icon" />
                </button>
                <button class="cc-box__btn text-error" @click="cancelEditCourseName">
                  <IconTimes class="icon" />
                </button>
              </template>

              <button v-else class="cc-box__btn cc-box__btn-edit" @click="editCourseName">
                <IconEditAlt class="icon" />
              </button>
            </div>

            <div class="cc-box__head-right" v-if="isShowButtonAddLesson">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="addChaper"
              >
                <IconPlusCircle class="icon subheading" />&nbsp;Thêm chương
              </a>
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 1:
                  <span class="font-weight-normal">Giới thiệu về toán lớp 11</span>
                </h3>
              </div>
            </div>

            <div class="cc-box__bg-gray cc-box__nested px-4 pt-3 pb-4">
              <h3 class="heading-6 mb-2 mt-3">Tên bài giảng</h3>
              <app-input :counter="60" placeholder="Tên bài giảng" />

              <div class="d-flex justify-content-end mt-4">
                <app-button
                  class="clc-btn font-weight-semi-bold mr-4"
                  size="sm"
                  color="disabled"
                  square
                >Huỷ bỏ</app-button>
                <app-button class="clc-btn font-weight-semi-bold" size="sm" square>Thêm bài giảng</app-button>
              </div>
            </div>

            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 2:
                  <span class="font-weight-normal">Chương 2 giảng dạy</span>
                </h3>
                <a href class="ce-item__action edit mr-3">
                  <IconEditAlt class="icon d-block subheading fill-primary" />
                </a>
                <a href class="ce-item__action delete mr-3">
                  <IconTrashAlt class="icon d-block subheading fill-secondary" />
                </a>
              </div>

              <div class="ce-item__right">
                <a href>Thêm bài giảng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END STEP 4 -->

    <!-- STEP 5 -->
    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Nội dung học tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <app-input
                v-if="isEditCourseName"
                v-model="courseNameModel"
                ref="inputCourseName"
                class="cc-box__input-title mb-0 w-100"
                size="sm"
                type="text"
              />
              <h2 v-else class="cc-box__title heading-6">{{ get(general, "name", "") }}</h2>

              <template v-if="isEditCourseName">
                <button class="cc-box__btn mr-2 text-success">
                  <IconCheck class="icon" />
                </button>
                <button class="cc-box__btn text-error" @click="cancelEditCourseName">
                  <IconTimes class="icon" />
                </button>
              </template>

              <button v-else class="cc-box__btn cc-box__btn-edit" @click="editCourseName">
                <IconEditAlt class="icon" />
              </button>
            </div>

            <div class="cc-box__head-right" v-if="isShowButtonAddLesson">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="addChaper"
              >
                <IconPlusCircle class="icon subheading" />&nbsp;Thêm chương
              </a>
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 1:
                  <span class="font-weight-normal">Giới thiệu về toán lớp 11</span>
                </h3>
              </div>

              <a href>Thêm bài giảng</a>
            </div>

            <div class="cc-box__bg-gray cc-box__nested px-4 pt-3 pb-4">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="heading-6 mb-2 mt-3">
                  Bài 1:
                  <span class="font-weight-normal">Bài học số 1</span>
                </h4>

                <div>
                  <a href class="text-decoration-none d-inline-flex">
                    <IconPlusCircle class="icon subheading" />&nbsp;Thêm nội dung bài giảng
                  </a>

                  <button class="cc-box__btn cc-box__btn-collapse d-inline-flex ml-3">
                    <IconAngleDown class="icon" />
                  </button>
                </div>
              </div>

              <app-divider class="mt-0 mb-3" />

              <app-button size="sm" outline square class="font-weight-semi-bold clc-btn-add-docs">
                <IconPlus class="icon"></IconPlus>Thêm tài liệu giảng dạy
              </app-button>
            </div>

            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 2:
                  <span class="font-weight-normal">Chương 2 giảng dạy</span>
                </h3>
                <a href class="ce-item__action edit mr-3">
                  <IconEditAlt class="icon d-block subheading fill-primary" />
                </a>
                <a href class="ce-item__action delete mr-3">
                  <IconTrashAlt class="icon d-block subheading fill-secondary" />
                </a>
              </div>

              <div class="ce-item__right">
                <a href>Thêm bài giảng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END STEP 5 -->

    <!-- STEP 6 -->
    <!-- <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Nội dung học tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left flex-grow mr-4">
              <app-input
                v-if="isEditCourseName"
                v-model="courseNameModel"
                ref="inputCourseName"
                class="cc-box__input-title mb-0 w-100"
                size="sm"
                type="text"
              />
              <h2 v-else class="cc-box__title heading-6">{{ get(general, "name", "") }}</h2>

              <template v-if="isEditCourseName">
                <button class="cc-box__btn mr-2 text-success">
                  <IconCheck class="icon" />
                </button>
                <button class="cc-box__btn text-error" @click="cancelEditCourseName">
                  <IconTimes class="icon" />
                </button>
              </template>

              <button v-else class="cc-box__btn cc-box__btn-edit" @click="editCourseName">
                <IconEditAlt class="icon" />
              </button>
            </div>

            <div class="cc-box__head-right" v-if="isShowButtonAddLesson">
              <a
                class="text-decoration-none d-inline-flex align-items-center"
                href
                @click.prevent="addChaper"
              >
                <IconPlusCircle class="icon subheading" />&nbsp;Thêm chương
              </a>
              <button class="cc-box__btn cc-box__btn-collapse">
                <IconAngleDown class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 1:
                  <span class="font-weight-normal">Giới thiệu về toán lớp 11</span>
                </h3>
              </div>

              <a href>Thêm bài giảng</a>
            </div>

            <h4 class="cc-box__nested heading-6 mb-2 mt-3">
              Bài 1:
              <span class="font-weight-normal">Bài học số 1</span>
            </h4>

            <div class="cc-box__bg-gray cc-box__nested px-4 pt-3 pb-4">
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
                  >Upload bài giảng</a>

                  <a
                    href
                    class="cc-tab-item"
                    :class="{ active: tabVideo === 'choose' }"
                    @click.prevent="changeTabVideo('choose')"
                  >Chọn từ kho học liệu</a>
                </div>

                <div class="cc-tab-panel" v-if="tabVideo === 'upload'">
                  <app-upload class="clc-upload-video">
                    <div slot="hint" class="mt-2 caption">
                      <b class="text-gray">Lưu ý:</b>
                      <span class="text-sub">
                        {{
                        `Chỉ upload file <3GB, định dạng .mp4`
                        }}
                      </span>
                    </div>
                  </app-upload>
                </div>

                <div class="cc-tab-panel" v-if="tabVideo === 'choose'">
                  <div class="d-flex justify-content-end">
                    <app-input placeholder="Nhập để tìm kiếm..." style="width: 260px"></app-input>
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
              </div>

              <div class="clc-type-tab-panel" v-if="tabType === 'document'">
                <div class="cc-tabs">
                  <a
                    href
                    class="cc-tab-item"
                    :class="{ active: tabDocument === 'typing' }"
                    @click.prevent="changeTabDocument('typing')"
                  >Soạn văn bản</a>

                  <a
                    href
                    class="cc-tab-item"
                    :class="{ active: tabDocument === 'upload' }"
                    @click.prevent="changeTabDocument('upload')"
                  >Upload bài giảng</a>

                  <a
                    href
                    class="cc-tab-item"
                    :class="{ active: tabDocument === 'choose' }"
                    @click.prevent="changeTabDocument('choose')"
                  >Chọn từ kho học liệu</a>
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
                    <app-input placeholder="Nhập để tìm kiếm..." style="width: 260px"></app-input>
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

              <div class="d-flex justify-content-end mt-4">
                <app-button
                  class="clc-btn font-weight-semi-bold mr-4"
                  size="sm"
                  color="disabled"
                  square
                >Huỷ bỏ</app-button>
                <app-button class="clc-btn font-weight-semi-bold" size="sm" square>Thêm nội dung</app-button>
              </div>
            </div>

            <div class="ce-item d-flex align-items-center justify-content-between">
              <div class="ce-item__left d-flex align-items-center">
                <h3 class="body-2 mr-3">
                  Chương 2:
                  <span class="font-weight-normal">Chương 2 giảng dạy</span>
                </h3>
                <a href class="ce-item__action edit mr-3">
                  <IconEditAlt class="icon d-block subheading fill-primary" />
                </a>
                <a href class="ce-item__action delete mr-3">
                  <IconTrashAlt class="icon d-block subheading fill-secondary" />
                </a>
              </div>

              <div class="ce-item__right">
                <a href>Thêm bài giảng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END STEP 6 -->
  </div>
</template>

<script>
import { getBase64 } from "~/utils/common";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconVideo = () => import("~/assets/svg/design-icons/video.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
const IconCheck = () => import("~/assets/svg/design-icons/check.svg?inline");
const IconTimes = () => import("~/assets/svg/design-icons/times.svg?inline");
import CreateAction from "~/components/page/course/create/CreateAction";
import AddContent from "~/components/page/course/create/AddContent";
import LessonDetail from "~/components/page/course/create/LessonDetail";
import { mapState } from "vuex";
import { useEffect, getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import CreateChapter from "~/components/page/course/create/course/CreateChapter";
import ListChapter from "~/components/page/course/create/course/ListChapter";

export default {
  components: {
    IconCamera,
    IconClose,
    IconEditAlt,
    IconAngleDown,
    IconPlus,
    IconPlusCircle,
    IconVideo,
    IconFileBlank,
    IconTrashAlt,
    IconCheck,
    IconTimes,
    CreateAction,
    AddContent,
    LessonDetail,
    CreateChapter,
    ListChapter
  },

  data() {
    return {
      isShowFormAddChapter: false
    };
  },

  created() {
    //
  },

  computed: {
    ...mapState("elearning/creating/creating-lesson", {
      lessons: "lessons"
    }),
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  methods: {
    get,

    handleShowAddChapter() {
      this.isShowFormAddChapter = true;
    },

    handleCancelAddChapter() {
      this.isShowFormAddChapter = false;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-learning-content.scss";
</style>
