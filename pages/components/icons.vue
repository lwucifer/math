<template>
  <div class="container icons-page">
    <div class="row">
      <div class="col-auto ma-3" v-for="icon in icons" :key="icon.path">
        <component
          :is="icon.icon.default"
          class="icon"
          fill="#000"
          @click="handleClick(icon.path)"
        />
      </div>

      <app-modal v-if="modal" @close="hideModal" :width="600">
        <div class="modal-content" slot="content">
          <code>
            <div v-text="`<template>`"></div>
            <div>
              &nbsp;
              <span v-text="`<${convertIconComponentName(dataModal.path)} class='icon' />`"></span>
            </div>
            <div v-text="`</template>`"></div>
            <br />
            <div v-text="`<script>`"></div>
            <div>{{ `import ${convertIconComponentName(dataModal.path)} from '${convertIconPath(dataModal.path)}';` }}</div>
            <br />
            <div>
              export default {
              <br />&nbsp;
              <span>
                components: {
                <br />&nbsp;&nbsp;&nbsp;
                {{ convertIconComponentName(dataModal.path) }}
                <br />&nbsp;&nbsp;}
              </span>
              <br />}
            </div>
            <div v-text="`</script>`"></div>
          </code>
        </div>
      </app-modal>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false,
    dataModal: {},
    icons: []
  }),

  created() {
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    const req = require.context(
      "../../assets/svg/icons?inline",
      false,
      /.*\.svg$/
    );

    req.keys().forEach(key => {
      const icon = req(key);
      this.icons.push({ path: key, icon });
    });
  },

  methods: {
    handleClick(path) {
      this.dataModal = { path };
      this.modal = true;
    },

    hideModal() {
      this.modal = false;
      this.dataModal = {};
    },

    convertIconComponentName(path) {
      const fileName = path.replace(/(\.\/|.svg)/g, "");
      const fileNameConverted = fileName
        .split("-")
        .map(
          word => word.slice(0, 1).toUpperCase() + word.slice(1, word.length)
        )
        .join("");
      return `Icon${fileNameConverted}`;
    },

    convertIconPath(path) {
      const fileName = path.replace("./", "");
      return `~assets/svg/icons/${fileName}?inline`;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 16px;
  cursor: pointer;
}

.modal-content {
  padding: 4rem 2rem;
  font-size: 1.6rem;
}
</style>