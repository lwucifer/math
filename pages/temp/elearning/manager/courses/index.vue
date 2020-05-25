<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="pl-4 pr-4">
            <h5 class="color-primary mb-3">Bài giảng và khóa học</h5>
            <div class="elearning-manager__tab">
              <a @click="tab = 1" :class="tab == 1 ? 'active' : ''">Đã đăng</a>
              <a @click="tab = 2" :class="tab == 2 ? 'active' : ''">Đang soạn</a>
              <a @click="tab = 3" :class="tab == 3 ? 'active' : ''">Chờ duyệt</a>
              <a @click="tab = 4" :class="tab == 4 ? 'active' : ''">Bị từ chối</a>
            </div>
            <div class="elearning-manager__serch">
              <app-button rounded size="sm" class="mr-4" normal>
                <IconFilter />Lọc kết quả
              </app-button>
              <app-checkbox label="Miễn phí" />
              <app-select :options="opts1" v-model="opt1" size="sm" />
              <app-select :options="opts2" v-model="opt2" size="sm" />
              <app-input class="mb-0" size="sm" placeholder="Nhập để tìm kiếm...">
                <a class="d-flex" slot="unit">
                  <IconSearch width="17" height="17" />
                </a>
              </app-input>
            </div>
            <app-button color="secondary" square size="sm" normal class="mb-4">
              <IconTrashAlt height="15" width="15" class="fill-white mr-2" />Xoá khỏi danh sách
            </app-button>
          </div>

          <app-table
            :heads="heads"
            :pagination="pagination"
            @pagechange="onPageChange"
            @sort="sort"
            :data="list"
            :sortBy="list"
            @selectAll="selectAll"
          >
            <tr v-for="(item, index) in list" :key="index">
              <td class="pr-0">
                <label
                  class="table-checkbox"
                  :class="ids.includes(item.id) ? 'border-primary' : ''"
                >
                  <input type="checkbox" v-model="ids" :value="item.id" @change="changeSelect" />
                  <IconTick v-if="ids.includes(item.id)" height="9" width="9" />
                </label>
              </td>
              <td>
                <div class="d-flex">
                  <div>
                    <img :src="item.image" alt />
                  </div>
                  <div class="ml-3 max-w-100">
                    <strong>{{item.name}}</strong>
                    <div class="mt-3 color-666">{{item.desc}}</div>
                  </div>
                </div>
              </td>
              <td v-html="item.price"></td>
              <td>
                <span v-if="item.type == 1" class="color-primary">Công khai</span>
                <span v-else-if="item.type == 2" class="color-red">Riêng tư</span>
                <span v-else>-</span>
              </td>
              <td v-html="item.name"></td>
              <td>
                <div class="text-desc">
                  <p class="text-desc__text">{{item.content}}</p>
                  <div class="text-desc__sub">{{item.content}}</div>
                </div>
              </td>
            </tr>
          </app-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";

// Import faked data
import {} from "~/server/fakedata/elearning/test";

import CoursesService from "~/services/elearning/teaching/Summary";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  layout: "manage",
  name: "E-learning",

  components: {
    ElearningManagerSide,
    IconSearch,
    IconTrashAlt,
    IconFilter,
    IconTick
  },

  // async asyncData({ $axios }) {
  //   const { data: courses = {} } = await new CoursesService($axios)[
  //     actionTypes.BASE.LIST
  //   ]();

  //   return {
  //     courses
  //   };
  // },

  data() {
    return {
      tab: 1,
      ids: [],
      heads: [
        {
          name: "",
          text: "",
          selectAll: true
        },
        {
          name: "name",
          text: "Bài giảng và khóa học",
          sort: true
        },
        {
          name: "price",
          text: "Học phí",
          sort: true
        },
        {
          name: "",
          text: "Hiển thị"
        },
        {
          name: "date",
          text: "Ngày đăng",
          sort: true
        },
        {
          name: "content",
          text: "Lý do bị từ chối"
        }
      ],
      isAuthenticated: true,
      pagination: {
        total: 15,
        page: 6,
        pager: 20,
        total_elements: 55,
        first: 1,
        last: 10
      },
      isTeacher: true,
      time1: null,
      time2: null,
      opt1: "",
      opts1: [
        { value: "", text: "Theo loại" },
        { value: "1", text: "Mua" },
        { value: "2", text: "Bán" }
      ],
      opt2: "",
      opts2: [
        { value: "", text: "Theo hiển thị" },
        { value: "1", text: "Tăng dần" },
        { value: "2", text: "Giảm dần" }
      ],
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
      },
      list: [
        {
          id: 1,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        },
        {
          id: 2,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        },
        {
          id: 3,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        },
        {
          id: 4,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        },
        {
          id: 5,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        },
        {
          id: 6,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        },
        {
          id: 7,
          name: "Mua khóa học Đại số 11",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          date: "19/11/2019",
          image: "https://picsum.photos/103/61",
          desc: "Mô tả khóa học",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque Nibh et ultricies augue at scelerisque"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/courses/courses-list", {
      courses: "list"
    })
  },

  methods: {
    selectAll(e) {
      this.ids = e;
      console.log(this.ids);
    },
    changeSelect() {
      console.log(this.ids);
    },
    sort(e) {
      this.list = [...e];
    },
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    },
     /**
     * DELETE
     */
    async deletePost(id) {
      const doDelete = await new CoursesService(this.$axios)[
        actionTypes.BASE.DELETE
      ](id);

      if (doDelete.success) {
        const { courses } = this;
        const newListPost =
          courses && courses.listPost
            ? courses.listPost.filter(item => item.post_id !== id)
            : [];
        this.courses = {
          listPost: newListPost,
          page: courses.page || {}
        };
      } else {
        this.$toasted.error(doDelete.message);
      }
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
</style>