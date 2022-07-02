<template>
  <v-card elevation="5" class="pa-4">
    <v-card-title>
      <span class="headline mx-auto">ลืมรหัสผ่าน</span>
    </v-card-title>
    <v-divider class="mx-10"></v-divider>
    <v-card-text class="px-16 pb-8">
      <v-form @submit.prevent="forgotPassword">
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
            <v-row class="mt-6">
              <v-btn type="submit" color="primary" @click="forgotPassword"> ยืนยัน </v-btn>
              <v-btn color="secondary" @click="$emit('toggleForgotPassword')" class="ml-6">
                ยกเลิก
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
      data() {
    return {
      user: { email: ''},

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
    }
  },
  methods: {
    forgotPassword() {
      const that = this
      this.$fire.auth
        .sendPasswordResetEmail(this.user.email)
        .then(function () {
          that.errorMessage = 'reset link sent to ' + that.user.email
          that.isError = true
        })
        .catch(function (error) {
          that.errorMessage = error.message
          that.isError = true
        })
    },
  },
}
</script>

<style scoped></style>
