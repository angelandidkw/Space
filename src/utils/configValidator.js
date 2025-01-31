module.exports = {
  validateLogType: (type) => {
    const validTypes = ['mod', 'messages', 'members', 'voice', 'server'];
    return validTypes.includes(type);
  },

  validateChannel: (channel) => {
    return channel.type === 'GUILD_TEXT' && 
           channel.permissionsFor(channel.guild.me).has('SEND_MESSAGES');
  }
}; 