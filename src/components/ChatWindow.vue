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
      <textarea></textarea>
      <button>Send message</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['messages'],

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


    #message-container {
      height: 85.9%;
      width: 100%;
      overflow-y: scroll;
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