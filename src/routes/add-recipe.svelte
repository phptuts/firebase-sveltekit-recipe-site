<script lang="ts">
  import { goto } from "$app/navigation";

  import authStore from "../stores/authStore";
  import * as yup from "yup";
  import { createForm } from "svelte-forms-lib";
  import {
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    Label,
    Alert,
  } from "sveltestrap/src";

  const schema = yup.object().shape({
    title: yup.string().required().min(4).max(50),
    description: yup.string().required().min(10).max(1000),
    ingredients: yup
      .array()
      .required()
      .min(1)
      .max(10)
      .of(
        yup.object().shape({
          name: yup.string().required().min(2).max(10),
          unit: yup.mixed().oneOf(["none", "ounces", "cups", "pounds"]),
          amount: yup.number().required().min(1).max(30000),
        })
      ),
  });

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      title: "",
      description: "",
      ingredients: [
        {
          name: "",
          units: "none",
          amount: 1,
        },
      ],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const addIngredient = () => {
    $form.ingredients = $form.ingredients.concat({
      name: "",
      units: "none",
      amount: 1,
    });

    $errors.ingredients = $errors.ingredients.concat({
      name: "",
      units: "",
      amount: "",
    });
  };

  const removeIngredient = (index: number) => {
    $form.ingredients = $form.ingredients.filter((i, j) => j !== index);
    $errors.ingredients = $errors.ingredients.filter((i, j) => j !== index);
  };

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
<Row class="mb-4 mt-4">
  <Col>
    <h2>Ingredients</h2>
  </Col>
  <Col>
    <Button class="float-end" on:click={addIngredient} color="primary"
      >Add Ingredient</Button
    >
  </Col>
</Row>
{#if typeof $errors.ingredients === "string" && !$errors.ingredients.includes("[object")}
  <Alert color="danger">{$errors.ingredients}</Alert>
{/if}
{#each $form.ingredients as ingredient, i}
  <Row>
    <Col sm={5}>
      <FormGroup>
        <Label for={`ingredients[${i}][name]`}>Name</Label>
        <Input
          on:change={handleChange}
          bind:value={$form.ingredients[i].name}
          invalid={$errors.ingredients[i]["name"] &&
            $errors.ingredients[i]["name"].length > 0}
          type="text"
          name={`ingredients[${i}][name]`}
          id={`ingredients[${i}][name]`}
          placeholder="Name"
        />
        {#if $errors.ingredients[i]["name"]}
          <div class="invalid-feedback">{$errors.ingredients[i]["name"]}</div>
        {/if}
      </FormGroup>
    </Col>
    <Col sm={4}>
      <FormGroup>
        <Label for={`ingredients[${i}][units]`}>Units</Label>
        <Input
          on:change={handleChange}
          bind:value={$form.ingredients[i].units}
          type="select"
          name={`ingredients[${i}][amount]`}
          id={`ingredients[${i}][amount]`}
        >
          <option>None</option>
          <option>Pounds</option>
          <option>Ounces</option>
          <option>Cups</option>
        </Input>
      </FormGroup>
    </Col>

    <Col sm={2}>
      <FormGroup>
        <Label for={`ingredients[${i}][amount]`}>Amount</Label>
        <Input
          on:change={handleChange}
          bind:value={$form.ingredients[i]["amount"]}
          invalid={$errors.ingredients[i]["amount"] &&
            $errors.ingredients[i]["amount"].length > 0}
          type="number"
          min="1"
          max="300000"
          name={`ingredients[${i}][amount]`}
          id={`ingredients[${i}][amount]`}
        />
        {#if $errors.ingredients[i]["amount"]}
          <div class="invalid-feedback">{$errors.ingredients[i]["amount"]}</div>
        {/if}
      </FormGroup>
    </Col>
    <Col sm={1}>
      <i class="fas fa-trash" on:click={() => removeIngredient(i)} />
    </Col>
  </Row>
{/each}
<Row>
  <Col>
    <Button on:click={handleSubmit} class="w-100" color="success">Submit</Button
    >
  </Col>
</Row>

<style>
  .fa-trash {
    margin-top: 35px;
    color: rgb(254, 131, 131);
    cursor: pointer;
    font-size: 25px;
  }
</style>
