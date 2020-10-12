<template>
  <div id="right-current-chat-participants">
    <h2>Chat Participants</h2>
      <div v-for="participant in currentChatParticipants" :key='participant.userId'>
        <div>
          <span>{{participant.username}}</span>
          <button @click='handleRemoveParticipant(participant.userId)'>-</button>
        </div>
      </div>
      <div id="users-not-participating">
        <h2>Users not participating in this chat</h2>
        <div v-for="user in usersNotParticipating" :key="user.userId">
          <span>{{user.username}}</span>
          <button @click='handleAddParticipants(user.userId)'>+</button>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  props:['currentChatParticipants','users', 'usersNotParticipating'],
  methods:{
    handleRemoveParticipant(userId) {
      this.$emit('handleRemoveParticipants',userId)
    },
    handleAddParticipants(userId) {
      this.$emit('handleAddParticipants',userId)
    }
  }

}

</script>

<style lang='scss'>
  #right-current-chat-participants {
    button {
      border-radius: 100%;
      width: 20px;
      height: 20px;
      border: none;
      background-color: #1B4B7D;
      color: #fff;
      margin: 0 5px;
      transition: all ease-in-out 0.1s;

      &:hover {
        transform: scale(1.1);
        background-color: #316294;
      }
    }
  }  
</style>