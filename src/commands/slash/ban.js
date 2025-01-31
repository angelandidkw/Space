const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  permissions: [PermissionsBitField.Flags.BanMembers],
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to ban')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Command implementation...
  }
}; 