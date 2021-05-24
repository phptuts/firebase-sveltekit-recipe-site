<script lang="ts">
  import { Container } from "sveltestrap";
  import firebase from "firebase/app";
  import "firebase/auth";
  import { onMount } from "svelte";
  import authStore from "../stores/authStore";
  import { firestore, initFirebase } from "../firestore";

  onMount(async () => {
    await initFirebase();
    await firestore();

    firebase.auth().onAuthStateChanged((user) => {
      authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true,
      });
    });
  });
</script>

<Container>
  <slot />
</Container>
