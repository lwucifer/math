<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <h5 class="color-primary mb-3">Bài tập và bài kiểm tra</h5>
            <div class="elearning-manager-content__title__breadcrumb">
              <n-link to >Bài tập</n-link> <i> > </i>
              <n-link to ><b>Bài tập đại số lớp 10 (Bài giảng đại số lớp 10)</b></n-link>
            </div>
            <hr class />
          </div>

          <div class="elearning-manager-content__main">
            <div class="elearning-">
              <!--Filter form-->
              <div class="filter-form">
                <div class="filter-form__item">
                  <app-button
                    color="primary"
                    class="filter-form__item__btn filter-form__item__btn--submit"
                    :size="'sm'"
                    @click="submit"
                  >
                    <IconFilter />
                    <span>Lọc kết quả</span>
                  </app-button>
                </div>

                <div class="filter-form__item">
                  <app-vue-select
                    class="app-vue-select filter-form__item__selection"
                    v-model="filter.class"
                    :options="classes"
                    label="text"
                    placeholder="Theo lớp"
                    searchable
                    clearable
                    @input="handleChangedInput"
                    @search:focus="handleFocusSearchInput"
                    @search:blur="handleBlurSearchInput"
                  >
                  </app-vue-select>
                </div>

                <div class="filter-form__item">
                  <app-vue-select
                    class="app-vue-select filter-form__item__selection"
                    v-model="filter.result"
                    :options="results"
                    label="text"
                    placeholder="Theo kết quả"
                    searchable
                    clearable
                    @input="handleChangedInput"
                    @search:focus="handleFocusSearchInput"
                    @search:blur="handleBlurSearchInput"
                  >
                  </app-vue-select>
                </div>

                <!--Right form-->
                <div class="filter-form__right">
                  <div class="filter-form__item filter-form__item--search">
                    <app-input
                      type="text"
                      v-model="filter.query"
                      placeholder="Nhập để tìm kiếm..."
                      :size="'sm'"
                      @input="handleSearch"
                    />
                    <button type="submit">
                      <IconSearch width="15" height="15" />
                    </button>
                  </div>
                </div><!--End right form-->

              </div><!--End filter form-->

              <!--Table-->
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
                      :to="'/elearning/manager/test/result/' + row.id">
                      Xem chi tiết
                    </n-link>
                  </td>
                </template>
              </app-table><!--End table-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
    import IconFilter from "~/assets/svg/icons/filter.svg?inline"
    import IconSearch from "~/assets/svg/icons/search.svg?inline"
    import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
    import { mapState } from "vuex";
    import * as actionTypes from "~/utils/action-types"
    // Import faked data
    import { EXERCISE_DETAIL } from "~/server/fakedata/elearning/test"

    export default {

        components: {
            ElearningManagerSide,
            IconFilter,
            IconSearch,
            IconArrow
        },

        data() {
            return {
                tab: 1,
                heads: [
                    {
                        name: "name",
                        text: "Học sinh",
                        sort: false
                    },
                    {
                        name: "class",
                        text: "Lớp",
                        sort: false
                    },
                    {
                        name: "result",
                        text: "Kết quả",
                        sort: false
                    },
                    {
                        name: "doNum",
                        text: "Số lần làm bài",
                        sort: false
                    },
                    {
                        name: "finishedAt",
                        text: "Thời gian nộp bài",
                        sort: false
                    },
                    {
                        name: "action",
                        text: "",
                        sort: false
                    },
                ],
                filter: {
                    class: null,
                    result: null,
                    query: null
                },
                classes: [
                    {
                        value: 1,
                        text: '10B'
                    },
                    {
                        value: 2,
                        text: '11C'
                    },
                ],
                results: [
                    {
                        value: 1,
                        text: '4/10'
                    },
                    {
                        value: 2,
                        text: '9/10'
                    },
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
                isTeacher: true,
                list: EXERCISE_DETAIL,
            }
        },
        computed: {
            ...mapState("auth", ["loggedUser"]),
        },

        methods: {
            onPageChange(e) {
                const that = this;
                that.pagination = { ...that.pagination, ...e };
                console.log(that.pagination);
            },
            submit() {
                console.log('[Component] Elearning exercise: submitted')
            },
            handleChangedInput(val) {
                if (val !== null) {} else {}
                console.log('[Component] Elearning exercise: changing input...', val)
            },
            handleFocusSearchInput() {
                console.log('[Component] Elearning exercise: focus searching ')
            },
            handleBlurSearchInput() {
                console.log('[Component] Elearning exercise: blur searching ')
            },
            handleSearch() {
                console.log('[Component] Elearning exercise: searching')
            }
        },

        created() {
            const exerciseId = this.$route.params.id
        }
    }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
</style>