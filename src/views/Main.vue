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

      </div>
    </div>
  </div>
</template>

<script>
import User from '../javascript/User'
import LeftWindowUsersChats from '../components/LeftWindowUsersChats'
import Message from '../javascript/Message'
import axios from 'axios'
import ChatWindow from '../components/ChatWindow'
export default {
  components: {
    ChatWindow,
    LeftWindowUsersChats
  },
  data(){
    return {
      messages:[],
      users:[],
      currentMsg:'',
      test:null,
      chats: [],
      groupChatId: null
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
        this.messages = [];
        for(let i = 0; i < response.data.data.length; i++) {
          this.messages.push(new Message(response.data.data[i].msg_id,response.data.data[i].msg_content,response.data.data[i].msg_time,response.data.data[i].usr_id,response.data.data[i].usr_username))
        }
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
      console.log(msg)
      console.log(this.groupChatId)
      axios.post('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat/' + this.groupChatId, {
        sid: localStorage.getItem('sid'),
        grcId: this.groupChatId,
        msgContent: msg
      })
      .then ((res) => {
        console.log(res)
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
      console.log(chatName,ids)
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
        console.log(res)
        this.chats = res.data.data;
      })
      .catch ((ex) => {
        console.log(ex)
      })
    },
    handleChangeChat (grcId) {
      this.groupChatId = grcId
      console.log(this.groupChatId)
      this.getChat(grcId)
    }
  },
  mounted() {
    this.getChat(17)
    this.getUsers()
    this.fetchGroupChats()
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