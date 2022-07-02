<template>
  <v-app>
    <v-app-bar app>
      <v-icon size="45">mdi-playlist-check</v-icon>

      <v-app-bar-title class="headline ml-2">Todo Web App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isLoggedIn"
        small
        color="secondary"
        class="subtitle-1 pa-3 py-6 white--text"
        @click="logout"
      >
        <v-icon class="mr-3">mdi-exit-run</v-icon>
        ออกจากระบบ
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="mt-4">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer> </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!this.$store.state.users.user
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    },
  },
}
</script>

<style lang="scss" scoped></style>
