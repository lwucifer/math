<template>
  <div class="page-message">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sidebar">
          <TabContact
            :contacts="contactList"
            :friends="friends"
            @addMessage="addMessage()"
            @clickTab="clickTab()"
          />
        </div>
        <div class="col-md-9 col-content">
          <div class="box">
            <div class="row">
              <TabMessage :isCreate="isCreate" />
              <TabInfo
                :fileshare="fileShareList"
                :imageshare="imageShareList"
                :members="friends"
                :isGroup="isGroup"
              />
            </div>
          </div>
        </div>
      </div>
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
    const userId = params.id;
    const room_id =
      // 18;
      route.params.id;
    // let listQuery = {
    //   page: 1,
    //   perPage: 10,
    //   user_id: 31
    // };
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_FRIEND.LIST}`, {
        params: {
          user_id: userId
        }
      }),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.GROUP_LIST}`),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.MESSAGE_LIST}`, {
        params: {
          room_id: room_id
        }
      }),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.MEMBER_LIST}`, {
        params: {
          room_id: room_id
        }
      }),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.GROUP_LIST_DETAIL}`, {
        params: {
          room_id: room_id
        }
      })
      // store.dispatch(`account/${actionTypes.ACCOUNT_PERSONAL.LIST}`, userId)
    ]);
  },

  data() {
    return {
      isGroup: false,
      contactList: [
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        }
      ],
      fileShareList: [
        {
          link: "#",
          title: "IrmaRussell_1.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        }
      ],
      imageShareList: [
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        }
      ],
      friends: [
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        }
      ],
      isCreate: false,
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
  created() {
    // debugger;
    // this.socket.on("join_room", function() {
    //   console.log("on join_room");
    //   var params = {
    //     room_id: this.$route.params.id
    //   };
    //   this.socket.emit("join_room", params, function() {
    //     console.log("User has joined this channel");
    //   });
    // });
  },
  computed: {
    ...mapState("message", ["messageEmit"]),
    ...mapGetters("auth", ["getSocketURIParam", "userId", "fullName"])
  },

  methods: {
    ...mapMutations("message", ["setOnMessage"]),
    addMessage() {
      this.isCreate = !this.isCreate;
    },

    clickTab() {
      this.isGroup = !this.isGroup;
    },
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
          fullname: _newVal.fullname ? _newVal.fullname : ""
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