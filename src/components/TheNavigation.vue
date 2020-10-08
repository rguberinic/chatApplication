<template>
  <div id="navigation">
    <router-link to="/login">Login</router-link>
    <router-link to="/main">Main</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  #navigation {
    min-height: 5%;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>