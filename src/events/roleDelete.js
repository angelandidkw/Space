const logger = require('../utils/logger');

module.exports = {
  name: 'roleDelete',
  execute(role) {
    logger.logEvent(role.guild.id, 'roleDelete', {
      client: role.client,
      role: role
    });
  }
}; 