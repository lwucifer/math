<template>
  <app-vue-select
    class="app-vue-select w-100"
    :options="list"
    :filterable="false"
    searchable
    clearable
    v-model="selectedItem"
    :reduce="item => item.elearning_id"
    label="name"
    placeholder="Bài giảng/khóa học"
    @input="handleChangedCourse"
    @open="onOpen"
    @close="closeVotedElearningsFilter"
  >
    <template #list-footer v-if="hasMoreVotedElearning">
      <li ref="load" class="loader">
        Loading more options...
      </li>
    </template>
  </app-vue-select>
</template>

<script>
  import { useEffect } from "~/utils/common"
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  
  const STORE_NAMESPACE = 'elearning/public/public-voted-elearning'
  import vSelect from 'vue-select'
  
  export default {
    
    components: {
      vSelect
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
        loading: false,
        observer: null,
        pagination: {},
        params: {
          page: 1,
          size: 50,
          subject_id: this.subjectId,
        },
        list: [],
        selectedItem: null
      }
    },
    
    computed: {
      ...mapState(STORE_NAMESPACE, {
        detailInfo: "elearnings",
      }),
      hasMoreVotedElearning () {
        return true
        return !this.get(this.pagination, 'last', true)
      },
    },
    
    watch: {
    },
    
    methods: {
      async onOpen() {
        console.log('opening')
        if (this.hasMoreVotedElearning) {
          console.log('loading data')
          await this.$nextTick();
          this.observer.observe(this.$refs.load)
        }
      },
      async getList() {
        try {
          let params = { ...this.params }
          console.log('get listing...')
          
          await this.$store.dispatch(
            `${STORE_NAMESPACE}/${actionTypes.ELEARNING_PUBLIC_VOTED_ELEARNING.LIST}`, { params }
          )
          this.list = this.get(this.detailInfo, 'data.content', [])
          this.pagination = this.get(this.detailInfo, 'data.page', {})
        } catch (e) {
          console.log('Get voted elearnings ', e)
        } finally {
        }
      },
      handleChangedCourse(val) {
        console.log('change elearning')
        this.$emit('changedCourse', val)
      },
      closeVotedElearningsFilter() {
      
      },
      async infiniteScroll ([{isIntersecting, target}]) {
        console.log('infiniteSroll', isIntersecting, target)
        if (isIntersecting) {
          const ul = target.offsetParent
          const scrollTop = target.offsetParent.scrollTop
          this.params.size += 10
          await this.getList()
          await this.$nextTick()
          ul.scrollTop = scrollTop
        }
      },
      get
    },
    mounted () {
      this.observer = new IntersectionObserver(this.infiniteScroll);
    },
    created() {
      // useEffect(this, this.getList.bind(this), [
      //   "params.subject_id"
      // ]);
    },
  };
</script>

<style lang="scss">
</style>