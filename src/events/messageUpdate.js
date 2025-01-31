const logger = require('../utils/logger');

module.exports = {
  name: 'messageUpdate',
  execute(oldMessage, newMessage) {
    try {
      // Ignore if message is from a bot or content hasn't changed
      if (!oldMessage?.content || !newMessage?.content) return;
      if (oldMessage.author?.bot) return;
      if (oldMessage.content === newMessage.content) return;
      
      // Ensure message is from a guild
      if (!newMessage.guild) return;
      
      logger.logEvent(newMessage.guild.id, 'messageUpdate', {
        client: newMessage.client,
        author: newMessage.author,
        channel: newMessage.channel,
        oldContent: oldMessage.content.slice(0, 1024), // Prevent oversized embeds
        newContent: newMessage.content.slice(0, 1024),
        messageURL: newMessage.url
      });
    } catch (error) {
      console.error('Error in messageUpdate:', error);
    }
  }
}; 