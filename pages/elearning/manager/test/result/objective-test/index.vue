<template>
  <div class="elearning-manager-result">
    <div class="elearning-manager-result__mark">
      <h4>Kết quả bài làm</h4>
      <div class="elearning-manager-result__mark__detail">
        <div class="item">
          <span>Trả lời đúng: </span>
          <span>10</span>
        </div>
        <div class="item">
          <span>Trả lời sai: </span>
          <span>1</span>
        </div>
        <div class="item">
          <span>Bỏ qua: </span>
          <span>10</span>
        </div>
        <div class="item">
          <span>Thời gian làm bài: </span>
          <span>20:30</span>
        </div>
        <div class="item">
          <span>Kết quả: </span>
          <span>6/10 (Đạt)</span>
        </div>
      </div>
    </div>
    <div class="py-3">
      <!--Table-->
      <app-table
        class="table--objective-test"
        :heads="heads"
        :pagination="pagination"
        @pagechange="onPageChange"
        :data="list"
      >
        <template v-slot:cell(num)="{row, index}">
          <td class="table--question-test__question-index">
            <span>{{ index + 1 }}</span>
            <!--<div class="detail">-->
              <!--<span></span>-->
              <!--box detail-->
              <!--box detail-->
              <!--box detail-->
            <!--</div>-->
          </td>
        </template>
      </app-table><!--End table-->
    </div>
  </div>
</template>

<script>
    import { mapState } from "vuex"
    import * as actionTypes from "~/utils/action-types"
    // Import faked data
    import { RESULTS } from "~/server/fakedata/elearning/test"

    export default {

        components: {
        },

        data() {
            return {
                tab: 1,
                heads: [
                    {
                        name: "num",
                        text: "Câu hỏi",
                        sort: false
                    },
                    {
                        name: "answer",
                        text: "Đáp án học sinh",
                        sort: false
                    },
                    {
                        name: "key",
                        text: "Đáp án đúng",
                        sort: false
                    },
                ],
                types: [
                    {
                        value: 1,
                        text: 'Trắc nghiệm'
                    },
                    {
                        value: 2,
                        text: 'Tự luận'
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
                list: RESULTS,
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"])
        },

        methods: {
            onPageChange(e) {
                const that = this;
                that.pagination = { ...that.pagination, ...e };
                console.log(that.pagination);
            },
        },

        created() {
            const resultId = this.$route.params.id
        }
    };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-result.scss";
  @import "~/assets/scss/components/elearning/_elearning-objective-test-table.scss";
  .table--question-test__question-index {
    position: relative;
  }
  .detail {
    border: 1px solid #000;
    border-radius: 5px;
    padding: 2rem;
    height: 100px;
    position: relative;

    &::before {
      $size: 1.5rem;
      content: "";
      width: $size;
      height: $size;
      background: red;
      display: inline-block;
      position: absolute;
      right: calc(50% - 1.1rem); // (square(2* (1.56^2)))/2
      top: -.6rem;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
</style>