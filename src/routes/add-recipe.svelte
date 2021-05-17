<script lang="ts">
	import { goto } from '$app/navigation';

	import { Row, Col } from 'sveltestrap';
	import authStore from '../stores/authStore';

	authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
		if (!isLoggedIn && firebaseControlled) {
			await goto('/login');
		}
	});
</script>

<Row>
	<Col>
		<h1>Add Recipe</h1>
	</Col>
</Row>
