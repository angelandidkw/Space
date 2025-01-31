const logger = require('../utils/logger');

module.exports = {
  name: 'guildMemberUpdate',
  execute(oldMember, newMember) {
    try {
      if (!oldMember || !newMember) return;
      
      const changes = [];
      
      // Safely check nickname changes
      const oldNick = oldMember.nickname || oldMember.user.username;
      const newNick = newMember.nickname || newMember.user.username;
      if (oldNick !== newNick) {
        changes.push(`Nickname: ${oldNick} → ${newNick}`);
      }

      // Safely check role changes
      const oldRoles = [...oldMember.roles.cache.values()].filter(r => r.name !== '@everyone');
      const newRoles = [...newMember.roles.cache.values()].filter(r => r.name !== '@everyone');
      
      const addedRoles = newRoles.filter(role => !oldRoles.some(r => r.id === role.id));
      const removedRoles = oldRoles.filter(role => !newRoles.some(r => r.id === role.id));

      if (addedRoles.length) {
        changes.push(`Added Roles: ${addedRoles.map(r => `\`${r.name}\``).join(', ')}`);
      }
      if (removedRoles.length) {
        changes.push(`Removed Roles: ${removedRoles.map(r => `\`${r.name}\``).join(', ')}`);
      }

      if (changes.length > 0) {
        logger.logEvent(newMember.guild.id, 'guildMemberUpdate', {
          client: newMember.client,
          member: newMember,
          changes: changes.join('\n'),
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Error in guildMemberUpdate:', error);
    }
  }
}; 