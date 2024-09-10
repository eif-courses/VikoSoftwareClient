<template>
  <a-space wrap>
  <a-button @click="login" type="primary">  <WindowsFilled /> Prisijungimas Dėstytojams</a-button>
  <a-button @click="login" type="primary">  <LoginOutlined />Moderatoriams</a-button>
    </a-space>
</template>

<script setup>

const msAuth = useMSAuth();

async function login() {
  await msAuth.signIn()
}
async function loginModerators(){

}

</script>
