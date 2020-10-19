<template>
  <div id="main">
    <div id="interface">
      <div id="interface-left">
        <LeftWindowUsersChats :users='users' @handleMakeAChat='handleMakeAChat' :chats='chats' @handleChangeChat='handleChangeChat' />
      </div>
      <div id="interface-center">
        <ChatWindow :messages='messages' @handleSendMsg='handleSendMsg'/>
      </div>
      <div id="interface-right">
        <RightCurrentChatParticipants :currentChatParticipants='currentChatParticipants' :users='users' @handleRemoveParticipants='handleRemoveParticipants'/>
      </div>
      <div>
        <span v-for="(usr, idx) in notActiveUsers" :key="idx"> {{usr.username}} </span>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../javascript/User'
import LeftWindowUsersChats from '../components/LeftWindowUsersChats'
import RightCurrentChatParticipants from '../components/RightCurrentChatParticipants'
import Message from '../javascript/Message'
import axios from 'axios'
import ChatWindow from '../components/ChatWindow'
export default {
  components: {
    ChatWindow,
    LeftWindowUsersChats,
    RightCurrentChatParticipants
  },
  data(){
    return {
      messages:[],
      users:[],
      currentMsg:'',
      test:null,
      chats: [],
      groupChatId: null,
      currentChatParticipants:[],
      usersNotParticipatig:[],
      notActiveUsers: []
    }
  },
  methods: {
    getChat(chatId) {
      axios.get('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat/' + chatId, {
        params: {
          sid: localStorage.getItem('sid')
        }
      })
      .then((response)=> {
        console.log(response)
        this.currentChatParticipants = []
        for(let i = 0; i < response.data.groupChatUsers.length; i++){
          this.currentChatParticipants.push(new User(response.data.groupChatUsers[i].usr_id,response.data.groupChatUsers[i].usr_username,response.data.groupChatUsers[i].usr_email))
        }
        this.messages = [];
        for(let i = 0; i < response.data.data.length; i++) {
          this.messages.push(new Message(response.data.data[i].msg_id,response.data.data[i].msg_content,response.data.data[i].msg_time,response.data.data[i].usr_id,response.data.data[i].usr_username))
        }
        this.fetchNotActiveUsers ();
      })
      .catch((error)=> {
        console.log(error);
      })
    },
    getUsers(){
      axios.get('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/auth/login')
      .then((response)=> {
        this.users = []
        for(let i = 0; i < response.data.users.length; i++) {
          this.users.push(new User(response.data.users[i].usr_id,response.data.users[i].usr_username,response.data.users[i].usr_email))
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    handleSendMsg (msg) {
      axios.post('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat/' + this.groupChatId, {
        sid: localStorage.getItem('sid'),
        grcId: this.groupChatId,
        msgContent: msg
      })
      .then (() => {

        this.messages = [];
        this.getChat (this.groupChatId);
      })
      .catch ((ex) => {
        console.log(ex)
      })
    },
    handleMakeAChat(usersChosenForNewChat,chatName) {
      let ids = [] 
      for(let i = 0; i < usersChosenForNewChat.length; i++){
        ids.push(usersChosenForNewChat[i].userId)
      }

      axios.post('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat', {
        sid:localStorage.getItem('sid'),
        groupChatName: chatName,
        groupChatUsers: ids

      })
      .then(()=> {
        // this.getChat()
        this.getUsers()
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    fetchGroupChats () {
      axios.get('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat', {
        params: {
          sid: localStorage.getItem('sid')
        }
      })
      .then ((res) => {
        this.chats = res.data.data;
        this.groupChatId = this.chats[0].grc_id;
      })
      .catch ((ex) => {
        console.log(ex)
      })
    },
    handleChangeChat (grcId) {
      this.groupChatId = grcId
      this.getChat(grcId)
    },
    handleRemoveParticipants(userId) {
      if(this.groupChatId== null){
        this.groupChatId = 17
      }
      axios.patch('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat/' + this.groupChatId, {
        sid:localStorage.getItem('sid'),
        grcId:this.groupChatId,
        kickedUserId:userId
      })
      .then((response) => {
        if(response.data.message == "Ok") {
          for(let i = 0; i < this.currentChatParticipants.length; i++) {
            if(this.currentChatParticipants[i].userId == userId){
              this.currentChatParticipants.splice(i,1)
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    fetchNotActiveUsers () {
      axios.get('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/auth/login')
      .then((response)=> {
        this.notActiveUsers = [];
        for(let i = 0; i < response.data.users.length; i++) {
          for (let j of this.currentChatParticipants) {
            if (response.data.users[i].usr_id === j.userId) {
              continue;
            }
            if (response.data.users[i].usr_id !== j.userId) {
              this.notActiveUsers.push(new User(response.data.users[i].usr_id,response.data.users[i].usr_username,response.data.users[i].usr_email))
            }

          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getUsers()
    this.getChat(17)
    this.fetchGroupChats()
        setInterval(() => {
      this.getChat(this.groupChatId)
    }, 3000);
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
  #main {
    height: 95%;
    width: 100%;
    border: 1px solid black;
    @include Flex(column);

    #interface {
      width:80%;
      height:80%;
      border:1px solid black;
      @include Flex(row);

      #interface-left,#interface-right {
        border:1px solid black;
        width:25%;
        height: 100%;
      }
      #interface-center {
        width: 50%;
        height: 100%;
        
      }
    }
  }
</style>