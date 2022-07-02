<template>
  <v-card elevation="5" class="pa-4">
    <v-card-title>
      <span class="white--text headline ml-3 my-1">เพิ่มรายการ</span>
    </v-card-title>

    <v-divider class="grey lighten-1 mx-5 mb-3"></v-divider>

    <v-card-text class="white--text headline">
      <v-form @submit.prevent="add">
        <v-row class="mx-2">
          <v-col cols="10">
            <v-text-field
              v-model="task.title"
              label="ชื่อรายการ"
              outlined
              class="white--text"
            >
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn type="submit" color="primary" block class="mt-3"
              >เพิ่ม</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: null,
      },
    }
  },
  methods: {
    async add() {
      if (this.task.title) {
        await this.$store
        .dispatch('todos/add', this.task)
        .then(() => {
          this.task = {
            title: null,
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
  },
}
</script>

<style scoped></style>
