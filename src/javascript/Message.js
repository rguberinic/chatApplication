class Message {
  constructor(msgId, msgContent, msgTime, userId, userUsername) {
    this.msgId = msgId,
      this.msgContent = msgContent,
      this.msgTime = msgTime,
      this.userId = userId,
      this.userUsername = userUsername
  }
}

export default Message