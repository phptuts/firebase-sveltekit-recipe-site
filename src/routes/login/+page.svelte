<script lang="ts">
  import { Row, Col } from 'sveltestrap';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import authStore from '../../stores/authStore';

  import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await signInWithPopup(auth, provider);
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
      on:keypress={loginWithGoogle}
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
