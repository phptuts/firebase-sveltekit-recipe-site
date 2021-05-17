<script lang="ts">
	import { Container } from 'sveltestrap';
	import firebase from 'firebase/app';
	import 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '../stores/authStore';

	onMount(() => {
		const firebaseConfig = {
			apiKey: 'AIzaSyD5p9J1bkYxy3MmIvfZs2t8Gteuv3N8ZgY',
			authDomain: 'noahvideos.firebaseapp.com',
			databaseURL: 'https://noahvideos.firebaseio.com',
			projectId: 'noahvideos',
			storageBucket: 'noahvideos.appspot.com',
			messagingSenderId: '826072574665',
			appId: '1:826072574665:web:3f7ca610c553a87eddfb18',
			measurementId: 'G-GEQPVWNR55'
		};

		firebase.initializeApp(firebaseConfig);

		firebase.auth().onAuthStateChanged((user) => {
			authStore.set({
				isLoggedIn: user !== null,
				user,
				firebaseControlled: true
			});
		});
	});
</script>

<Container>
	<slot />
</Container>
