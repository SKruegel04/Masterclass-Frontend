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
        />
      </div>
      <div class="form-group">
        <label for="description">Beschreibung</label>
        <textarea
          v-model="course.description"
          class="form-control"
          id="description"
          :disabled="state.submitting"
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
        />
      </div>
      <div class="form-group">
        <label for="date">Datum</label>
        <input
          v-model="course.date"
          type="datetime-local"
          class="form-control"
          id="date"
          :disabled="state.submitting"
        />
      </div>
      <div class="form-group">
        <label for="duration">Kursdauer</label>
        <select
          v-model.number="course.duration"
          id="duration"
          class="form-control"
          :disabled="state.submitting"
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
import { reactive } from "vue";

const course = reactive({
  title: "",
  description: "",
  category: "",
  date: new Date().toISOString(),
  duration: 60,
});

const state = reactive({
  submitting: false,
  createdCourse: null,
});

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
</script>

<style scoped></style>
