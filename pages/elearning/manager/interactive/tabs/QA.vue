<template>
  <div class="container">
      <div class="row wrap-filter-form__ElearningManagerInteractive">
        <div  class="filter-form__ElearninManagerInteractive col-6">
          <div class="filter-item">
            <app-button
              color="primary"
              class="btnFilterSummit__ElearningManagerInteractive"
              :size="'sm'"
              @click="submit"
            >
              <IconFilter />
              <span>Lọc kết quả</span>
            </app-button>
          </div>
          <div class="filter-item">
            <app-vue-select
              class="app-vue-select filter-form__item__selection"
              v-model="filter.province"
              :options="classes"
              label="text"
              placeholder="Theo lớp"
              searchable
              clearable
              @input="handleChangedInput"
              @search:focus="handleFocusSearchInput"
              @search:blur="handleBlurSearchInput"
            >
            </app-vue-select>
          </div>
          <div class="filter-item">
            <app-vue-select
              class="app-vue-select filter-form__item__selection"
              :options="results"
              label="text"
              placeholder="Theo kết quả"
              searchable
              clearable
              @input="handleChangedInput"
              @search:focus="handleFocusSearchInput"
              @search:blur="handleBlurSearchInput"
            >
            </app-vue-select>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-end" >
              <div class="wrapSearchForm___ElearningManagerFilterTable">
                    <app-input
                        type="text"
                        v-model="filter.query"
                        placeholder="Nhập để tìm kiếm..."
                        :size="'sm'"
                        @input="handleSearch"
                        class="inputSearch"
                       
                    />
                    <button type="submit">
                        <IconSearch width="15" height="15" />
                    </button>
                </div>
        </div>
      </div>
      <div class="wrapTable__ElearningManagerInteractive">
        <app-table
          :heads="heads"
          :pagination="pagination"
          @pagechange="onPageChange"
          :data="list"
        >
          <template v-slot:cell(action)="{row}">
            <td>
              <n-link
                class
                title="Chi tiết"
                :to="'/elearning/manager/test/' + row.id">
                Xem chi tiết
              </n-link>
            </td>
          </template>
        </app-table>
      </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline"
import IconSearch from "~/assets/svg/icons/search.svg?inline"
import { mapState } from "vuex"
import * as actionTypes from "~/utils/action-types"
import { EXERCISES } from "~/server/fakedata/elearning/test"
export default {
    components: {
            IconFilter,
            IconSearch,
        },
    data() {
            return {
                tab: 1,
                heads: [
                    {
                        name: "name",
                        text: "Câu hỏi",
                        sort: false
                    },
                    {
                        name: "type",
                        text: "Bài giảng khóa học",
                        sort: false
                    },
                    {
                        name: "lesson",
                        text: "Người hỏi",
                        sort: false
                    },
                    {
                        name: "course",
                        text: "Lớp",
                        sort: false
                    },
                    {
                        name: "studentNum",
                        text: "Trạng thái",
                        sort: true
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
                classes: [
                    {
                        value: 1,
                        text: '11A'
                    },
                    {
                        value: 2,
                        text: '10A'
                    },
                ],
                results:[
                    {
                      value:1,
                      text:'Đạt'
                    },
                    {
                      value:2,
                      text:'Chưa đạt'
                    }
                ],
                isAuthenticated: true,
                pagination: {
                    total: 15,
                    page: 6,
                    pager: 20,
                    totalElements: 55,
                    first: 1,
                    last: 10
                },
                list: EXERCISES,
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"])
        },

        methods: {
            onPageChange(e) {
                const that = this;
                that.pagination = { ...that.pagination, ...e };
                console.log(that.pagination);
            },
            submit() {
                console.log('[Component] Elearning exam: submitted')
            },
            handleChangedInput(val) {
                if (val !== null) {} else {}
                console.log('[Component] Elearning exam: changing input...', val)
            },
            handleFocusSearchInput() {
                console.log('[Component] Elearning exam: focus searching ')
            },
            handleBlurSearchInput() {
                console.log('[Component] Elearning exam: blur searching ')
            },
            handleSearch() {
                console.log('[Component] Elearning exam: searching')
            }
        }
}
</script>

<style lang="scss">
.wrap-filter-form__ElearningManagerInteractive{
  
}
.filter-form__ElearninManagerInteractive{
    display: flex;
  .filter-item{
   &:nth-child(2){
      margin:0px 20px;
    }
    &:last-child{
      min-width: 139px;
  }    
  }
  
}
.btnFilterSummit__ElearningManagerInteractive{
  border-radius: 100px;
}
.wrapTable__ElearningManagerInteractive{
  padding-top:30px;
}
</style>