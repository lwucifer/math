<template>
    <div class="school-filter">
        <div class="school-filter__title" v-if="title.length || link">
            <h3 class="aside-box__title" v-if="title.length">{{ title }}</h3>
            <n-link v-if="link" :to="link || ''" class="aside-box__link">{{ linkText }}</n-link>
        </div>
        <div class="school-filter__form">
            <app-button
              color="primary"
              @click="submit"
              class="school-filter__btn-submit"
            >
                <IconFilter />
                <span>Lọc kết quả</span>
            </app-button>
            <app-select
              v-model="filter.province"
              :options="provinces"
              placeholder="Theo tỉnh thành"
            >
                <template slot="placeholder-icon" >
                    <IconCaretDownThin />
                </template>
            </app-select>
            <app-select
              v-model="filter.district"
              :options="districts"
              placeholder="Theo quận huyện"
            >
                <template slot="placeholder-icon" >
                    <IconCaretDownThin />
                </template>
            </app-select>
            <app-select
              v-model="filter.village"
              :options="villages"
              placeholder="Theo xã phường"
            >
                <template slot="placeholder-icon" >
                    <IconCaretDownThin />
                </template>
            </app-select>
            <app-select
              v-model="filter.schoolType"
              :options="schoolTypes"
              placeholder="Theo cấp học"
            >
                <template slot="placeholder-icon" >
                    <IconCaretDownThin />
                </template>
            </app-select>
        </div>
    </div>
</template>

<script>
    import IconFilter from "~/assets/svg/icons/filter.svg?inline"
    import IconCaretDownThin from "~/assets/svg/icons/caret-down-thin.svg?inline"

    export default {
        components: {
            IconFilter,
            IconCaretDownThin
        },
        props: {
            title: {
                type: String,
                required: true,
                default: "Danh sách các trường học",
            },
            link: {
                type: [String, Object],
            },
            linkText: {
                type: String,
            },
            provinces: {
                type: Array,
                required: true,
                default: () => []
            },
            districts: {
                type: Array,
                required: true,
                default: () => []
            },
            villages: {
                type: Array,
                required: true,
                default: () => []
            },
            schoolTypes: {
                type: Array,
                required: true,
                default: () => []
            },
        },

        data() {
            return {
                filter: {
                    province: null,
                    district: null,
                    village: null,
                    schoolType: null
                },
            }
        },
        methods: {
            submit() {
                console.log('[Component] SchoolFilter: submitted')
            }
        }
    }
</script>

<style lang="scss">
    @import "~/assets/scss/components/school/_school-filter.scss";
</style>