<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap/src';
  import authStore from '../stores/authStore';

  import { getAuth, signOut } from 'firebase/auth';

  let isOpen = false;

  // handles the logout of
  async function logout() {
    signOut(getAuth());
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">Recipe Site</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md">
    <Nav class="ms-auto" navbar>
      {#if $authStore.firebaseControlled}
        {#if !$authStore.isLoggedIn}
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        {:else}
          <NavItem>
            <NavLink on:click={logout}>Logout</NavLink>
          </NavItem>
        {/if}
      {/if}
    </Nav>
  </Collapse>
</Navbar>
