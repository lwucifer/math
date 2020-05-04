<template>
  <div></div>
</template>

<script>
import { getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";

export default {
  async created() {
    // const payload = {
    //   vpc_Amount: getParamQuery("vpc_Amount"),
    //   vpc_Card: getParamQuery("vpc_Card"),
    //   vpc_CardNum: getParamQuery("vpc_CardNum"),
    //   vpc_CardUid: getParamQuery("vpc_CardUid"),
    //   vpc_Command: getParamQuery("vpc_Command"),
    //   vpc_CurrencyCode: getParamQuery("vpc_CurrencyCode")
    //     ? getParamQuery("vpc_CurrencyCode")
    //     : null,
    //   vpc_Locale: getParamQuery("vpc_Locale")
    //     ? getParamQuery("vpc_Locale")
    //     : null,
    //   vpc_MerchTxnRef: getParamQuery("vpc_MerchTxnRef"),
    //   vpc_Merchant: getParamQuery("vpc_Merchant"),
    //   vpc_Message: getParamQuery("vpc_Message"),
    //   vpc_OrderInfo: getParamQuery("vpc_OrderInfo"),
    //   vpc_OrgAmount: getParamQuery("vpc_OrgAmount"),
    //   vpc_PayChannel: getParamQuery("vpc_PayChannel"),
    //   vpc_SecureHash: getParamQuery("vpc_SecureHash"),
    //   vpc_TransactionNo: getParamQuery("vpc_TransactionNo"),
    //   vpc_TxnResponseCode: getParamQuery("vpc_TxnResponseCode"),
    //   vpc_Version: getParamQuery("vpc_Version"),
    // };
    const payload = get(this, "$router.history.current.query", {});
    console.log(payload)
    // const res = await this.$store.dispatch(
    //   `payment/${actionTypes.PAYMENT.VALIDATE_TRANSACTION}`,
    //   payload
    // );
    // if (res.success) {
    //   this.$router.push("/payment/success");
    //   return;
    // }
    // this.$router.push("/payment/fail");
  },
};
</script>
