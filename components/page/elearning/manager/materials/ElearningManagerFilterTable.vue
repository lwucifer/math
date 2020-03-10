<template>
    <div class="wrapfilterbar__ElearningManagerFilterTable">
        <div class="row">
            <div class="col-6 wrapfilterform__ElearningManagerFilterTable">
                <div>
                    <button class="btnFitlerSummit__ElearningManagerFilterTable" @click="submit">
                        <IconFilter />
                        <span>Lọc kết quả</span>
                    </button>
                </div>
                <div>
                    <app-vue-select
                        class="selectTypes__ElearningManagerFilterTable"
                        :options="status"
                        label="text"
                        placeholder="Theo loại"
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
                        class="selectStatus__ElearningManagerFilterTable"
                        :options="status"
                        label="text"
                        placeholder="Theo tình trạng"
                        searchable
                        clearable
                        @input="handleChangedInput"
                        @search:focus="handleFocusSearchInput"
                        @search:blur="handleBlurSearchInput"
                        >
                    </app-vue-select>
                </div>
            </div>
            <div class="col-6 d-flex justify-content-end">
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
        <div>
            <button @click="submit" class="bntRemoveList__ElearningManagerFilterTable">
                <IconTrashAlt />
                <span>Xóa khỏi danh sách</span>
            </button>
        </div>
        <div class="wrapTable__ElearningManagerFilterTable">
            <app-table
            :heads="heads"
            :pagination="pagination"
            @pagechange="onPageChange"
            :data="list"
            multiple-selection
            @selectionChange="selectRow"
            class="tableUploadFile__ElearningManagerFilterTable"
            >
            </app-table>
        </div>
    </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline"
import IconSearch from "~/assets/svg/icons/search.svg?inline"
import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline"
import { mapState } from "vuex"
import { MATERIALS } from "~/server/fakedata/elearning/materials"

export default {
    components:{
        IconFilter,
        IconSearch,
        IconArrow,
        IconTrashAlt
    },
    data() {
            return {
                heads: [
    
                    {
                        name: "name",
                        text: "Tên file",
                    },
                    {
                        name: "type",
                        text: "Loại",
                    },
                    {
                        name: "lesson",
                        text: "Sử dụng",
                    },
                    {
                        name: "dateUpload",
                        text: "Ngày tải lên",
                    },
                    
                ],
                filter: {
                    type: null,
                    query: null
                },
                status: [
                    {
                        value: 1,
                        text: 'Video'
                    },
                    {
                        value: 2,
                        text: 'Văn bản'
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
                list: MATERIALS,
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
            },
            selectRow(data) {
                console.log('change row: ', data)
            }
        }
       
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/material/_elearning-filtertable.scss";
</style>