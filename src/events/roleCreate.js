const logger = require('../utils/logger');

module.exports = {
  name: 'roleCreate',
  execute(role) {
    logger.logEvent(role.guild.id, 'roleCreate', {
      client: role.client,
      role: role
    });
  }
}; 