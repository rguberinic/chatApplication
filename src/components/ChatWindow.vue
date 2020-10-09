<template>
  <div id="chat-window">
    <div id="message-container">
      <div class="single-message" v-for="message in messages" :key="message.msgId">
        <div>
          <h3>{{message.userUsername}}</h3>
          <p>{{message.msgContent}}</p>
        </div>
        <div class="msgTime">{{message.msgTime}}</div>
      </div>
    </div>
    <div id="input-container">
      <textarea v-model="msg"></textarea>
      <button @click="handleSendMsg(msg)">Send message</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['messages'],
  data () {
    return{
      msg: ''
    }
  },
  methods: {
    handleSendMsg (msg) {
      this.$emit('handleSendMsg', msg)
    }
  },
  mounted(){
    
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


  #chat-window {
    height: 100%;
    width: 100%;
    border:1px solid yellow;

    #message-container {
      height: 90%;
      width: 100%;
      border:1px solid pink;
      overflow: auto;
    }

    #input-container {
      @include Flex(row)
    }

    textarea {
      width: 100%;
      height: 74px;
      resize: none;

      &:focus{
        outline: none;
      }
    }

    button {
      height: 74px;
    }

    .single-message {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2% 2% 3% 2%;

      h3 {
        text-align: left;
      }

      .msgTime {
        font-size: 0.8em;
      }
    }
  }
</style>