const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a member',
  permissions: [PermissionsBitField.Flags.KickMembers],
  async execute(message, args) {
    // Command implementation...
  }
}; 