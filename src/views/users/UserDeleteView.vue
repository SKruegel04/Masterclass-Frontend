<template>
  <div class="container">
    <div v-if="!state.deleted" class="alert alert-danger">
      <strong>Möchtest du den Nutzer wirklich löschen?</strong><br />
      <div class="d-flex justify-content-end">
        <RouterLink
          :to="{ name: 'users' }"
          :class="['btn btn-light', { disabled: state.deleting }]"
        >
          Nein, abbrechen!
        </RouterLink>
        <button
          type="button"
          :class="['btn btn-danger', { disabled: state.deleting }]"
          @click="onDelete"
          :disabled="state.deleting"
        >
          Ja, wirklich löschen!
        </button>
      </div>
    </div>
    <div v-else class="alert alert-success">
      <strong>Nutzer wurde erfolgreich gelöscht</strong><br />
      <div class="d-flex justify-content-end">
        <RouterLink :to="{ name: 'users' }" class="btn btn-success">
          Zurück zur Nutzerübersicht
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from "vue-router";
import { reactive } from "vue";

const { params } = useRoute();

const state = reactive({
  deleting: false,
  deleted: false,
});

const onDelete = async () => {
  console.log("Deleting user with id " + params.id);

  state.deleting = true;
  await fetch(`${import.meta.env.VITE_API_URL}/users/${params.id}`, {
    method: "delete",
  });
  state.deleting = false;
  state.deleted = true;
};
</script>
