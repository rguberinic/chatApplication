<template>
  <div id="left-window-users-chats">
      <div id="chats">
          <div id="existing-chats" v-for="chat in chats" :key="chat.grc_id">
              <h5> {{chat.grc_name}} </h5>
          </div>
          <div id="make-chat">
              <h2>Chosen users for new chat</h2>
              <div id="chosen-users-container" v-for='user in usersChosenForNewChat' :key='user.userId'>
                  <span>{{user.username}}</span> <button>-</button>
              </div>
              <input type="text" v-model="chatName" placeholder="Chose a name for your chat">
              <button @click='handleMakeAChat(usersChosenForNewChat,chatName)'>Submit</button>
          </div>
      </div>
      
      <div id="current-users-container" >  
          <h2>Current users</h2>  
          <div id="single-user-container" v-for="user in users" :key='user.userId'>
              <span>{{user.username}}</span>
              <button @click="addUserToNewChat(user.userId)">+</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['users', 'chats'],
    data() {
        return {
            usersChosenForNewChat:[],
            chatName:''
        }
    },
    methods: {
        addUserToNewChat(param) {
            for(let i = 0; i < this.users.length; i++) {
                if(this.users[i].userId == param){
                    this.usersChosenForNewChat.push(this.users[i])
                    this.users.splice([i],1)
                }
            }
        },
        handleMakeAChat(usersChosenForNewChat,chatName) {
            this.$emit('handleMakeAChat', usersChosenForNewChat,chatName);
            this.usersChosenForNewChat = [];
            this.chatName = ''
        }
    }
}
</script>

<style lang="scss">
    #left-window-users {
        height: 100%;
        width: 100%;
        border: 1px solid green;
    }

     #make-chat {
        border: 1px solid blue;

        input {
            display: block;
            margin: 0 auto;
        }
    }

    #current-users-container {
        border: 1px solid pink;

    }
</style>