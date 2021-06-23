<script lang="ts">
  import RecipeForm from '../components/recipe-form.svelte';

  function navigate(e) {
    console.log(e, 'save fired');
  }
</script>

<RecipeForm on:saved-ADD={navigate} type="ADD" />
