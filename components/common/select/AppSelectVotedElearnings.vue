<template>
  <app-vue-select
    class="app-vue-select w-100"
    :options="list"
    searchable
    clearable
    append-to-body
    v-model="selectedItem"
    :reduce="item => item.elearning_id"
    label="name"
    placeholder="Bài giảng/khóa học"
    @input="onChange"
    @open="onOpen"
    @close="onClose"
  >
    <template slot="list-footer" v-if="hasMoreVotedElearning">
      <li ref="load" class="loader text-center">
        <app-spin
          size="small"
        />
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
        observer: null,
        pagination: {},
        params: {
          page: 1,
          size: 10,
          subject_id: this.subjectId,
        },
        list: [],
        selectedItem: null,
      }
    },
    
    computed: {
      ...mapState(STORE_NAMESPACE, {
        detailInfo: "elearnings",
      }),
      hasMoreVotedElearning: function() {
        return this.get(this.pagination, 'total_elements', 0) > this.get(this.pagination, 'number_of_elements', 0)
      },
    },
    
    watch: {
    },
    
    methods: {
      async onOpen() {
        if (this.hasMoreVotedElearning) {
          await this.$nextTick();
          this.observer.observe(this.$refs.load)
        }
      },
      onChange(val) {
        this.$emit('changedCourse', val)
      },
      async getList() {
        try {
          let params = { ...this.params }
          
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
      onClose() {
        this.observer.disconnect();
      },
      onSearch(search, loading) {
        loading(true)
      },
      async infiniteScroll ([{isIntersecting, target}]) {
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
      this.observer = new IntersectionObserver(this.infiniteScroll.bind(this));
    },
    created() {
      this.getList()
    },
  };
</script>

<style lang="scss">
</style>