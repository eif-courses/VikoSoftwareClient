<template>
  <div
      class="col-span-1 justify-center container mx-auto flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm mt-5">
    <div class="flex-1 flex flex-col p-8 relative">

      <div v-if="profileImage">
        <img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full ring-4 ring-green-300" :src="profileImage" alt="">
      </div>
      <div
          class="justify-center items-center flex mx-auto text-gray-600 font-semibold  w-32 h-32 rounded-full bg-blue-200 uppercase :hover:bg-gray-300"
          v-else>
        {{ userStore.user.name?.match(/[A-Z]/g).join("") }}
      </div>

      <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ userStore.user.name }}</h3>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Name</dt>
        <dd class="text-gray-500 text-sm">{{ userStore.user.username }}</dd>
        <dt class="sr-only">Email</dt>
      </dl>


      <a-button danger @click="logout(userStore.user.homeAccountId)">
        <LogoutOutlined/>
        Atsijungti
      </a-button>


    </div>


    <p>{{ userStore.user }}</p>

    <div>
      token : {{ token }}
    </div>


  </div>
</template>
<script setup>

const userStore = useAppUser();
const msAuth = useMSAuth();
const isAuthenticated = msAuth.isAuthenticated();
const token = ref('');

const profileImage = ref("");

async function logout(accountId) {
  if (accountId) {
    await msAuth.signOut(accountId);
  } else {
    console.log("No account id");
  }
}

const getProfileImage = async () => {
  const accessToken = await msAuth.acquireTokenSilent({
    scopes: ["https://simuluthaudit.onmicrosoft.com/88142313-86bc-4399-99e8-390e3a07ce99/viko"],
  });

  token.value = accessToken;

  const response = await fetch(
      "https://graph.microsoft.com/v1.0/me/photo/$value",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  );
  if (response.status != 404) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  }
};

onMounted(async () => {
  if (isAuthenticated) {
    profileImage.value = await getProfileImage();
    userStore.value.userImage = profileImage.value;
  }
});


</script>