const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'loggers',
  description: 'Show logging configuration dashboard',
  execute(message) {
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('📊 Server Logging Dashboard')
      .setDescription('Manage what events get logged in this server\n\n**Available Log Types:**')
      .addFields(
        { name: '🔧 Setup Guide', value: 'Use `!setlogs <type> <#channel>` to configure\nExample: `!setlogs mod #mod-logs`' },
        { name: '📋 Log Types', value: '`mod` `messages` `members` `voice`\n`server` `joins` `leaves`' }
      )
      .setFooter({ text: `Requested by ${message.author.username} • Use /loggers for slash command version` });

    message.reply({ embeds: [embed] });
  }
}; 