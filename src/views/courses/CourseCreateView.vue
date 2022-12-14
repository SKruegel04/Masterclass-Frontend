<template>
  <div v-if="state.createdCourse" class="container">
    <div class="alert alert-success">
      <h4>Dein Kurs wurde erfolgreich erstellt!</h4>
      <RouterLink :to="{ name: 'courses' }" class="btn btn-success">
        Zur Kursübersicht
      </RouterLink>
    </div>
  </div>
  <div v-if="state.createdCourse === null" class="container">
    <h1>Einen neuen Kurs anlegen</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Kursname</label>
        <input
          v-model="course.title"
          type="text"
          class="form-control"
          id="title"
          placeholder="Name des Kurses"
          :disabled="state.submitting"
          required
          minlength="4"
        />
      </div>
      <div class="form-group">
        <label for="description">Beschreibung</label>
        <textarea
          v-model="course.description"
          class="form-control"
          id="description"
          :disabled="state.submitting"
          required
          minlength="4"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="category">Kategorie</label>
        <input
          v-model="course.category"
          type="text"
          class="form-control"
          id="category"
          placeholder="z.B. Kampfsport, Tanz, Fitness, etc."
          :disabled="state.submitting"
          required
          minlength="4"
        />
      </div>
      <div class="form-group">
        <label for="userId">Trainer</label>
        <select
          v-model.number="course.userId"
          id="userId"
          class="form-control"
          :disabled="state.submitting || state.loadingUsers"
          required
        >
          <option v-for="user in state.users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">Datum</label>
        <input
          v-model="course.date"
          type="datetime-local"
          class="form-control"
          id="date"
          :disabled="state.submitting"
          required
        />
      </div>
      <div class="form-group">
        <label for="duration">Kursdauer</label>
        <select
          v-model.number="course.duration"
          id="duration"
          class="form-control"
          :disabled="state.submitting"
          required
        >
          <option value="30">30min</option>
          <option value="45">45min</option>
          <option value="60">1h</option>
          <option value="90">1h30min</option>
          <option value="120">2h</option>
          <option value="150">2h30min</option>
          <option value="180">3h</option>
        </select>
      </div>
      <button
        :disabled="state.submitting"
        type="submit"
        class="btn btn-primary mt-4"
      >
        Jetzt erstellen
      </button>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { reactive } from "vue";

const course = reactive({
  title: "",
  description: "",
  category: "",
  date: new Date().toISOString(),
  duration: 60,
  userId: null,
});

const state = reactive({
  submitting: false,
  createdCourse: null,
  loadingUsers: false,
  users: [],
});

const loadUsers = async () => {
  state.loadingUsers = true;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
  state.users = await response.json();
  state.loadingUsers = false;
};

const onSubmit = async () => {
  state.submitting = true;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; encoding=utf-8",
    },
    body: JSON.stringify(course),
  });
  state.createdCourse = await response.json();
  state.submitting = false;
};

loadUsers();
</script>

<style scoped></style>
