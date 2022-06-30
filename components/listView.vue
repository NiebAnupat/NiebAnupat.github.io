<template>
  <div class="pa-4">
    <v-card-title>
      <span class="white--text headline ml-3 my-1">รายการที่ท่านสร้าง</span>
      <v-spacer></v-spacer>
       <strong class="mx-4 success--text text--darken-2">
        Completed: {{ $store.getters['todos/doneTodosCount'] }}
      </strong>
    </v-card-title>
    <v-divider class="grey lighten-1 mx-5"></v-divider>
    <v-card-text class="white--text mt-3">
      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition class="py-0" group tag="v-list">
          <div v-for="(task, i) in tasks" :key="`${i}-${task.title}`">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
            <v-list-item >
              <v-list-item-action>
                <v-checkbox
                  
                  :color="(task.status && 'grey') || 'primary'"
                >
                  <template v-slot:label>
                    <div
                      :class="(task.status && 'success--text text-decoration-line-through') || 'white--text'"
                      class="ml-4"
                      v-text="task.title"
                    ></div>
                  </template>
                </v-checkbox>
              </v-list-item-action>

              <v-spacer></v-spacer>

              <v-scroll-x-transition>
                <v-icon v-if="task.status" color="success"> mdi-check </v-icon>
              </v-scroll-x-transition>
            </v-list-item>
          </div>
        </v-slide-y-transition>
      </v-card>


    </v-card-text>
  </div>
</template>

<script>
export default {
  computed: {
    tasks() {
      return this.$store.getters['todos/getTodos']
    },
  },
}
</script>

<style scoped></style>
