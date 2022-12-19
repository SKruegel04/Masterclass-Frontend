<template>
  <div class="container">
    <h1>Hier sehen Sie alle Nutzer von Masterclass!</h1>
    <div class="d-flex justify-content-end mb-4">
      <RouterLink
        :to="{ name: 'createUser' }"
        class="btn btn-primary btn-lg px-4 gap-3"
      >
        Jetzt Nutzer anlegen
      </RouterLink>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Beschreibung</th>
          <th scope="col">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="3">Lade Benutzer...</td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.description }}</td>
          <td>
            <RouterLink :to="{ name: 'deleteUser', params: { id: user.id } }">
              Löschen
            </RouterLink>
            |
            <RouterLink :to="{ name: 'editUser', params: { id: user.id } }">
              Bearbeiten
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const loading = ref(false);
const users = ref([]);

const loadUsers = async () => {
  loading.value = true;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
  users.value = await response.json();
  loading.value = false;
};

loadUsers();
</script>

<style scoped></style>
