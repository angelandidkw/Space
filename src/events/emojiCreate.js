const logger = require('../utils/logger');

module.exports = {
  name: 'emojiCreate',
  execute(emoji) {
    logger.logEvent(emoji.guild.id, 'emojiCreate', {
      client: emoji.client,
      emoji: emoji,
      name: emoji.name,
      animated: emoji.animated,
      url: emoji.url,
      timestamp: Date.now()
    });
  }
}; 