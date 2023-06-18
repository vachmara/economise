<template>
  <div class="p-3">
    <div v-if="isSkeleton" class="animate-pulse p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <ul>
        <li
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
          class="list-disc list-inside"
        >
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4 w-1/2"></div>
        </li>
      </ul>
    </div>

    <div
      v-else
      class="p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary"
      :class="isDisabled ? 'opacity-50 cursor-default' : ''"
      @click="isDisabled ? null : openModal()"
    >
      <h2 class="text-xl font-bold">{{ recipe.title }}</h2>
      <ul>
        <li
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
          class="list-disc list-inside"
        >
          {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <transition name="modal-transition">
      <Modal v-show="showModal" @close="closeModal">
        <template v-slot:header>
          <h2 class="text-2xl font-bold">
            {{ recipe.title }}
            <button
              type="button"
              class="float-right font-bold text-xl hover:text-blue-500"
              @click="closeModal"
            >
              &times;
            </button>
          </h2>
        </template>

        <template v-slot:body>
          <div>
            <h3 class="font-bold">
              Préparation estimée: {{ recipe.preparation_time }}
            </h3>
            <h3 class="font-bold">
              Cuisson estimée: {{ recipe.cooking_time }}
            </h3>
            <h3 class="font-bold">
              Nombre de personnes: {{ recipe.people_quantity }}
            </h3>
          </div>
          <h3 class="font-bold">Ingrédients:</h3>
          <ul>
            <li
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="list-disc list-inside"
            >
              {{ ingredient.name }} - {{ ingredient.quantity }}
            </li>
          </ul>
          <h3 class="font-bold">Instructions:</h3>
          <ol>
            <li
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
              class="list-decimal list-inside"
            >
              {{ instruction }}
            </li>
          </ol>
          <p>{{ recipe.notes }}</p>
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
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

li::marker{
    width: 15px;
}
</style>