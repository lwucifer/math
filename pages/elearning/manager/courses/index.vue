<template>
  <div class="container elearning-courses">
    <breadcrumb />

    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <sub-block-section title="Bài giảng và khóa học">
          <template v-slot:content>
            <div class="elearning-manager__tab">
              <div class="nav">
                <a @click="tab = 'APPROVED'" :class="tab == 'APPROVED' ? 'active' : ''">Đã đăng</a>
                <a @click="tab = 'PENDING'" :class="tab == 'PENDING' ? 'active' : ''">Đang soạn</a>
                <a
                  @click="tab = 'WAITING_FOR_APPROVE'"
                  :class="tab == 'WAITING_FOR_APPROVE' ? 'active' : ''"
                >Chờ duyệt</a>
                <a @click="tab = 'REJECTED'" :class="tab == 'REJECTED' ? 'active' : ''">Bị từ chối</a>
                <a @click="tab = null" :class="tab == null ? 'active' : ''">Danh sách ẩn</a>
              </div>
              <n-link
                :to="'/elearning/manager/courses/create'"
                class="btn btn--size-sm btn--color-primary btn--square btn-right"
              >
                <IconPlusCircle class="fill-white mr-2" />
                <span class="color-white">Tạo bài giảng - khóa học</span>
              </n-link>
            </div>
            <CoursesTable :tab="tab" />
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import CoursesTable from "~/components/page/elearning/course/CoursesTable";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "ManageCourse",

  middleware: ["teacher-role"],
  
  components: {
    ElearningManagerSide,
    CoursesTable,
    IconPlusCircle
  },

  data() {
    return {
      tab: "APPROVED",
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
  },

  methods: {},
};
</script>
