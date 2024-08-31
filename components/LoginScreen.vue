<template>
  <a-button @click="login" type="primary">  <WindowsFilled /> Prisijungti</a-button>

</template>

<script setup>

const msAuth = useMSAuth();

async function login() {
  await msAuth.signIn()
}
</script>
