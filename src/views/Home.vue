<template>
  <div id="home">
    <div id="login-signup">
      <!-- <div>
        <router-link to="/Login">Login</router-link>
        <router-link to="/Signup">Signup</router-link>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @mixin Flex($direction) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: $direction;
  }

  #home {
    height: 95%;
    width: 100%;
    border: 1px solid black;

    @include Flex(column);

    #login-signup {
      width: 30%;
      height: 80%;
      border: 1px solid black;

      @include Flex(column);
      
      a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }
</style>
