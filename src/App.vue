<template>
  <div id="app">
    <TheNavigation/>
    <router-view></router-view>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
import TheNavigation from './components/TheNavigation'
export default {
  components:{
    TheNavigation
  },
  methods: {
    ...mapActions(['checkSession'])
  },
  mounted(){
    this.checkSession()
  }
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

</style>
