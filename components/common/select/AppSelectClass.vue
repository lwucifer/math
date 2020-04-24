<template>
  <div class="d-md-flex">
    <app-select-school-year
      @input="changedSchoolYear"
    />
  
    <div class="filter-form__item" style="min-width: 115px;">
      <app-vue-select
        :disabled="!get(this, 'params.school_year_id', false)"
        class="app-vue-select w-100"
        :options="list"
        searchable
        clearable
        append-to-body
        v-model="selectedClass"
        :reduce="item => item.id"
        label="name"
        placeholder="Theo lớp"
        @input="onChange"
        @open="onOpen"
        @close="onClose"
      >
        <template slot="list-footer" v-if="hasMoreClasses">
          <li ref="load" class="loader text-center">
            <app-spin
              size="small"
            />
          </li>
        </template>
      </app-vue-select>
    </div>
  </div>
</template>

<script>
  import { useEffect } from "~/utils/common"
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  
  const STORE_NAMESPACE = 'elearning/teaching/teaching-class'
  
  export default {
    
    components: {
    },
    
    model: {
      prop: "value",
      event: "change"
    },
    
    props: {
      subjectId: {
        type: String|Number,
        default: null
      }
    },
    
    data() {
      return {
        observer: null,
        params: {
          page: 1,
          size: 10,
          school_year_id: null,
        },
        list: [],
        selectedClass: null
      }
    },
    
    computed: {
      ...mapState(STORE_NAMESPACE, {
        detailInfo: "classes",
      }),
      hasMoreClasses: function() {
        return this.get(this.detailInfo, 'data.total_elements', 0) > this.get(this.detailInfo, 'data.number_of_elements', 0)
      },
    },
    
    watch: {
      params: {
        handler: function(val) {
          const tmpSchoolId = get(val, 'school_year_id', null)
          if (tmpSchoolId == null || tmpSchoolId == '') {
            this.selectedClass = null
            this.onChange(null)
          }
        },
        deep: true
      }
    },
    
    methods: {
      async onOpen() {
        if (this.hasMoreClasses) {
          await this.$nextTick();
          this.observer.observe(this.$refs.load)
        }
      },
      onChange(val) {
        this.$emit('changedClass', val)
      },
      async getList() {
        try {
          let params = { ...this.params }
          
          await this.$store.dispatch(
            `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_CLASS.LIST}`, { params }
          )
          this.list = this.get(this.detailInfo, 'data.content', [])
        } catch (e) {
          console.log('Get teaching classes ', e)
        } finally {
        }
      },
      onClose() {
        this.observer.disconnect();
      },
      onSearch(search, loading) {
        loading(true)
      },
      async infiniteScrollClass ([{isIntersecting, target}]) {
        if (isIntersecting) {
          const ul = target.offsetParent
          const scrollTop = target.offsetParent.scrollTop
          this.params.size += 10
          await this.getList()
          await this.$nextTick()
          ul.scrollTop = scrollTop
        }
      },
      changedSchoolYear(val) {
        this.params.school_year_id = val
        this.getList()
      },
      get
    },
    mounted () {
      this.observer = new IntersectionObserver(this.infiniteScrollClass.bind(this));
    },
    created() {
      // this.getList()
    },
  };
</script>

<style lang="scss">
</style>