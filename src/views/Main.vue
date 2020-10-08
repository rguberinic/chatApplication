<template>
  <div id="main">
    <div id="interface">
      <div id="interface-left">

      </div>
      <div id="interface-center">
        <ChatWindow/>
      </div>
      <div id="interface-right">

      </div>
    </div>
  </div>
</template>

<script>
import Message from '../javascript/Message'
import axios from 'axios'
import ChatWindow from '../components/ChatWindow'
export default {
  components: {
    ChatWindow
  },
  data(){
    return {
      messages:[]
    }
  },
  methods: {
    getChat() {
      axios.get('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/group_chat/17', {
        params: {
          sid: localStorage.getItem('sid')
        }
      })
      .then((response)=> {
        for(let i = 0; i < response.data.data.length; i++) {
          // console.log(response.data.data[i])
          this.messages.push(new Message(response.data.data[i].msg_id,response.data.data[i].msg_content,response.data.data[i].msg_time,response.data.data[i].usr_id,response.data.data[i].usr_username))
        }
        console.log(this.messages)
      })
      .catch((error)=> {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getChat()
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
    @include Flex(column)

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