<template>
  <div
      class="col-span-1 justify-center container mx-auto flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm mt-5">
    <div class="flex-1 flex flex-col p-8 relative">

      <div v-if="profileImage">
        <img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full ring-4 ring-green-300" :src="profileImage" alt="">
      </div>
      <div class="justify-center items-center flex mx-auto text-gray-600 font-semibold  w-32 h-32 rounded-full bg-blue-200 uppercase :hover:bg-gray-300"
           v-else>
        {{ userStore.user.name?.match(/[A-Z]/g).join("") }}
      </div>

      <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ userStore.user.name }}</h3>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Name</dt>
        <dd class="text-gray-500 text-sm">{{ userStore.user.username }}</dd>
        <dt class="sr-only">Email</dt>
      </dl>
      <button @click="logout(userStore.user.homeAccountId)"
              class="absolute bottom-0 right-0 mr-2 mb-2 bg-gray-100 p-2 rounded-lg shadow hover:bg-red-500 text-gray-500 hover:text-white hover:opacity-60 transition-all duration-500 font-extrabold font-mono">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
        </svg>
      </button>
    </div>



    <div>
      token : {{token}}
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
    scopes: ["viko"],
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