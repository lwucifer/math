<template>
  <div>
    <elearning-manager-filter-form
      @changedFilter="updateFilter"
    />
    <div class="wrapTable__ElearningManagerRC">
      <app-table
        :heads="heads"
        :pagination="pagination"
        :data.sync="list"
        @pagechange="onPageChange"
        class="table__ElearningManagerRC"
      >
        <template v-slot:cell(action)="{row}">
          <td>
            <app-stars :stars="row.vote" :size="16" class="mt-2 mb-2"/>
          </td>
        </template>

        <template v-slot:cell(creator)="{row}">
          <td>
            {{ get(row, 'creator.name', '') }}
          </td>
        </template>

        <template v-slot:cell(created_at)="{row}">
          <td>
            {{ get(row, 'timestamp', '') | moment("hh:mm A DD/MM/YYYY") }}
          </td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
  import ElearningManagerFilterForm from "./ElearningManagerFilterForm"

  import {mapState} from "vuex"
  import { get } from "lodash"

  export default {
    components: {
      ElearningManagerFilterForm
    },
    data() {
      return {
        heads: [
          {
            name: "action",
            text: "Đánh giá",
            sort: false,
          },
          {
            name: "creator",
            text: "Người đánh giá",
            sort: false,
          },
          {
            name: "class",
            text: "Lớp",
            sort: false,
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
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      updateFilter(val) {
        this.$emit('changedFilter', val)
      },
      get
    },

  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-rate-comment.scss"
</style>