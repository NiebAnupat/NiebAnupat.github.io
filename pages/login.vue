<template>
  <v-row justify="center" align="center" style="height: 80vh;">
    <v-col cols="12" sm="8" md="6" lg="4" xl="4">
      <signIn v-if="!getRegister" @toggleRegister="toggleRegister" /> 
      <register v-else @toggleRegister="toggleRegister"/>
      </v-col>
  </v-row>
</template>

<script>
import signIn from '~/components/signIn.vue'
import register from '~/components/register.vue'
export default {
  component: {
    signIn,register
  },
  data() {
    return {
      getRegister: false,
    }
  },
   methods: {
    toggleRegister() {
      this.getRegister = !this.getRegister;
    },
  },
}
</script>

<style scoped>
signIn.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
}
</style>
