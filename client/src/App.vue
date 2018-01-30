<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>

import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>

  body {
    background-color: lightblue !important;
  }

  .center-card{
    margin: 0 auto; /* Added */
    float: none; /* Added */
    margin-bottom: 10px; /* Added */
  }

  .center-button{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label{
    color: gray;
  }
</style>
