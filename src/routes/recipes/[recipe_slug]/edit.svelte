<script lang="ts">
  import RecipeForm from '../../../components/recipe-form.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getRecipe } from '../../../db';
  let recipe = null;
  let recipeId = null;

  page.subscribe(async (param) => {
    const recipeSlug = param.params['recipe_slug'];
    recipeId = recipeSlug.split('-')[0];
    recipe = await getRecipe(recipeId);
  });
</script>

{#if recipe}
  <RecipeForm type="EDIT" {recipe} {recipeId} />
{/if}
