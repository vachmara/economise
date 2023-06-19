<template>
  <div class="p-3">
    <div
      v-if="isSkeleton"
      class="animate-pulse p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary"
    >
      <div
        class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
      ></div>
      <hr class="mb-4 mt-4"/>
      <div class="flex flex-row align-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        -
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
        -
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        -
      </div>
      <h3 class="font-bold">Ingrédients :</h3>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <h3 class="font-bold mt-3">Instructions :</h3>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <h3 class="font-bold mt-3">Notes :</h3>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
    </div>

    <div
      v-else
      class="p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary"
      :class="isDisabled ? 'opacity-50 cursor-default' : ''"
      @click="isDisabled ? null : openModal()"
    >
      <h2 class="text-xl font-bold">{{ recipe.title }}</h2>
      <hr class="mb-4 mt-4"/>
      <div class="flex flex-row align-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ recipe.preparation_time }}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
        {{ recipe.cooking_time }}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        {{recipe.people}}
      </div>
      <h3 class="font-bold">Ingrédients :</h3>
      <ul>
        <li
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
          class="list-disc list-inside"
        >
          {{ ingredient.name }} - {{ ingredient.quantity }}
        </li>
      </ul>
      <h3 class="font-bold mt-3">Instructions :</h3>
      <ol>
        <li
          v-for="(instruction, index) in recipe.instructions"
          :key="index"
          class="list-decimal list-inside"
        >
          {{ instruction }}
        </li>
      </ol>
      <h3 class="font-bold mt-3">Notes :</h3>
      <p>{{ recipe.notes }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: () => ({}),
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isSkeleton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: all 0.3s;
}
.modal-transition-enter-from,
.modal-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
h3 {
  padding: 10px 0px 10px 0px;
}

li::marker {
  width: 15px;
}
</style>