const logger = require('../utils/logger');

module.exports = {
  name: 'channelDelete',
  execute(channel) {
    if (!channel.guild) return;
    
    logger.logEvent(channel.guild.id, 'channelDelete', {
      client: channel.client,
      channel: channel.name,
      type: channel.type,
      category: channel.parent?.name || 'No Category'
    });
  }
}; 