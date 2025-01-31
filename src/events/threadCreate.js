const logger = require('../utils/logger');

module.exports = {
  name: 'threadCreate',
  execute(thread) {
    logger.logEvent(thread.guild.id, 'threadCreate', {
      client: thread.client,
      thread: thread,
      parent: thread.parent,
      creator: thread.ownerId,
      type: thread.type,
      timestamp: Date.now()
    });
  }
}; 