<script setup>
import index from './components/index/index.vue'
import { onMounted } from 'vue';

onMounted(()=>{
  sessionStorage.setItem('token',666)
})


</script>

<template>
  <div id="app">
    <index msg="Medical View" />
  </div>
  
</template>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#app{
  width: 100%;
}
</style>
