<template>
  <div id="login">
    <div class="login-container">
      <h1><span>Welcome</span> Please Log in</h1>
      <input type="text" v-model="name">
      <input type="text" v-model="password">
      <button @click="logIn"><i class="fas fa-paper-plane"></i></button>
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
    font-family: 'PT Serif', serif;
    height: 95%;
    width: 100%;
    margin: 0 auto;
    @include Flex(row);

    .login-container {
      @include Flex(column);
      width: 20%;
      height: 40%;
      border: 1.5px solid #1B4B7D;
      border-radius: 15px;
      -webkit-box-shadow: 14px 10px 49px -4px rgba(255,255,255,0.99);
      -moz-box-shadow: 14px 10px 49px -4px rgba(255,255,255,0.99);
      box-shadow: 14px 10px 49px -4px rgba(255,255,255,0.99);


      h1,a,input {
        color:#1B4B7D
      }

      h1 {
        width: 55%;
        text-align: center;

        span {
          color:#fff;
        }
      }

      button {
        background-color: #1B4B7D;
        color:#fff;
        font-weight: 700;
        font-size: 1em;
        border-radius: 15px;
        

        &:hover {
          transform: scale(1.03);
        }
      }

      input:hover, input:focus{
        outline:3px solid #1B4B7D;
      }

      input,button {
        height: 25px;
        width:95%;
        margin: 10px 10px;
        outline: none;
        border:none;
        transition: all ease-in-out 0.1s;
      }

      a {
        text-decoration: none;
        font-weight: 700;
        font-size: 1.1em;
        transition: all ease-in-out 0.2s;
        

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
</style>