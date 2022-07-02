<template>
  <div class="pa-4">
    <v-card-title class="my-1">
      <span class="white--text headline ml-3">รายการที่ท่านสร้าง</span>
      <v-spacer></v-spacer>
      <strong class="mx-4">
        <span class="mx-4 success--text text--lighten-1">
          เสร็จสิ้นแล้ว : {{ completedTasks }}
        </span>
        <span class="warning--text text--lighten-1">
          ยังไม่ได้เสร็จ : {{ undoneTasks }}</span
        >
      </strong>
        <v-progress-circular
        :value="progress"
        color="success lighten-1"
        class="mr-2"
      ></v-progress-circular>
    </v-card-title>
    <v-divider class="grey lighten-1 mx-5"></v-divider>
    <v-card-text class="white--text mt-3">
      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition class="py-0" group tag="v-list">
          <div v-for="(task, i) in tasks" :key="`${i}-${task.title}`">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
            <v-list-item>
              <v-list-item-action>
                <v-checkbox
                  :input-value="task.status"
                  :color="(task.status && 'grey') || 'primary'"
                  @change="toggleStatus(task)"
                >
                  <template v-slot:label>
                    <div
                      :class="
                        (task.status &&
                          'success--text text-decoration-line-through') ||
                        'white--text'
                      "
                      class="ml-4"
                      v-text="task.title"
                    ></div>
                  </template>
                </v-checkbox>
              </v-list-item-action>

              <v-spacer></v-spacer>

              <v-scroll-x-transition>
                <v-icon v-if="task.status" color="success"> mdi-check </v-icon>
                <v-icon v-if="!task.status" @click="remove(task)"
                  >mdi-delete-forever</v-icon
                >
              </v-scroll-x-transition>
            </v-list-item>
          </div>
        </v-slide-y-transition>
      </v-card>
    </v-card-text>
    <v-row class="mt-3 justify-center">
      <v-btn color="success" class="mx-3" @click="removeDone"
        >ลบรายการที่เสร็จสิ้น</v-btn
      >
      <v-btn color="error" class="mx-3" @click="removeAll"
        >ลบรายการทั้งหมด</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    tasks() {
      return this.$store.getters['todos/getTodos']
    },
    completedTasks() { return this.$store.getters['todos/doneTodosCount']},
    undoneTasks() { return this.$store.getters['todos/undoneTodosCount']},
     progress () {
        return this.completedTasks / this.tasks.length * 100
      },
  },
  methods: {
    toggleStatus(todo) {
      this.$store.dispatch('todos/toggle', todo)
    },
    remove(todo) {
      this.$store.dispatch('todos/remove', todo)
    },
    removeDone() {
      this.$store.dispatch('todos/removeDoneTodos')
    },
    removeAll() {
      this.$store.dispatch('todos/removeAllTodos')
    },
  },
}
</script>

<style scoped></style>
