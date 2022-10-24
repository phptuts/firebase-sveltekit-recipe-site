<script context="module" lang="ts">

</script>

<script lang="ts">
  import { Container } from 'sveltestrap';
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import { onMount } from 'svelte';
  import authStore from '../stores/authStore';
  import NavBar from '../components/NavBar.svelte';

  onMount(() => {
    firebase.auth().onAuthStateChanged((user) => {
      authStore.set({
        isLoggedIn: user !== null,
         // @ts-ignore:
        user,
        firebaseControlled: true,
      });
    });
  });
</script>

<NavBar />
<Container>
  <slot />
</Container>
