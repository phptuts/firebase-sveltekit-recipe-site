<script lang="ts">
  import { goto } from "$app/navigation";
  import '../yup';
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
  import authStore from "../stores/authStore";
  import { createRecipe } from "../db";

  const schema = yup.object().shape({
    title: yup.string().required().min(4).max(50),
    description: yup.string().required().min(10).max(1000),
    ingredients: yup
      .array()
      .min(1)
      .max(10)
      .of(
        yup.object().shape({
          name: yup.string().required().min(2).max(10),
          units: yup.mixed().oneOf(["n/a", "ounces", "cups", "pounds"]),
          amount: yup.number().min(1).max(30000),
        })
      ),
      mainPicture: yup
      .mixed()
      .required("Picture Required")
      .fileMax({
        maxBytes: 500000,
        message: "Max Image size is 50MB",
      })
      .fileFormat({
        formats: ["image/gif", "image/jpeg", "image/png"],
        message: "Images can only be png, gif, jpg",
      }),
  });

  const { form, errors, handleChange, handleSubmit, updateValidateField } = createForm({
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
      mainPicture: null
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await createRecipe(values, $authStore.user.uid);
        alert("Saved Recipe");
      } catch (e) {
        alert("error saving");
        console.log(e);
      }
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
      <Label for="title">Main Picture</Label>
      <Input
        on:change={(e) => updateValidateField("mainPicture", e.target.files[0])}
        invalid={$errors.mainPicture.length > 0}
        type="file"
        name="mainPicture"
        id="mainPicture"
      />
      {#if $errors.mainPicture}
        <div class="invalid-feedback">{$errors.mainPicture}</div>
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
    <Button on:click={addIngredient} class="float-end" color="primary"
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
        <Label for={`ingredients_${i}_name`}>Name</Label>
        <Input
          on:change={handleChange}
          bind:value={$form.ingredients[i]["name"]}
          invalid={$errors.ingredients[i]["name"] &&
            $errors.ingredients[i]["name"].length > 0}
          type="text"
          name={`ingredients[${i}].name`}
          id={`ingredients_${i}_name`}
          placeholder="Name"
        />
        {#if $errors.ingredients[i]["name"]}
          <div class="invalid-feedback">{$errors.ingredients[i]["name"]}</div>
        {/if}
      </FormGroup>
    </Col>
    <Col sm={4}>
      <FormGroup>
        <Label for={`ingredients_${i}_units`}>Units</Label>
        <Input
          on:change={handleChange}
          bind:value={$form.ingredients[i].units}
          type="select"
          name={`ingredients[${i}].units`}
          id={`ingredients_${i}_units`}
        >
          <option value="none">None</option>
          <option value="pounds">Pounds</option>
          <option value="ounces">Ounces</option>
          <option value="cups">Cups</option>
        </Input>
      </FormGroup>
    </Col>

    <Col sm={2}>
      <FormGroup>
        <Label for={`ingredients_${i}_amount`}>Amount</Label>
        <Input
          on:change={handleChange}
          bind:value={$form.ingredients[i]["amount"]}
          invalid={$errors.ingredients[i]["amount"] &&
            $errors.ingredients[i]["amount"].length > 0}
          type="number"
          min="1"
          max="300000"
          name={`ingredients[${i}]amount`}
          id={`ingredients_${i}_amount`}
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
<Row>
  <h2>Form</h2>
  <pre>
		{JSON.stringify($form, null, 2)}
	</pre>
</Row>
<Row>
  <h2>Errors</h2>
  <pre>
		{JSON.stringify($errors, null, 2)}
	</pre>
</Row>

<style>
  .fa-trash {
    margin-top: 35px;
    color: rgb(254, 131, 131);
    cursor: pointer;
    font-size: 25px;
  }
</style>
