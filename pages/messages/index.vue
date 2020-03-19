<template></template>

<script>
import * as actionTypes from "~/utils/action-types";
import { redirectWithParams } from "../../utils/common";
export default {
  async fetch({ params, query, store, redirect }) {
    const data = await store.dispatch(
      `message/${actionTypes.MESSAGE_GROUP.GROUP_LIST}`
    );
    const dataRooms = data.rooms;
    const id = dataRooms.filter(item => item.type == 1)[0].id;
    redirect(`/messages/${id}`);
  }
};
</script>

<style>
</style>