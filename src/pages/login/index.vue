<template>
  <nut-input placeholder="请输入文本" v-model="loginForm.username" />
  <nut-input placeholder="请输入密码" v-model="loginForm.password" type="password" />
  <nut-button type="primary" :loading="userStore.isLoading" @click="login">登录</nut-button>
</template>

<script setup>
const userStore = useUserStore()
const loginForm = reactive({
  username: '', password: ''
})

function login() {
  userStore.initTokens(toRaw(loginForm))
}
</script>