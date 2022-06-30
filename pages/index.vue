<template>
  <v-row justify="center" align="center" class="">
    <v-col cols="12" sm="8" md="6" class="">
      
      <taskForm />

      <v-divider class="my-5"></v-divider>

      <listView/>
      
    </v-col>
  </v-row>
</template>

<script>
import taskForm from '~/components/taskForm.vue'
import listView from '~/components/listView.vue'
export default {
  name: 'IndexPage',
  components: {
    taskForm,
    listView,
},
}
</script>
