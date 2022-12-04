<template>
  <div class="container">
    <h1>Hier sehen Sie alle Nutzer von Masterclass!</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Beschreibung</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="3">
            Lade Benutzer...
          </td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(false);
const users = ref([]);

const loadUsers = async () => {
  loading.value = true;
  const response = await fetch("http://localhost:8080/users");
  users.value = await response.json();
  loading.value = false;
};

loadUsers();
</script>

<style scoped></style>
