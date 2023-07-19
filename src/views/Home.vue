<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <tic-navagation msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import TicNavagation from '@/components/TicNavagation.vue';

export default {
  name: 'Home',
  components: {
    TicNavagation
  }
};
</script>
