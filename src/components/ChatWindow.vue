<template>
  <div id="chat-window">
    <div ref='messageContainer' id="message-container">
      <div class="single-message" v-for="message in messages" :key="message.msgId" :class='{reverse: message.userId == currentUser.userId}'>
        <div>
          <div>
            <h3>{{message.userUsername}}</h3>
            <p>{{message.msgContent}}</p>
          </div>
        </div>
        <!-- <div class="msgTime">{{message.msgTime}}</div> -->
      </div>
    </div>
    <div id="input-container">
      <textarea v-model="msg"></textarea>
      <button @click="handleSendMsg(msg)"><i class="fas fa-paper-plane"></i></button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:['messages'],
  data () {
    return{
      msg: '',
      scrollHeight: null
    }
  },
  methods: {
    handleSendMsg (msg) {
      console.log(this.msg)
      this.$emit('handleSendMsg', msg);
      this.msg = '';
    },
    onScroll(e) {
      console.log(e.target.scrollTop)
      if(e.target.scrollTop == 0){
        this.$emit('fetchOldMessages')
      }
     
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted(){
    this.$refs.messageContainer.addEventListener("scroll", this.onScroll)
    console.log()
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
    // background: ;


    #message-container {
      height: 90%;
      width: 100%;
      overflow: auto;
    }

    #input-container {
      height: 10%;
      display: flex;
    }

    textarea {
      width: 100%;
      resize: none;
      // margin: 0 3% 0 0;


      &:focus{
        outline: none;
      }
    }

    button {
      background-color:#1B4B7D;
      color:#fff;
      border:none;
      outline:none;
      width: 80px;
      font-size: 1.5em;
      transition: ease-in-out .3s;

      &:hover {
        font-size: 2em;
        background-color: #316294;
      }
    }

    .single-message {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2% 2% 3% 2%;

      div {
        background-color: #316294;
        color: #fff;
        padding: 5px 10px;
        border-radius: 15px;
      }

      h3 {
        text-align: left;
      }

      .msgTime {
        font-size: 0.8em;
      }
    }
  }

  .reverse {
    flex-direction: row-reverse;

    h3 {
      text-align: right !important;
    }

    div {
      color: #316294 !important;;
      background-color: #fff !important;
      padding: 5px 10px;
      border-radius: 15px;
      }
  }
</style>