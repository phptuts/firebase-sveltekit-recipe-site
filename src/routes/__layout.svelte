<script context="module" lang="ts">
  import { initFirebase } from '../initFirebase';

  export async function load({ page, fetch, session, context }) {
    await initFirebase();
    return {
      props: {},
    };
  }
</script>

<script lang="ts">
  import { Container } from 'sveltestrap';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import { onMount } from 'svelte';
  import authStore from '../stores/authStore';
  import NavBar from '../components/NavBar.svelte';

  onMount(() => {
    firebase.auth().onAuthStateChanged((user) => {
      authStore.set({
        isLoggedIn: user !== null,
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
