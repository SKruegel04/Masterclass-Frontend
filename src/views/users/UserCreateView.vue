<template>
  <div v-if="state.createdUser" class="container">
    <div class="alert alert-success">
      <h4>Du hast erfolgreich einen Nutzer angelegt!</h4>
      <RouterLink :to="{ name: 'users' }" class="btn btn-success">
        Zur Nutzerliste
      </RouterLink>
    </div>
  </div>
  <div v-if="state.createdUser === null" class="container">
    <h1>Nutzer anlegen</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Name</label>
        <input
          v-model="user.name"
          type="text"
          class="form-control"
          id="Name"
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
        Jetzt Nutzer anlegen
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const user = reactive({
  name: "",
  description: "",
});

const state = reactive({
  submitting: false,
  createdUser: null,
  loadingUsers: false,
});

const onSubmit = async () => {
  state.submitting = true;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; encoding=utf-8",
    },
    body: JSON.stringify(user),
  });
  state.createdUser = await response.json();
  state.submitting = false;
};
</script>

<style scoped></style>
