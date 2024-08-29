<template>
  <button type="submit" @click="login"/>
</template>

<script setup>

const msAuth = useMSAuth();

async function login() {
  await msAuth.signIn()
}
</script>
