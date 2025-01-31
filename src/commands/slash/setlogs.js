const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setlogs')
    .setDescription('Configure logging channel for specific event types')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type of logs to configure')
        .setRequired(true)
        .addChoices(
          { name: 'Moderation', value: 'mod' },
          { name: 'Messages', value: 'messages' },
          { name: 'Members', value: 'members' },
          { name: 'Voice', value: 'voice' }
        ))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel to send logs to')
        .setRequired(true)),
  async execute(interaction) {
    const logType = interaction.options.getString('type');
    const channel = interaction.options.getChannel('channel');
    
    // Update loggers.json
    const loggersPath = path.join(process.cwd(), 'loggers.json');
    let logChannels = {};
    try {
      logChannels = JSON.parse(fs.readFileSync(loggersPath, 'utf8'));
    } catch (error) {
      logChannels = {};
    }
    
    if (!logChannels[interaction.guild.id]) logChannels[interaction.guild.id] = {};
    logChannels[interaction.guild.id][logType] = channel;
    
    fs.writeFileSync(loggersPath, JSON.stringify(logChannels, null, 2));
    
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('✅ Logging Configured')
      .setDescription(`Successfully set ${channel} as the logging channel for **${logType}** events`)
      .setFooter({ text: 'Changes may take up to 1 minute to apply' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}; 