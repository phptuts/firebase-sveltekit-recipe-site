<script lang="ts">
  import { Container } from 'sveltestrap';
  import { onMount } from 'svelte';
  import authStore from '../stores/authStore';
  import NavBar from '../components/NavBar.svelte';
  import { onAuthStateChanged } from 'firebase/auth';

  import auth from '$lib/firebase/auth';

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true
      });
    });
  });
</script>

<NavBar />
<Container>
  <slot />
</Container>
