<template>
  <div class="w-full mx-auto" id="card">
    <div class="mb-5 text-lg font-medium dark:text-white text-center w-full">
      🎉 Économise et optimise tes courses avec notre outil. 🎉
    </div>
    <div
      id="progress_bar"
      class="w-full bg-gray-200 h-4 rounded-full dark:bg-gray-700"
    >
      <div
        class="bg-blue-600 text-xs font-medium h-4 text-blue-100 text-center p-0.5 leading-none rounded-full"
        :style="`width: ${percentage()}%`"
      >
        {{ percentage() ? `${percentage()}%` : "" }}
      </div>
    </div>
    <div class="mt-4">
      <label class="typo__label">Choisi tes ingrédients :</label>
      <multiselect
        v-model="values"
        id="ingredients"
        placeholder="Renseignes les ingrédients dans ton frigo ou ton placard"
        open-direction="bottom"
        :options="options"
        :multiple="true"
        :searchable="true"
        :internal-search="true"
        :clear-on-select="false"
        :close-on-select="false"
        :options-limit="300"
        :limit="10"
        :max-height="200"
        :show-no-results="false"
        :hide-selected="true"
      />
    </div>
    
    <button
      id="generate"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="generateRecipes"
      :disabled="values.length < MINIMUM_INGREDIENTS"
    >
      Générer des recettes
    </button>
  </div>
</template>

<script>
import Ingredients from "~/assets/ingredients.json";

export default {
  data() {
    return {
      values: ["Pomme de terre"],
      options: Ingredients.options,
      MINIMUM_INGREDIENTS: 4,
    };
  },
  methods: {
    clearAll() {
      this.values = [];
    },
    generateRecipes() {
      console.log(this.values);
    },
    remove(option) {
      const index = this.values.indexOf(option.name);
      if (index >= 0) {
        this.values.splice(index, 1);
      }
    },
    percentage() {
      const percentage = parseInt(
        (this.values.length * 100) / this.MINIMUM_INGREDIENTS
      );
      return percentage > 100 ? 100 : percentage;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect__input,
.multiselect__single {
  min-height: 30px;
}

#progress_bar > div {
  transition: width 0.5s ease-in-out;
}

#card {
  position: relative;
  height: 70vh;
}

#generate{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}
</style> 