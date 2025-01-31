const logger = require('../utils/logger');

module.exports = {
  name: 'channelUpdate',
  execute(oldChannel, newChannel) {
    try {
      if (!newChannel.guild) return;
      
      const changes = [];
      
      // Safely check name changes
      if (oldChannel.name && newChannel.name && oldChannel.name !== newChannel.name) {
        changes.push(`Name: ${oldChannel.name} → ${newChannel.name}`);
      }
      
      // Safely check category changes
      const oldCategory = oldChannel.parent?.name || 'None';
      const newCategory = newChannel.parent?.name || 'None';
      if (oldCategory !== newCategory) {
        changes.push(`Category: ${oldCategory} → ${newCategory}`);
      }
      
      // Check position only if both channels have positions
      if (typeof oldChannel.position === 'number' && 
          typeof newChannel.position === 'number' && 
          oldChannel.position !== newChannel.position) {
        changes.push(`Position: ${oldChannel.position} → ${newChannel.position}`);
      }

      if (changes.length > 0) {
        logger.logEvent(newChannel.guild.id, 'channelUpdate', {
          client: newChannel.client,
          channel: newChannel,
          changes: changes.join('\n')
        });
      }
    } catch (error) {
      console.error('Error in channelUpdate:', error);
    }
  }
}; 