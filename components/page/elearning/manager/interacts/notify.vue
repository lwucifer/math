<template>
  <div class="container pr-0">
    <div class="d-flex interacts-filter mb-4">
      <app-search
        class="interacts-qa-search-1 mb-0 mr-3"
        bordered
        size="sm"
        placeholder="Nhập để tìm kiếm"
        v-model="filter.query"
        @submit="handleSearch"
      ></app-search>

      <app-button
        class="mr-3"
        :color="isFilter ? 'primary' : 'default'"
        :outline="!isFilter"
        size="sm"
        @click="clickFilter"
      >
        <IconHamberger class="icon mr-1" />&nbsp;Lọc kết quả
      </app-button>

      <template v-if="isFilter">
        <!--
        <app-vue-select
          class="app-vue-select filter-course"
          v-model="filter.province"
          :options="lessonOpts"
          placeholder="Bài giảng/khóa học"
          searchable
          has-border
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
          :all-opt="allOpt"
        />
        -->
        <AppSelectIneractiveElearning
          class="app-vue-select filter-course mr-0"
          @input="handleChangedInput"
        />
      </template>
    </div>

    <app-button color="pink" size="sm" @click.prevent="handleDeleteNotify">
      <IconDeleteForever class="icon body-1 mr-2" />Xoá
    </app-button>

    <div class="wrapTable__ElearningManagerInteractive">
      <app-table
        :heads="heads"
        :pagination="filterPagination"
        @pagechange="onPageChange"
        :data="list"
        multiple-selection
        @selectionChange="selectRow"
      >
        <template v-slot:cell(action)="{row}">
          <td>
            <n-link class title="Chi tiết" :to="'/elearning/manager/test/' + row.id">
              <IconArrowForwardIos24pxOutlined />
            </n-link>
          </td>
        </template>

        <template v-slot:cell(content)="{row}">
          <td>
            <v-popover
              trigger="hover"
              popover-inner-class="tooltip-inner popover-inner dont-break-out"
              popover-class="tooltip--eln-interactive"
            >
              <span>{{get(row,"content","") | truncStrFilter(30)}}</span>
              <template slot="popover">
                <span>{{row.content}}</span>
              </template>
            </v-popover>
          </td>
        </template>

        <template v-slot:cell(title)="{row}">
          <td>
            <v-popover
              trigger="hover"
              popover-inner-class="tooltip-inner popover-inner dont-break-out"
              popover-class="tooltip--eln-interactive"
            >
              <span>{{get(row,"title","") | truncStrFilter(30)}}</span>
              <template slot="popover">
                <span>{{row.title}}</span>
              </template>
            </v-popover>
          </td>
        </template>
        <template v-slot:cell(timestamp)="{row}">
          <td>
           <span>
             {{get(row,"timestamp","") | moment('DD/MM/YYYY')}}
           </span>
          </td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrowForwardIos24pxOutlined from "~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline";
