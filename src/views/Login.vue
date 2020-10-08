<template>
  <div id="login">
    <div class="login-container">
      <input type="text" v-model="name">
      <input type="text" v-model="password">
      <button @click="logIn">Submit</button>
      <router-link to="Signup">Signup</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      name:null,
      password:null
    }
  },
  methods: {
    logIn() {
      axios.post('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/auth/login', {
        name:this.name,
        password:this.password,
      })
      .then((response)=> {
        if(response.data.sid){
          localStorage.setItem('sid', response.data.sid)
          this.checkSession(response.data.sid)
        }
      })
      .catch((error)=> {
        console.log(error);
      });
    },
   ...mapActions(['checkSession']) 
  },
  
}
</script>

<style lang="scss">
  @mixin Flex($direction) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: $direction;
  }

  #login {
    border:1px solid black;
    height: 95%;
    width: 100%;
    margin: 0 auto;
    @include Flex(row);

    .login-container {
      @include Flex(column);
      width: 20%;
      height: 40%;
      border: 1px solid black;
  }
  }
</style>