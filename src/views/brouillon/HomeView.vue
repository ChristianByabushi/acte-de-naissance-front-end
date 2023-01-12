<template>
  <div>
    <hello-world />  
    <todolist/> 
    <dashboard></dashboard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './HelloWorld.vue'
import Todolist from './Todolist.vue'
import dashboard from './dashboard.vue'
export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
    Todolist,
    dashboard
  },
})
</script>
