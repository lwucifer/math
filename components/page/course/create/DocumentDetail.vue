<template>
  <div
    class="clc-choosen-doc-item d-flex align-items-center justify-content-between mb-3"
  >
    <span class="text-sub d-flex align-items-center">
      <IconFileBlank class="icon body-1 mr-2" />tailieudaisolop10.docx (25.6kB)
    </span>

    <a href>
      <IconTrashAlt class="icon subheading fill-secondary" />
    </a>
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");

export default {
  components: {
    IconTrashAlt,
    IconFileBlank
  }
};
</script>
