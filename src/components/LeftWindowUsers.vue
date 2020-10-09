<template>
  <div id="left-window-users">
      <div id="current-users-container" v-for="user in users" :key='user.userId'>
          <div id="single-user-container">
              <span>{{user.username}}</span>
              <button>+</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['users']
}
</script>

<style>
    #left-window-users {
        height: 100%;
        width: 100%;
        border: 1px solid green;
    }
</style>