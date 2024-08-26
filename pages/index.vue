<script setup lang="ts">

import type {CategoriesResponse} from "~/data/categories";

const categories = ref<CategoriesResponse | null>(null);
const { data, error, status } = await useFetch<CategoriesResponse>('/api/admin/categories');

if (error.value) {
  console.error('Error fetching categories:', error.value);
}
categories.value = data.value;
</script>

<template>
  <div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <ul v-if="categories">
      <li v-for="category in categories.categories" :key="category.id">
        {{ category.title }}
      </li>
    </ul>
    <div v-if="!categories && (status !== 'pending') && !error">No categories available.</div>
  </div>
</template>
