<template>
  <div v-if="state.editedCourse" class="container">
    <div class="alert alert-success">
      <h4>Kurs wurde erfolgreich geändert</h4>
      <RouterLink :to="{ name: 'courses' }" class="btn btn-success">
        Zur Kursübersicht
      </RouterLink>
    </div>
  </div>
  <div v-if="state.editedCourse === null" class="container">
    <h1>Kurs bearbeiten</h1>

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
        Kurs speichern
      </button>
    </form>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { reactive } from "vue";

const route = useRoute();

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
  loadingCourse: false,
  editedCourse: null,
  loadingUsers: false,
  users: [],
});

const loadCourse = async () => {
  state.loadingCourse = true;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/courses/${route.params.id}`
  );
  const fetchedCourse = await response.json();
  course.title = fetchedCourse.title;
  course.description = fetchedCourse.description;
  course.category = fetchedCourse.category;
  course.date = fetchedCourse.date;
  course.duration = fetchedCourse.duration;
  course.userId = fetchedCourse.user.id;
  state.loadingCourse = false;
};

const loadUsers = async () => {
  state.loadingUsers = true;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
  state.users = await response.json();
  state.loadingUsers = false;
};

const onSubmit = async () => {
  state.submitting = true;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/courses/${route.params.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; encoding=utf-8",
      },
      body: JSON.stringify(course),
    }
  );
  state.editedCourse = await response.json();
  state.submitting = false;
};

loadCourse();
loadUsers();
</script>

<style scoped></style>
