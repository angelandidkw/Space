const logger = require('../utils/logger');

module.exports = {
  name: 'guildUpdate',
  execute(oldGuild, newGuild) {
    const changes = [];
    
    if (oldGuild.name !== newGuild.name) {
      changes.push(`Server Name: ${oldGuild.name} → ${newGuild.name}`);
    }
    
    if (oldGuild.icon !== newGuild.icon) {
      changes.push('Server Icon Changed');
    }

    if (oldGuild.banner !== newGuild.banner) {
      changes.push('Server Banner Changed');
    }

    if (oldGuild.description !== newGuild.description) {
      changes.push(`Description Updated:\nOld: ${oldGuild.description || 'None'}\nNew: ${newGuild.description || 'None'}`);
    }

    if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
      changes.push(`Verification Level: ${oldGuild.verificationLevel} → ${newGuild.verificationLevel}`);
    }

    if (changes.length > 0) {
      logger.logEvent(newGuild.id, 'guildUpdate', {
        client: newGuild.client,
        changes: changes.join('\n'),
        timestamp: Date.now(),
        executor: 'System' // Could be enhanced with audit logs
      });
    }
  }
}; 