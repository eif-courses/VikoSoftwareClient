<template>
  <div>
    <!-- Handle token and save to local storage -->
  </div>
</template>

<script setup>

const route = useRoute()

onMounted(() => {
  const token = route.query.token
  if (token) {
    localStorage.setItem('microsoft-token', token.toString())
    // Redirect to a protected page or dashboard
    navigateTo('/')
  } else {
    // Handle error or invalid token
  }
})
</script>