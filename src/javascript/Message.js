class Message {
  constructor(msgId, msgContent, msgTime, userId, userUsername) {
    this.msgId = msgId;
      this.msgContent = msgContent;
      this.msgTime = msgTime;
      this.userId = userId;
      this.userUsername = userUsername;
      this.msgFavorite = false;
  }
  favouriteMsg () {
    this.msgFavorite = !this.msgFavorite;
  }
}

export default Message