import IconDeleteForever from "~/assets/svg/v2-icons/delete_forever_24px.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { NOTIFIES } from "~/server/fakedata/elearning/materials";
import { get } from 'lodash';
import { moment } from 'moment'
const STORE_TEACHING_PUBLIC_LIST = "elearning/teaching/teaching-public";
const STORE_TEACHING_INTERACTIVE_ANNOUCONCEMENTS = "elearning/teaching/interactive-announcement";
import AppSelectIneractiveElearning from "~/components/page/elearning/manager/interacts/AppSelectIneractiveElearning"
export default {
  layout: "manage",

  components: {
    IconHamberger,
    IconSearch,
    IconDeleteForever,
    IconArrowForwardIos24pxOutlined,
    AppSelectIneractiveElearning
  },
  data() {
    return {
      currentQuestionIndex: null,
      tab: 1,
      heads: [
        {
          name: "",
          text: "",
          selectAll: true
        },
        {
          name: "title",
          text: "Tiêu đề",
          sort: false
        },
        {
          name: "content",
          text: "Nội dung thông báo",
          sort: false
        },
        {
          name: "elearning_name",
          text: "Bài giảng khoa học",
          sort: false
        },
        {
          name: "timestamp",
          text: "Thời gian",
          sort: false
        },
        {
          name: "action",
          text: "",
          sort: false
        }
      ],
      filter: {
        type: null,
        query: null
      },
      isAuthenticated: true,
      pagination: {
        total: 15,
        page: 6,
        pager: 20,
        total_elements: 55,
        first: 1,
        last: 10
      },
      list: [],
      listQuery: {
        page: 1,
        size: 10
      },
      isFilter: false,
      allOpt: {
        value: null,
        label: 'Tất cả'
      },
      params:{
        elearning_id:null,
        keyword:null,
        page:1,
        size:10,
      },
      ids:[]
    };
  },
  watch:{
    listAnnouncement:{
      handler: function() {
        this.list = get(this,"listAnnouncement.content")
      }
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_TEACHING_PUBLIC_LIST, ["teachingPublicList"]),
    ...mapState(STORE_TEACHING_INTERACTIVE_ANNOUCONCEMENTS, ["listAnnouncement"]),
    filterListLesson() {
      const data = this.teachingPublicList ? this.teachingPublicList : [];
      const filterData = data.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
      return filterData;
    },
    lessonOpts() {
        return [this.allOpt, ...this.filterListLesson]
      },
    filterPagination() {
      return {
        size:get(this,"listAnnouncement.size",10),
        total_pages:get(this,"listAnnouncement.total_pages",0),
        total_elements:get(this,"listAnnouncement.total_elements",0),
        first:get(this,"listAnnouncement.first",false),
        last:get(this,"listAnnouncement.last",false),
        number_of_elements:get(this,"listAnnouncement.number_of_elements",0),
        number:get(this,"listAnnouncement.number",0)
      };
    },
  },

  methods: {
    onPageChange(e) {
      this.params.page = e.number + 1;
      console.log(this.params)
      this.fetchAnnouncement();
    },
    submit() {
      console.log("[Component] Elearning exam: submitted");
    },
    handleChangedInput(val) {
      console.log("[Component] Elearning exam: changing input...", val);
      this.params.elearning_id = val;
      this.params.page = null;
      this.fetchAnnouncement();
    },
    handleFocusSearchInput() {
      console.log("[Component] Elearning exam: focus searching ");
    },
    handleBlurSearchInput() {
      console.log("[Component] Elearning exam: blur searching ");
    },
    handleSearch(val) {
      console.log("[Component] Elearning exam: searching");
      this.params.keyword = val;
      this.params.page = null;
      this.fetchAnnouncement();
    },
    clickQuestion({ row, index }) {
      console.log("click question");
      this.currentQuestionIndex = index;
    },
    closeDetail() {
      console.log("close");
      this.currentQuestionIndex = null;
    },
    fetchAnnouncement(){
      const payload = { 
        params:{
          elearning_id: this.params.elearning_id,
          keyword: this.params.keyword,
          page: this.params.page,
          size:  this.params.size
        }
      }
      const res = this.$store.dispatch(
        `${STORE_TEACHING_INTERACTIVE_ANNOUCONCEMENTS}/${actionTypes.TEACHING_INTERACTIVE_ANNOUNCEMENT.LIST}`,
        payload
      );
    },
    clickFilter(){
      if (this.isFilter) {
          this.resetForm()
          this.isFilter = false
          this.fetchAnnouncement()
      } else {
          this.isFilter = true
      }
    },
    resetForm(){
      this.params.elearning_id = null;
      this.params.page=1;
      this.params.size=10;
    },
    selectRow(data){
      this.ids = _.map(data, 'id');
    },
    async handleDeleteNotify(){
      console.log('deleting')
      let data = {
          ids: this.ids
        }
      const res =await this.$store.dispatch(
        `${STORE_TEACHING_INTERACTIVE_ANNOUCONCEMENTS}/${actionTypes.TEACHING_INTERACTIVE_DELETE_ANNOUNCEMENT.DELETE}`,
        {data}
      );
      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "success", false))
        return
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"))
      console.log(res)
    },
    get
    /*
    async getList() {
      const elearningType = "1";
      this.listQuery.type = elearningType;
      let params = {
        type: elearningType
      };
      params = { ...this.listQuery };
      this.$store.dispatch(
        `elearning/study/study/${actionTypes.ELEARNING_STURY.LIST}`,
        { params }
      );
    }
    */
  },

  created() {
    //this.getList();
    this.fetchAnnouncement();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-interactive.scss";
</style>