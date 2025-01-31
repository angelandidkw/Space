const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loggers')
    .setDescription('Configure server logging settings'),
  async execute(interaction) {
    const config = logger.getLogConfig(interaction.guild.id);
    
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('📊 Server Logging Dashboard')
      .setDescription('Active logging configurations for this server\n')
      .addFields(
        { 
          name: '🛡️ Moderation Logging', 
          value: config.mod ? `<#${config.mod}>` : '*Not configured*',
          inline: true
        },
        { 
          name: '💬 Message Logging', 
          value: config.messages ? `<#${config.messages}>` : '*Not configured*',
          inline: true
        },
        { 
          name: '👥 Member Logging', 
          value: config.members ? `<#${config.members}>` : '*Not configured*',
          inline: true
        },
        { 
          name: '🎮 Voice Logging', 
          value: config.voice ? `<#${config.voice}>` : '*Not configured*',
          inline: true
        }
      )
      .setFooter({ 
        text: `Configure with /setlogs | Last updated: ${new Date().toLocaleDateString()}` 
      });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}; 