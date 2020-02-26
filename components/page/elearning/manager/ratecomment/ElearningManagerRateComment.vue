<template>
    <div>
        <div class="wrapFilterBar__ElearningManagerRC">
                <div>
                    <button class="btnFitlerSummit__ElearningManagerFilterTable" @click="submit">
                        <IconFilter />
                        <span>Lọc kết quả</span>
                    </button>
                </div>
                <div>
                    <app-checkbox>Có bình luận</app-checkbox>
                </div>
                <div>
                    <app-vue-select
                        class="selectComment__ElearningManagerRC"
                        :options="status"
                        label="text"
                        placeholder="Theo bình chọn"
                        searchable
                        clearable
                        @input="handleChangedInput"
                        @search:focus="handleFocusSearchInput"
                        @search:blur="handleBlurSearchInput"
                        >
                    </app-vue-select>
                </div>
                <div>
                    <app-vue-select
                        class="selectClass__ElearningManagerRC"
                        :options="status"
                        label="text"
                        placeholder="Lớp"
                        searchable
                        clearable
                        @input="handleChangedInput"
                        @search:focus="handleFocusSearchInput"
                        @search:blur="handleBlurSearchInput"
                        >
                    </app-vue-select>
                </div>
            </div>
        <div class="wrapTable__ElearningManagerRC">
            <app-table
            :heads="heads"
            :pagination="pagination"
            @pagechange="onPageChange"
            :data="list"
            class="table__ElearningManagerRC"
            >
                <template v-slot:cell(action)="{row}">
                    <td>
                        <app-stars :stars="4" :size="16" class="mt-2 mb-2" />
                    </td>
                </template>
            </app-table>
        </div>
    </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline"
import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
import { mapState } from "vuex"
import { USERRATE } from "~/server/fakedata/elearning/materials"


export default {
    components:{
        IconFilter,
        IconArrow,

    },
    data() {
            return {
                heads: [
                    {
                        name:"action",
                        text:"Đánh giá",
                        sort:false,
                    },
                    {
                        name: "nameuser",
                        text: "Người đánh giá",
                        sort: false,
                    },
                    {
                        name: "class",
                        text: "Lớp",
                        sort: false,
                    },
                    {
                        name: "time",
                        text: "Thời gian",
                        sort: true,
                    }
                    
                ],
                filter: {
                    type: null,
                    query: null
                },
                status: [
                    {
                        value: 1,
                        text: '10B'
                    },
                    {
                        value: 2,
                        text: '10A'
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
                list: USERRATE,
                allSelected: true,
                
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"])
        }
        ,methods: {
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
@import "~/assets/scss/components/elearning/manager/_elearning-rate-comment.scss"
</style>