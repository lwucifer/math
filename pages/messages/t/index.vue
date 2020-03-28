<template>
  <h1>Bạn hiện đang không có chat nào</h1>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { redirectWithParams } from "../../../utils/common";
export default {
  middleware: "authenticated",
  async fetch({ params, query, store, redirect }) {
    const data = await store.dispatch(
      `message/${actionTypes.MESSAGE_GROUP.GROUP_LIST}`
    );
    const dataRooms = data.rooms ? data.rooms : [];
    const id = dataRooms.filter(item => item.type == 1)[0].id;
    redirect(`/messages/t/${id}`);
  }
};
</script>

<style>
</style>