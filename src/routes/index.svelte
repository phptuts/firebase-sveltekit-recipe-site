<script lang="ts">
  import { Row, Col, Button } from "sveltestrap";
  import firebase from "firebase/app";
  import authStore from "../stores/authStore";
  async function logout() {
    await firebase.auth().signOut();
  }
</script>

{#if $authStore.isLoggedIn}
  <Row>
    <Col>
      <Button on:click={logout} color="danger">Logout</Button>
    </Col>
  </Row>
{/if}
