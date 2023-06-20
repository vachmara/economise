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
        class="bg-primary text-xs font-medium h-4 text-blue-100 text-center p-0.5 leading-none rounded-full"
        :style="`width: ${percentage()}%`"
      >
        {{ percentage() ? `${percentage()}%` : "" }}
      </div>
    </div>
    <div class="mt-4">
      <label class="typo__label">Choisi tes ingrédients :</label>
      <div id="ingredients">
        <multiselect
          v-model="values"
          placeholder="Renseignes les ingrédients dans ton frigo ou ton placard"
          open-direction="bottom"
          :loading="isLoading"
          :disabled="isLoading"
          :options="options"
          :multiple="true"
          :searchable="true"
          :internal-search="true"
          :clear-on-select="false"
          :close-on-select="false"
          :limit-text="limitText"
          :options-limit="300"
          :limit="10"
          :max-height="200"
          :show-no-results="false"
          :hide-selected="true"
        >
          <template slot="clear">
            <b class="multiselect__clear" v-if="values.length" @mousedown.prevent.stop="clearAll()">Reset</b>
          </template>
        </multiselect>
      </div>
    </div>
    
    <carousel :perPage="1" :navigationEnabled="true" :autoplay="true" :loop="true" :autoplayTimeout="10000" navigationNextLabel="⟩" navigationPrevLabel="⟨" class="mt-3">
      <slide v-for="(recipe, index) in recipes" :key="index">
        <RecipeCard :recipe="recipe" :isSkeleton="isLoading" :isDisabled="values.length < MINIMUM_INGREDIENTS" />
      </slide>
    </carousel>

    <div class="w-full flex align-center justify-center mt-4">
      <button
        id="generate"
        :class="`w-1/2 h-10 font-bold py-2 px-4 rounded bg-primary ${values.length < MINIMUM_INGREDIENTS ? 'opacity-50 cursor-not-allowed' : ''}`"
        @click="values.length < MINIMUM_INGREDIENTS ? null : generateRecipes()"
      >
        <div v-if="isLoading" class="stage p-4">
           <div class="dot-typing" />
        </div>
        <span v-else>Générer une recette</span>
      </button>
      
    </div>
  </div>
</template>

<script>
// Notification
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// Assets
import Ingredients from "~/assets/ingredients.json";
import RecipeExample from "~/assets/recipe_example.json";

// Components
import RecipeCard from "./RecipeCard.vue";
import { Carousel, Slide } from 'vue-carousel';

export default {
  data() {
    return {
      isLoading: null,
      values: ["Pomme de terre"],
      options: Ingredients.options,
      recipes: [
        RecipeExample
      ],
      MINIMUM_INGREDIENTS: 4,
    };
  },
  components: {
    RecipeCard,
    Carousel,
    Slide,
  },
  methods: {
    clearAll() {
      this.values = [];
    },
    limitText (count) {
      return `et ${count} autres ingrédients`
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
    async generateRecipes(){
      this.isLoading = true;
      
      try{
        const { data } = await this.$axios.post("/generateRecipe", {
          ingredients: this.values
        })

        if(this.recipes.length > 0 && this.recipes[0] === RecipeExample)
          this.recipes.splice(0, 1);
        
        this.recipes.push(data.recipe);

        Swal.fire({
          title: 'Recette générée.',
          text: 'Voici votre recette générée aléatoirement grâce à chatGPT.',
          icon: 'success',
          confirmButtonText: 'Cool !'
        })
      }
      catch(e){
        console.log(e)
        Swal.fire({
          title: 'Oops...',
          text: 'Une erreur est survenue, veuillez réessayer plus tard',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      finally{
        this.isLoading = false;
      }
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@use 'three-dots' with (
  $dot-color: #fff,
  $dot-width: 10px,
  $dot-height: 10px,
); 

.multiselect__input,
.multiselect__single {
  min-height: 30px;
}

.multiselect__clear {
    position: absolute;
    right: 41px;
    height: 40px;
    display: flex !important;
    align-items: center;
    width: 40px;
    display: block;
    cursor: pointer;
    z-index: 2;
}

.multiselect__clear:hover{
  cursor: pointer;
}

.multiselect__tag, .multiselect__option--highlight, .multiselect__option--highlight::after {
  background-color: #61e2e7 !important;
  color: #ffffff;
}

#progress_bar > div {
  transition: width 0.5s ease-in-out;
}

#ingredients{
  min-height: 80px;
}

#card {
  position: relative;
  min-height: 70vh;
}

#generate {
  color: rgb(56, 56, 56);
  transition: color 0.2s ease-in-out;
}

#generate:hover {
  color: rgb(31, 31, 31);
  transition: color 0.2s ease-in-out;
}

.stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.swal2-confirm{
  background-color: #61e2e7 !important;
  border-color: #61e2e7 !important;
  color: rgb(56, 56, 56) !important;
}

</style> 