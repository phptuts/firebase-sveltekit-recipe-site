<script context="module" lang="ts">
  import { firestore, initFirebase } from "../firestore";
  export async function load({ page, fetch, session, context }) {
    initFirebase();
    const db = await firestore();
    const pubData = await db.collection("public").get();
    try {
      const privData = await db.collection("private").get();
    } catch (e) {
      console.log("should see bad permission error");
      console.log(e);
    }

    return {
      props: {
        publicData: pubData.docs.map((d) => d.data()),
      },
    };
  }
</script>

<script lang="ts">
  export let publicData: Array<{ first: string; last: string }>;
  import { Row, Col, Button } from "sveltestrap";
  import firebase from "firebase/app";
  import authStore from "../stores/authStore";
  async function logout() {
    await firebase.auth().signOut();
  }
</script>

<Row>
  <Col>
    <h1>Welcome to the recipe site</h1>
  </Col>
</Row>

<Row>
  <Col>
    <h1>Public Data</h1>
    <ul>
      {#each publicData as item}
        <li>{item.first} / {item.last}</li>
      {/each}
    </ul>
  </Col>
</Row>

{#if $authStore.isLoggedIn}
  <Row>
    <Col>
      <Button on:click={logout} color="danger">Logout</Button>
    </Col>
  </Row>
{/if}
