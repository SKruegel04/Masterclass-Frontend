<template>
  <div class="container">
    <h1>Alle Kurse</h1>

    <div class="d-flex justify-content-end mb-4">
      <RouterLink
        :to="{ name: 'createCourse' }"
        class="btn btn-primary btn-lg px-4 gap-3"
      >
        Neuen Kurs erstellen
      </RouterLink>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="course in courses" :key="course.id" class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ course.title }}</h5>
            <p class="card-text">
              {{ course.category }} - mit {{ course.user.name }}
            </p>
            <p class="card-text">{{ course.description }}</p>
            <p class="card-text">
              {{ new Date(course.date).toLocaleString() }}
            </p>
            <p class="card-text">Dauer: {{ course.duration }} Minuten</p>
            <div class="d-flex justify-content-end">
              <RouterLink
                :to="{ name: 'editCourse', params: { id: course.id } }"
              >
                Bearbeiten
              </RouterLink>|
              <RouterLink
                :to="{ name: 'deleteCourse', params: { id: course.id } }"
              >
                Löschen
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const loading = ref(false);
const courses = ref([]);

const loadCourses = async () => {
  loading.value = true;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`);
  courses.value = await response.json();
  loading.value = false;
};

loadCourses();
</script>

<style scoped></style>
