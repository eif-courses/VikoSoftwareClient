<template>

  <ul>
    <template v-for="(cat,index) in data?.categories" :key="cat.id">
      <li>
        {{ cat.title }}
      </li> <button>Delete</button>


    </template>
  </ul>


</template>
<script setup lang="ts">

import type {CategoriesResponse} from "~/data/categories.ts";

const msAuth = useMSAuth();
const isAuthenticated = msAuth.isAuthenticated();


const data = ref<CategoriesResponse>();

const fetchCategories = async () => {

  const accessToken = await msAuth.acquireTokenSilent({
    scopes: ["https://simuluthaudit.onmicrosoft.com/88142313-86bc-4399-99e8-390e3a07ce99/viko"],
  });
  const response = await fetch("http://localhost:5296/lecturers/categories", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 404) {
    const result: CategoriesResponse = await response.json(); // Parse the response as JSON and type it
    data.value = result; // Assign the result to the reactive data
  } else {
    console.log('Not found');
  }
};


onMounted(async () => {
  await fetchCategories()
})

</script>