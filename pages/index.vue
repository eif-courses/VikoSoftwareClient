<script setup lang="ts">

import type {CategoriesResponse} from "~/data/categories";

const temp = ref('')
const signInMicrosoft = async () => {
  window.location.href = `${useBaseUrl}/auth/microsoft`;
};


const message = ref<CategoriesResponse>();


async function testEndpoint() {

  const token = localStorage.getItem('token');

  try {
    const {data} = await useFetch<CategoriesResponse>('/api/admin/categories');

    console.log('Data:', data)

    message.value = data
  } catch (error) {
    console.error('Error:', error)
    message.value = 'Error: ' + error.message
  }
}


</script>

<template>


  <button @click="signInMicrosoft">
    Sign in
  </button>


  <button @click="testEndpoint">Test Endpoint</button>
  <p>{{ message }}</p>


</template>
