<template>
  <v-app id="inspire" v-if="$route.path !== '/login'">
    <Header />
    <Sidebar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
  <v-app v-else>
    <login>
    </login>
  </v-app>

</template>
<script lang="ts">
import Vue from 'vue';
import Header from '@/components/header.vue'
import Sidebar from '@/components/sidebar.vue'
import error from '@/components/notfound.vue'
import login from '@/views/Authentification/login.vue'
export default Vue.extend({
  name: 'App',
  components: { Sidebar, Header, login, error },
})
</script>
