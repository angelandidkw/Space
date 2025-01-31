const logger = require('../utils/logger');

module.exports = {
  name: 'messageDelete',
  execute(message) {
    if (message.author.bot) return;
    
    logger.logEvent(message.guild.id, 'messageDelete', {
      client: message.client,
      author: message.author,
      channel: message.channel,
      content: message.content
    });
  }
}; 