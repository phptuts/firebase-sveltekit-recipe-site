<script lang="ts">
  import { goto } from "$app/navigation";

  import authStore from "../stores/authStore";
  import * as yup from "yup";
  import { createForm } from "svelte-forms-lib";
  import { Row, Col, Button, FormGroup, Input, Label } from "sveltestrap/src";

  const schema = yup.object().shape({
    title: yup.string().required().min(4).max(5),
    description: yup.string().required().min(10).max(1000),
  });

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (!isLoggedIn && firebaseControlled) {
      await goto("/login");
    }
  });
</script>

<Row>
  <Col>
    <h1>Add Recipe</h1>
  </Col>
</Row>

<Row>
  <Col>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input
        on:change={handleChange}
        bind:value={$form.title}
        invalid={$errors.title.length > 0}
        type="text"
        name="title"
        id="title"
        placeholder="Recipe Title"
      />
      {#if $errors.title}
        <div class="invalid-feedback">{$errors.title}</div>
      {/if}
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col>
    <FormGroup>
      <Label for="title">Description</Label>
      <Input
        on:change={handleChange}
        bind:value={$form.description}
        invalid={$errors.description.length > 0}
        type="textarea"
        name="description"
        id="description"
        placeholder="Recipe Description"
      />
      {#if $errors.description}
        <div class="invalid-feedback">{$errors.description}</div>
      {/if}
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col>
    <Button on:click={handleSubmit} class="w-100" color="success">Submit</Button
    >
  </Col>
</Row>
