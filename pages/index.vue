<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <img src="logo.png" width="600" alt="Logo" class="w-32 mx-auto mb-8" />
      <div id="core" class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  name: 'Index',
  components: {
    Search
  }
}
</script>

<style scoped>
  #core {
    min-width: 90vw;
    min-height: 70vh;
    @media (min-width: 768px) {
      min-width: 60vw;
    }
  }
</style>