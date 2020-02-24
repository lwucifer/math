<template>
  <div class="elearning-manager-result">
    writing
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
            title="Chi tiết"
            :to="'/elearning/manager/test/' + row.id">
            <IconArrow />
          </n-link>
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
    import IconFilter from "~/assets/svg/icons/filter.svg?inline"
    import IconSearch from "~/assets/svg/icons/search.svg?inline"
    import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
    import { mapState } from "vuex"
    import * as actionTypes from "~/utils/action-types"
    // Import faked data
    import { EXERCISES } from "~/server/fakedata/elearning/test"

    export default {

        components: {
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
                        text: "Tiêu đề",
                        sort: false
                    },
                    {
                        name: "type",
                        text: "Thể loại",
                        sort: false
                    },
                    {
                        name: "lesson",
                        text: "Thuộc bài giảng",
                        sort: false
                    },
                    {
                        name: "course",
                        text: "Thuộc khóa học",
                        sort: false
                    },
                    {
                        name: "studentNum",
                        text: "Học sinh làm bài",
                        sort: true
                    },
                    {
                        name: "createdAt",
                        text: "Ngày khởi tạo",
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
                types: [
                    {
                        value: 1,
                        text: 'Trắc nghiệm'
                    },
                    {
                        value: 2,
                        text: 'Tự luận'
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
        }
    };
</script>

<style lang="scss">
  /*@import "~/assets/scss/components/elearning/manager/_elearning-exercise.scss";*/
</style>