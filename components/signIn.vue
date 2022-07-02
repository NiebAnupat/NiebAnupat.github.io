<template>
  <v-card elevation="5" class="pa-4" :loading="isLoading">
    <v-card-title>
      <span class="headline mx-auto">เข้าสู่ระบบ</span>
    </v-card-title>
    <v-divider class="mx-10"></v-divider>
    <v-card-text class="px-16 pb-8">
      <v-form @submit.prevent="signIn">
        <v-layout>
          <v-col>
            <v-row>
              <v-text-field
                v-model="user.email"
                prepend-icon="mdi-account"
                label="E-Mail"
                :rules="rules"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="user.password"
                prepend-icon="mdi-lock"
                label="รหัสผ่าน"
                type="password"
              ></v-text-field> </v-row
            ><v-row>
              <v-btn block @click="loginWithGoogle"
                ><img
                  src="~/assets/google-icon.png"
                  style="max-width: 25px"
                  class="mr-3"
                />
                Sign in with Google
              </v-btn>
            </v-row>
            <v-row class="mt-6">
              <v-btn color="primary" type="submit"> เข้าสู่ระบบ </v-btn>
              <v-btn color="error" class="mx-3" @click="$emit('toggleForgotPassword')">ลืมรหัสผ่าน</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="secondary" @click="$emit('toggleRegister')">
                ลงทะเบียน
              </v-btn>
            </v-row>
          </v-col>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-snackbar v-model="isError">
      {{ errorMessage }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="isError = false">
          ปิด
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: 'signIn',
  data() {
    return {
      user: { email: '', password: '' },

      rules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 20 || 'Max 20 characters',
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],

      isError: false,
      errorMessage: '',
      isLoading : false
    }
  },
  methods: {
    async signIn() {
      this.isLoading = true
      // eslint-disable-next-line node/handle-callback-err
      await this.$store.dispatch('users/login', this.user).catch((error) => {
        this.isError = true
        this.errorMessage = error.code
        setTimeout(() => {
          this.isError = false
        }, 5000)
      })
    },

    async loginWithGoogle() {
      this.isLoading = true
      const provider = new $nuxt.$fireModule.auth.GoogleAuthProvider()
      await this.$fire.auth.signInWithPopup(provider).catch((error) => {
        this.isLoading = false
        this.isError = true
        this.errorMessage = error.code
        setTimeout(() => {
          this.isError = false
        }, 5000)
      })
    },

  },
}
</script>

<style scoped></style>
