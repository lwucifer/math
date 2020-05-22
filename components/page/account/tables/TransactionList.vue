<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="listWithLocalTime"
      header-fontweight="normal"
      header-size="md"
      header-color="gray-3"
      body-color="dark"
      bg-table="white"
      :header-ext-cls="{ 'table-header-border-0': true }"
      :ext-table-cls="{ 'pt-3': true }"
      :pagination-style="{ position: 'right' }"
    >
      <template v-slot:cell(status)="{row}">
        <td v-if="row.status != statusPending">
          <span :class="statusClass(row.status)">{{ row.status | transactionStatus2Txt }}</span>
        </td>
        <td v-else>
          <span
            :class="statusClass(row.status, 'repay')"
            @click.prevent="handleRepayOrder(row)"
          >{{ row.status | transactionStatus2Txt }}</span>

          <span
            :class="statusClass(row.status, 'cancel')"
            @click.prevent="handleCancelOrder(row)"
          >{{ statusCancel | transactionStatus2Txt }}</span>
        </td>
      </template>
      <template v-slot:cell(desc)="{row}">
        <td>
          {{ row.desc | truncStrFilter(30) }}
        </td>
      </template>
      <template v-slot:cell(cost)="{row}">
        <td>
          {{ row.cost | toThousandFilter }} đ
        </td>
      </template>
    </app-table>
    <app-modal-notify
      v-if="notify.isShowNotify"
      :type="notify.type"
      title
      :description="notify.description"
      @close="notify.isShowNotify = false"
      @ok="notify.isShowNotify = false"
    />
  </div>
</template>

<script>
import { TRANSACTION_STATUSES } from "~/utils/constants";

import { mapActions, mapMutations } from "vuex";
import qs from "qs";
import { createRepayReq } from "~/models/payment/RepayReq";
import { RESPONSE_SUCCESS } from "~/utils/config";
import { fullDateTimeSlash } from '~/utils/moment';

export default {
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
        };
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      heads: [
        {
          name: "code",
          text: "Mã đơn hàng",
        },
        {
          name: "timestamp",
          text: "Thời gian",
          sort: true
        },
        {
          name: "desc",
          text: "Sản phẩm",
        },
        {
          name: "cost",
          text: "Tổng tiền",
        },
        {
          name: "status",
          text: "Trạng thái",
        },
        {
          name: "method",
          text: "Phương thức TT",
        }
      ],
      statusPending: TRANSACTION_STATUSES.PENDING,
      statusCancel: TRANSACTION_STATUSES.CANCEL,
      notify: {
        type: "",
        description: "",
        isShowNotify: false
      }
    };
  },

  computed: {
    listWithLocalTime() {
      return this.list.map(item => {
        return {
          ...item,
          timestamp: fullDateTimeSlash(item.timestamp)
        }
      })
    }
  },

  methods: {
    ...mapActions("payment", ["postRepay", "cancelPay"]),
    ...mapMutations("account", ["setForceGetTransactionList"]),

    handleRepayOrder(item) {
      console.log("[handleRepayOrder]", item);
      const repayReq = createRepayReq({
        vpc_ReturnURL: process.env.PAYMENT_RETURN_URL,
        vpc_Amount: item.cost,
        AgainLink: process.env.PAYMENT_AGAIN_LINK,
        Title: item.desc,
        vpc_OrderInfo: item.order_id
      });

      // get new haskey for payment
      this.postRepay(repayReq).then(hashKeyRes => {
        console.log("[handleRepayOrder] hashKeyRes", hashKeyRes);
        if (hashKeyRes.success == RESPONSE_SUCCESS) {
          // call onepay for payment
          const onepayUrlWithParams = `${
            process.env.PAYMENT_REQ_URL
          }?${qs.stringify(hashKeyRes.data)}`;

          console.log(
            "[postHashKeyGenerate] onepayUrlWithParams",
            onepayUrlWithParams
          );
          window.location.href = onepayUrlWithParams;
        } else {
          console.log("[dosomething else]");
          this.notify = {
            type: "error",
            description: "Thanh toán lại thất bại",
            isShowNotify: true
          };
        }
      });
    },

    handleCancelOrder(item) {
      console.log("[handleCancelOrder]", item);
      this.cancelPay(item.tx_id).then(result => {
        console.log("[cancelPay]", result);
        if (result.success == RESPONSE_SUCCESS) {
          this.notify = {
            type: "success",
            description: "Huỷ giao dịch thành công",
            isShowNotify: true
          };
          this.setForceGetTransactionList();
        } else {
          this.notify = {
            type: "error",
            description: "Huỷ giao dịch thất bại",
            isShowNotify: true
          };
        }
      });
    },

    onPageChange(e) {
      this.$emit("changedPagination", e);
    },
    statusClass(type, action) {
      if (type == TRANSACTION_STATUSES.SUCCESS) {
        return { "text-success": true };
      } else if (type == TRANSACTION_STATUSES.PENDING) {
        if (action == "repay") {
          return { "text-success": true, "text-clickable": true }; // allow to click to repay
        } else {
          return { "text-error": true, "text-clickable": true, "ml-10": true }; // allow to click to cancel
        }
      } else if (type == TRANSACTION_STATUSES.FAILED) {
        return { "text-error": true };
      } else if (type == TRANSACTION_STATUSES.CANCEL_SUCCESS) {
        return { "text-default": true };
      } else {
        return {};
      }
    }
  }
};
</script>

<style scoped>
</style>