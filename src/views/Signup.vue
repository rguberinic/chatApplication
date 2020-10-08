<template>
  <div id="signup">
    <div id="signup-container">
      <label for="username">Username</label>
      <input v-model="username" id="username" type="text" placeholder="Choose your username">
      <label for="email">Email</label>
      <input v-model="email" id="email" type="text" placeholder="Your email adress">
      <label for="password">Password</label>
      <input v-model="password" id="password" type="text" placeholder="Password">
      <label for="password2">Repeat Password</label>
      <input v-model="password2" id="password2" type="text" placeholder="Repeat password">

      <button @click="signUp">Submit</button>
      <router-link to="Login">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      username:null,
      email:null,
      password:null,
      password2:null
    }
  },
  methods:{
    signUp() {
      axios.post('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/auth/signup', {
        username:this.username,
        email:this.email,
        password:this.password,
        password2:this.password2
      })
      .then((response)=> {
        console.log(response);
      })
      .catch((error)=> {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss">
  @mixin Flex($direction) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: $direction;
  }

  #signup {
    border:1px solid black;
    height: 100%;
    width: 100%;
    @include Flex(column)
  }

  #signup-container {
    border:1px solid black;
    min-height: 20%;
    min-width: 20%;
    @include Flex(column)
  }
</style>