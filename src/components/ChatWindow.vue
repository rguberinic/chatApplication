<template>
  <div id="chat-window">
    <div id="message-container">

    </div>
    <div id="input-container">
      <textarea></textarea>
      <button>Send message</button>
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


  #chat-window {
    height: 100%;
    width: 100%;
    border:1px solid yellow;

    #message-container {
      height: 90%;
      width: 100%;
      border:1px solid pink;
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
  }
</style>