<template>
  <div>
    <div class="mb-2">
      <h5>{{ name }}</h5>
    </div>
    <div class="">
      <app-carousel
        :options="{ slidesPerView: 4, spaceBetween: 24, preventClicksPropagation: false }"
        ref="profileElearningsCarousel"
      >
        <template slot="default" slot-scope="{ classes }">
          <div v-if="pageLoading" class="container">
            <div class="row">
              <div v-for="i in 4" :key="i" class="col-md-3 mb-6">
                <div class="bg-white py-6 px-3">
                  <VclList/>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            v-for="(item, index) in items"
            :key="index"
            :class="classes"
          >
            <CourseItem2
              :to="`/elearning/${item.elearning_id}`"
              :image="get(item, 'avatar.medium', '')"
              :livestream="item.is_streaming"
              :name="item.name"
              :teacher="item.teacher"
              :averageRate="get(item, 'voting.rate', 0)"
              :totalReview="get(item, 'voting.votes', 0)"
              :price="item.price"
              :originalPrice="item.original_price"
              :free="!item.price"
              :discount="item.discount"
              :online-class="item.olclass_existed"
            />
          </div>
        </template>
      </app-carousel>
    </div>
  </div>
</template>

<script>
  import ProfileItem from "~/components/page/profile/ProfileItem"
  import CourseItem2 from "~/components/page/course/CourseItem2";
  import {VclList} from "vue-content-loading";

  import { get } from "lodash";

  export default {
    components: {
      ProfileItem,
      CourseItem2,
      VclList
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        required: true,
        default: () => []
      },
      name: {
        type: String,
        required: true
      },
      
    },
    data() {
      return {
        pageLoading: true
      }
    },
    methods: {
      showAll() {
        console.log('[Component] SchoolListBox: Click `Xem tat ca`')
        this.$emit('showAll', this.id)
      },
      get
    },
    mounted() {
      this.pageLoading = false
    }
  }
</script>

<style>

</style>