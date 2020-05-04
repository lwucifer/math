<template>
  <div>
    <app-table
      :loading="loading"
      :heads="heads"
      :pagination="pagination"
      :data.sync="list"
      @sort="sortTable"
      @pagechange="onPageChange"
      class=""
    >
      <template v-slot:cell(vote)="{row}">
        <td>
          <app-stars :stars="row.vote" :size="16" class="mt-2 mb-2"/>
        </td>
      </template>
    
      <template v-slot:cell(content)="{row}">
        <!--<td class="cmt-content"-->
            <!--@mouseover="showCmt(row)"-->
            <!--@mouseleave="closeCmt"-->
        <!--&gt;-->
        <td class="cmt-content">
          <v-popover
            class=""
            trigger="hover"
            offset="10"
          >
            <div>
              {{ row.content | truncStrFilter(30, false) }}
            </div>
    
            <template slot="popover">
              <!--<div v-if="loadingQuestion" class="text-center">-->
                <!--<app-spin></app-spin>-->
              <!--</div>-->
              <div class="">
                <div v-html="row.content"></div>
              </div>
            </template>
  
          </v-popover>
          
          
          <!--<div class="cmt-detail" v-if="currentIndex && (row.id == currentIndex)">-->
            <!--<div v-html="row.content"></div>-->
          <!--</div>-->
        </td>
      </template>
    
      <template v-slot:cell(creator)="{row}">
        <td>
          {{ get(row, 'student.name', '') }}
        </td>
      </template>
  
      <template v-slot:cell(class)="{row}">
        <td>
          {{ get(row, 'student.class_name', '') }}
        </td>
      </template>
    
      <template v-slot:cell(course)="{row}">
        <td>
          <n-link :to="`/elearning/${get(row, 'elearning.id', '')}`" style="text-decoration: none;" target="_blank">
            {{ get(row, 'elearning.name', '') }}
          </n-link>
        </td>
      </template>
    
      <template v-slot:cell(created_at)="{row}">
        <td>
          {{ get(row, 'timestamp', '') | moment("hh:mm A DD/MM/YYYY") }}
        </td>
      </template>
    </app-table>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import { get } from "lodash"

  export default {
    components: {
    },
    data() {
      return {
        currentIndex: null,
        heads: [
          {
            name: "vote",
            text: "Đánh giá",
          },
          {
            name: "content",
            text: "Bình luận",
          },
          {
            name: "creator",
            text: "Người đánh giá",
          },
          {
            name: "class",
            text: "Lớp",
          },
          {
            name: "course",
            text: "Bình luận tại",
          },
          {
            name: "created_at",
            text: "Thời gian",
            sort: true,
          }

        ],
      };
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      pagination: {
        type: Object,
        default: () => {
          return {
            total: 0,
            size: 10,
            page: 1,
            totalElements: 0,
            first: 1,
            last: 1,
            number: 0
          }
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      showCmt(cmt) {
        if (!(this.currentIndex === get(cmt, 'id'))) {
          this.currentIndex = get(cmt, 'id')
        }
      },
      closeCmt() {
        this.currentIndex = null
      },
      sortTable(info) {
        console.log('sort by ', info)
      },
      get
    },

  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-rate-comment.scss";
</style>