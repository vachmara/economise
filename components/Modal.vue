<template>
  <div
    v-show="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
  >
    <div class=" bg-white rounded p-4 space-y-4 overflow-auto">
      <header class="border-b">
        <slot name="header"></slot>
      </header>

      <main class="mb-4">
        <slot name="body"></slot>
      </main>

      <footer>
        <button
          @click="close"
          class="py-1 px-3 text-white bg-blue-500 rounded-md hover:bg-blue-400"
        >
          Fermer
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>