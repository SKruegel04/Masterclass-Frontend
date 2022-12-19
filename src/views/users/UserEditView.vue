<template>
  <div v-if="state.editedUser" class="container">
    <div class="alert alert-success">
      <h4>Nutzer wurde erfolgreich geändert</h4>
      <RouterLink :to="{ name: 'users' }" class="btn btn-success">
        Zur Nutzerübersicht
      </RouterLink>
    </div>
  </div>
  <div v-if="state.editedUser === null" class="container">
    <h1>Nutzer bearbeiten</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Name"
          :disabled="state.submitting"
          required
          minlength="2"
        />
      </div>
      <div class="form-group">
        <label for="description">Beschreibung</label>
        <textarea
          v-model="user.description"
          class="form-control"
          id="description"
          :disabled="state.submitting"
          required
          minlength="4"
        ></textarea>
      </div>
      <button
        :disabled="state.submitting"
        type="submit"
        class="btn btn-primary mt-4"
      >
        Nutzer speichern
      </button>
    </form>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { reactive } from "vue";

const route = useRoute();

const user = reactive({
  name: "",
  description: "",
});

const state = reactive({
  submitting: false,
  loadingUser: false,
  editedUser: null,
});

const loadUser = async () => {
  state.loadingUser = true;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${route.params.id}`
  );
  const fetchedUser = await response.json();
  user.name = fetchedUser.name;
  user.description = fetchedUser.description;
};

const onSubmit = async () => {
  state.submitting = true;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${route.params.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; encoding=utf-8",
      },
      body: JSON.stringify(user),
    }
  );
  state.editedUser = await response.json();
  state.submitting = false;
};

loadUser();
</script>

<style scoped></style>
