<template>
  <div class="container icons-page">
    <h1 class="mb-3">Icons from /svg/icons</h1>
    <div class="row mb-5">
      <div class="col-2 my-3 text-center" v-for="icon in icons" :key="icon.path">
        <div>
          <component
            :is="icon.icon.default"
            class="icon"
            fill="#000"
            @click="handleClick(icon.path)"
          />
        </div>
        <span class="caption">{{ icon.path }}</span>
      </div>
    </div>

    <h1 class="mb-3">Icons from /svg/design-icons</h1>
    <div class="row">
      <div class="col-2 my-3 text-center" v-for="icon in designIcons" :key="icon.path">
        <div>
          <component
            :is="icon.icon.default"
            class="icon"
            fill="#000"
            @click="handleClick(icon.path)"
          />
        </div>
        <span class="caption">{{ icon.path }}</span>
      </div>
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
              <br />
              &nbsp;&nbsp;&nbsp;
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
</template>

<script>
export default {
  data: () => ({
    modal: false,
    dataModal: {},
    icons: [],
    designIcons: []
  }),

  head() {
    return {
      title: 'Icons - Schoolly'
    }
  },

  created() {
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    const req = require.context(
      "../../assets/svg/icons?inline",
      false,
      /.*\.svg$/
    );

    const req2 = require.context(
      "../../assets/svg/design-icons?inline",
      false,
      /.*\.svg$/
    );

    req.keys().forEach(key => {
      const icon = req(key);
      this.icons.push({ path: key, icon });
    });

    req2.keys().forEach(key => {
      const icon = req2(key);
      this.designIcons.push({ path: key, icon });
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
      return `~/assets/svg/icons/${fileName}?inline`;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 22px;
  cursor: pointer;
}

.modal-content {
  padding: 4rem 2rem;
  font-size: 1.6rem;
}
</style>