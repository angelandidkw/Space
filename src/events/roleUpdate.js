const logger = require('../utils/logger');

module.exports = {
  name: 'roleUpdate',
  execute(oldRole, newRole) {
    const changes = [];
    
    if (oldRole.name !== newRole.name) {
      changes.push(`Name: ${oldRole.name} → ${newRole.name}`);
    }
    
    if (oldRole.hexColor !== newRole.hexColor) {
      changes.push(`Color: ${oldRole.hexColor} → ${newRole.hexColor}`);
    }
    
    if (oldRole.hoist !== newRole.hoist) {
      changes.push(`Hoisted: ${oldRole.hoist} → ${newRole.hoist}`);
    }
    
    if (oldRole.mentionable !== newRole.mentionable) {
      changes.push(`Mentionable: ${oldRole.mentionable} → ${newRole.mentionable}`);
    }

    if (changes.length > 0) {
      logger.logEvent(newRole.guild.id, 'roleUpdate', {
        client: newRole.client,
        role: newRole,
        changes: changes.join('\n')
      });
    }
  }
}; 