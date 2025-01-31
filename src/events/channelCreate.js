const logger = require('../utils/logger');

module.exports = {
  name: 'channelCreate',
  execute(channel) {
    if (!channel.guild) return; // Ignore DM channels
    
    logger.logEvent(channel.guild.id, 'channelCreate', {
      client: channel.client,
      channel: channel,
      type: channel.type,
      creator: channel.guild.members.me, // Note: Audit logs would be needed for actual creator
      category: channel.parent?.name || 'No Category'
    });
  }
}; 