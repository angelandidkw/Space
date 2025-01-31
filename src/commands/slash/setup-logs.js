const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const logger = require('../../utils/logger');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-logs')
    .setDescription('Automatically create logging category and channels')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      // Create Logging category
      const category = await interaction.guild.channels.create({
        name: '🔒 Server Logs',
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });

      // Create log channels
      const channels = {
        mod: await createLogChannel('🛡️ moderation', category),
        messages: await createLogChannel('💬 messages', category),
        members: await createLogChannel('👥 members', category),
        voice: await createLogChannel('🎮 voice', category),
        server: await createLogChannel('⚙️ server', category)
      };

      // Update configuration
      const logChannels = require(path.join(process.cwd(), 'loggers.json'));
      logChannels[interaction.guild.id] = channels;
      fs.writeFileSync('loggers.json', JSON.stringify(logChannels, null, 2));

      const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle('✅ Logging System Setup Complete')
        .setDescription(`Created ${Object.values(channels).length} logging channels in ${category}`)
        .addFields(
          { name: 'Moderation', value: `<#${channels.mod.id}>`, inline: true },
          { name: 'Messages', value: `<#${channels.messages.id}>`, inline: true },
          { name: 'Members', value: `<#${channels.members.id}>`, inline: true },
          { name: 'Voice', value: `<#${channels.voice.id}>`, inline: true },
          { name: 'Server', value: `<#${channels.server.id}>`, inline: true }
        )
        .setFooter({ text: 'Logging channels are private by default' });

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error('Setup Error:', error);
      await interaction.editReply('❌ Failed to complete setup. Please check bot permissions.');
    }
  }
};

async function createLogChannel(name, category) {
  return category.guild.channels.create({
    name: name,
    type: ChannelType.GuildText,
    parent: category.id,
    permissionOverwrites: category.permissionOverwrites.cache.map(overwrite => overwrite)
  });
} 