<template>
  <div id="left-window-users-chats">
      <div id="chats">
          <div id="existing-chats" v-for="chat in chats" :key="chat.grc_id">
              <h5 @click="handleChangeChat(chat.grc_id)"> {{chat.grc_name}} </h5>
          </div>
          <div id="make-chat">
              <h2>Chosen users for new chat</h2>
              <div id="chosen-users-container" v-for='user in usersChosenForNewChat' :key='user.userId'>
                  <span>{{user.username}}</span> <button @click='removeUserFromNewChat(user.userId)'>-</button>
              </div>
              <input type="text" v-model="chatName" placeholder="Chose a name for your chat">
              <button id="make-chat-button" @click='handleMakeAChat(usersChosenForNewChat,chatName)'><i class="fas fa-plus-circle"></i></button>
          </div>
      </div>
      
      <div id="current-users-container" >  
          <h2>Available users</h2>  
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
        removeUserFromNewChat(param){
            for(let i = 0; i < this.usersChosenForNewChat.length; i++) {
                if(this.usersChosenForNewChat[i].userId == param){
                    this.usersChosenForNewChat.splice([i],1)
                }
            } 
        },
        handleMakeAChat(usersChosenForNewChat,chatName) {
            this.$emit('handleMakeAChat', usersChosenForNewChat,chatName);
            this.usersChosenForNewChat = [];
            this.chatName = ''
        },
        handleChangeChat(grcId) {
            this.$emit('handleChangeChat', grcId);
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

    #left-window-users {
        height: 100%;
        width: 100%;
        border: 1px solid #1B4B7D;
    }

     #make-chat {
        border: 1px solid #1B4B7D;
        overflow-y: scroll;

        input {
            display: block;
            margin: 0 auto;
            color:#1B4B7D;
            height: 25px;
            width:95%;
            margin: 10px auto;
            outline: none;
            border:1px solid #1B4B7D;
            transition: all ease-in-out 0.1s;

            &:hover, &:focus {
                outline:3px solid #1B4B7D;
            }
        }

        button {
            border-radius: 100%;
            width: 20px;
            height: 20px;
            border: none;
            background-color:#1B4B7D;
            color: #fff;
            margin: 0 5px;

            &:hover {
               transform: scale(1.1); 
            }

            &:focus {
                outline: none;
            }
        }

        #make-chat-button {
            background-color: #1B4B7D;
            color:#fff;
            font-weight: 700;
            font-size: 1.5em;
            border-radius: 100%;
            width:50px;
            height:50px;
            margin: 10px auto;
            outline: none;
            border:none;
            transition: all ease-in-out 0.1s;
            @include Flex(row);

            &:hover {
                transform: scale(1.03);
            }
            &:focus {
                outline: none;
            }
        }
    }

    #current-users-container {
        border: 1px solid #1B4B7D;

    }
    #existing-chats{
        h5{
            cursor: pointer;
            padding: 5px;
            border: 2px solid #1B4B7D;
            transition: .5s;
            color:#1B4B7D;
            font-size: 1em;
            background:#fff
        }
        h5:hover{
            transform: scale(1.05);
            background: #1B4B7D;
            color:#fff
        }
    }

    #single-user-container {
        button {
            border-radius: 100%;
            width: 20px;
            height: 20px;
            border: none;
            background-color:#1B4B7D;
            color: #fff;
            margin: 0 5px;

            &:hover {
               transform: scale(1.1); 
            }
        }
    }
</style>