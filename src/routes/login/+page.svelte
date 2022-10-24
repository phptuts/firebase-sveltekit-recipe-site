<script lang="ts">
  import { Row, Col } from 'sveltestrap';
  import firebase from 'firebase/compat/app';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import authStore from '../../stores/authStore';

  async function loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      await firebase.auth().signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  }

  const sub = authStore.subscribe(async (info) => {
    if (info.isLoggedIn) {
      await goto('/');
    }
  });

  onDestroy(() => {
    sub();
  });
</script>

<Row>
  <Col>
    <h1>Login with Google</h1>
  </Col>
</Row>

<Row>
  <Col>
    <img
      on:click={loginWithGoogle}
      src="/login-with-google.png"
      alt="Login With Google"
    />
  </Col>
</Row>

<style>
  img {
    cursor: pointer;
  }
</style>
