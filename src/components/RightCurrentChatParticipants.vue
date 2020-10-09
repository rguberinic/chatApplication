<template>
  <div id="right-current-chat-participants">
    <h2>Chat Participants</h2>
      <div v-for="participant in currentChatParticipants" :key='participant.userId'>
        <div>
          <span>{{participant.username}}</span>
          <button @click='handleRemoveParticipant(participant.userId)'>remove</button>
        </div>
      </div>
      <div id="users-not-participating">
        <h2>Users not participating in this chat</h2>
        <div v-for="user in users" :key="user.userId">
          <!-- {{user}} -->
        </div>
      </div>
  </div>
</template>

<script>

export default {
  props:['currentChatParticipants','users'],
  methods:{
    handleRemoveParticipant(userId) {
      this.$emit('handleRemoveParticipants',userId)
    }
  }

}

</script>

<style>

</style>