<template>
  <div class="box">
    <div class="row">
      <TabMessage :isCreated="isCreate" :isGroup="isGroup" />
      <!-- <TabInfo :isGroup="isGroup" /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import * as actionTypes from "~/utils/action-types";
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconImage from "~/assets/svg/icons/image.svg?inline";
import TabContact from "~/components/page/chat/TabContact";
import TabMessage from "~/components/page/chat/TabMessage";
import TabInfo from "~/components/page/chat/TabInfo";

import * as constants from "~/utils/constants";

import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    Logo,
    IconCaretDown,
    IconImage,
    TabMessage,
    TabContact,
    TabInfo
  },

  async fetch({ params, query, store, route }) {
    const userId = store.state.auth.token ? store.state.auth.token.id : "";
    const room_id = route.params.id;
    const paramsOptions = {};
    // const payloadMessage = {
    //   from_message_id: "9a958a79-a3be-11ea-ba28-997cc905388a",
    //   fetch_type: "prior"
    // };
    await Promise.all([
      // store.dispatch(`chat/${actionTypes.CHAT.MESSAGE_LIST}`, {
      //   payloadMessage,
      //   id: "f6a3b88b-b6cd-49c5-988a-6864e58e429a",
      //   end: "messages"
      // }),
      //   store.dispatch(`message/${actionTypes.MESSAGE_GROUP.GROUP_LIST}`),
      // store.dispatch(`chat/${actionTypes.CHAT.MESSAGE_LIST}`, {
      //   params: payloadMessage,
      //   id: room_id,
      //   end: "messages"
      // }),
      //   store.dispatch(`message/${actionTypes.MESSAGE_GROUP.MEMBER_LIST}`, {
      //     params: {
      //       room_id: room_id
      //     }
      //   }),
      store.dispatch(`chat/${actionTypes.CHAT.ROOM_DETAIL}`, room_id)
      // store.dispatch(`account/${actionTypes.ACCOUNT_PERSONAL.LIST}`, userId)
    ]);
  },
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    isGroup: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // isGroup: false,
      // isCreate: false,
      socket: null
    };
  },

  mounted() {
    // Connect socket
    this.initSocket();

    // listen socket channel
    // this.socket.on("join_room", (data) => {
    //   console.log("[on join_room]", data);
    // });
  },
  computed: {
    ...mapState("message", ["messageEmit"]),
    ...mapGetters("auth", ["getSocketURIParam", "userId", "fullName"])
  },

  methods: {
    ...mapMutations("message", ["setOnMessage"]),
    async initSocket() {
      // init socket
      // URI: http://178.128.80.30:9994?user_id=xxx&token=xxx&unique_id=xxx
      let uriParam = `${process.env.SOCKET_URI}?${this.getSocketURIParam}`;
      console.log("[socket] [uriParam]", uriParam);
      this.socket = await io(`${uriParam}`);

      // connect socket
      if (!this.socket.connected) {
        this.socket.connect();
      }

      // on handle status message
      // this.socket.on(constants.CHAT.STATUS_HANDLE, data => {
      //   console.log("[socket]", data);
      // });

      // on handle message
      this.socket.on(constants.CHAT.MESSAGE, data => {
        console.log("[socket] messageOn", data);
        this.setOnMessage(data);
      });

      // join room with id
      const params = {
        room_id: this.$route.params.id,
        user: {
          id: this.userId,
          fullname: this.fullName
        }
      };
      console.log("[params]", params);
      this.socket.emit(constants.CHAT.JOIN_ROOM, params, res => {
        console.log("[socket] User has joined this channel", res);
      });
    }
  },

  beforeDestroy() {
    this.socket.off("join_room");
  },
  watch: {
    messageEmit(_newVal) {
      if (_newVal) {
        const uuidV4 = uuidv4();
        const paramsMessage = {
          uuid: uuidV4,
          user_id: this.userId,
          room_id: _newVal.room_id,
          content: _newVal.content ? _newVal.content : "",
          img_url: _newVal.img_url ? _newVal.img_url : "",
          message_id: _newVal.message_id ? _newVal.message_id : "",
          avatar: _newVal.avatar ? _newVal.avatar : "",
          fullname: _newVal.fullname ? _newVal.fullname : "",
          file_url: _newVal.file_url ? _newVal.file_url : "",
          file_name_upload: _newVal.file_name_upload
            ? _newVal.file_name_upload
            : ""
        };
        console.log("[socket] params emit message", paramsMessage);
        this.socket.emit(constants.CHAT.MESSAGE, paramsMessage, res => {
          console.log("[socket] User has joined this channel", res);
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_page_messages.scss";
</style>