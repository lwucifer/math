<template>
  <div>Hello
    <!--<div class="row">
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
            <div class="col-6">
                <div class="wrapSearchForm___ElearningManagerFilterTable">
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
            </div>
        </div>
  
  --></div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline"
import IconSearch from "~/assets/svg/icons/search.svg?inline"
export default {
        components:{
            IconFilter,
            IconSearch
        },
        computed: {
            ...mapState("auth", ["loggedUser"])
        }

}
</script>

<style>

</style>