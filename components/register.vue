<template>
 <v-card elevation="5" class="pa-4">
    <v-card-title>
      <span class="headline mx-auto">Sign Up</span>
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
                label="Password"
                type="password"
              ></v-text-field>
            </v-row>
            <v-row class="mt-6">
              <v-btn type="submit" color="primary"> Sign Up </v-btn>
              <v-btn color="secondary" @click="$emit('toggleRegister')" class="ml-6">
                Black
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
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
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
    }
  },
   methods: {
      register() {
      // eslint-disable-next-line node/handle-callback-err
      this.$store.dispatch('users/register', this.user).catch((error) => {
        this.isError = true
        this.errorMessage = error.code
        setTimeout(() => {
          this.isError = false
        }, 5000)
      })

    },
   }
}
</script>

<style scoped></style>
