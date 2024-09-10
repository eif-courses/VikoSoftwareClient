<template>
  <div>
    <a-row justify="center">
      <a-col>
        <a-form
            :model="formState"
            name="normal_login"
            style="width: 100%;
            max-width: 100%;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            padding: 1.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >


          <a-form-item>
            <a-button :style="{width:'100%'}" @click="login" type="primary" class="login-header-button">
              <WindowsFilled/>
              Prisijungimas Dėstytojams
            </a-button>
          </a-form-item>
          <a-form-item>
            arba prisijungti administracijos darbuotojams
          </a-form-item>


          <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              label="Password"
              name="password"
              :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
          </a-form-item>

          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
  <template v-if="isTwoFactorAuthentication">
    <img :src="qrcode" alt="QR Code" />
  </template>

</template>

<script lang="ts" setup>
import {reactive, computed} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';

const isTwoFactorAuthentication = ref(false);


interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const onFinish = (values: any) => {
  loginAdministration(values.username, values.password);
  //console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const disabled = computed(() => {
  return !(formState.username && formState.password);
});


const msAuth = useMSAuth();

async function login() {
  await msAuth.signIn()
}

const text = ref('');

const qrcode = useQRCode(text);


async function loginAdministration(username: string, password: string) {
  const url = "http://localhost:5296/auth/mfa/signin";
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password
      }),
    });

    if (!response.ok) {
      // Handle error response
      const errorData = await response.text();
      console.error('Error:', errorData);
      throw new Error('Failed to login');
    }
    const responseData = await response.json();
    console.log('Success:', responseData);

    if (responseData.message === '2FA setup required') {
      isTwoFactorAuthentication.value = true;
      text.value = responseData.qrCodeUrl;
    }

    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


</script>

<style scoped>


.login-form-button {
  width: 100%;
}

</style>
