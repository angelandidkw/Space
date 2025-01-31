const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show bot help information'),
  async execute(interaction) {
    await interaction.reply({
      content: '**Bot Commands**\n`/help` - Show this help message\n`!ping` - Classic ping command',
      ephemeral: true
    });
  }
}; 