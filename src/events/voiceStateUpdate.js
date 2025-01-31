const logger = require('../utils/logger');

module.exports = {
  name: 'voiceStateUpdate',
  execute(oldState, newState) {
    try {
      if (!oldState || !newState) return;
      if (oldState.channelId === newState.channelId) return;
      
      let action = '';
      if (!oldState.channelId && newState.channel) {
        action = `Joined ${newState.channel.name}`;
      } else if (!newState.channelId && oldState.channel) {
        action = `Left ${oldState.channel.name}`;
      } else if (oldState.channel && newState.channel) {
        action = `Moved from ${oldState.channel.name} to ${newState.channel.name}`;
      } else {
        return; // Skip if we can't determine the action
      }

      logger.logEvent(newState.guild.id, 'voiceStateUpdate', {
        client: newState.client,
        member: newState.member,
        action: action,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error in voiceStateUpdate:', error);
    }
  }
}; 