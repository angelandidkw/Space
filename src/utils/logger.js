const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const loggersPath = path.join(process.cwd(), 'loggers.json');
let logChannels = {};
try {
  logChannels = JSON.parse(fs.readFileSync(loggersPath, 'utf8'));
} catch (error) {
  logChannels = {};
  fs.writeFileSync(loggersPath, '{}', 'utf8');
}

const EVENT_ICONS = {
  messageDelete: '🗑️',
  messageEdit: '✏️',
  guildMemberAdd: '👋',
  guildMemberRemove: '👞',
  guildMemberUpdate: '👤',
  voiceStateUpdate: '🎧',
  channelCreate: '➕',
  channelDelete: '➖',
  guildUpdate: '🌐',
  roleCreate: '🆕',
  roleDelete: '❌',
  threadCreate: '🧵',
  threadDelete: '🗑️',
  emojiCreate: '😀',
  emojiDelete: '❌',
  messageUpdate: '✏️'
};

function getChannelId(guildConfig, type) {
  if (!guildConfig || !guildConfig[type]) return null;
  return guildConfig[type].id || guildConfig[type];
}

module.exports = {
  async logEvent(guildId, eventType, data) {
    try {
      const guildConfig = logChannels[guildId];
      if (!guildConfig) return;

      let channelId;
      switch (eventType) {
        case 'messageDelete':
        case 'messageUpdate':
          channelId = getChannelId(guildConfig, 'messages');
          break;
        case 'guildMemberAdd':
        case 'guildMemberRemove':
        case 'guildMemberUpdate':
          channelId = getChannelId(guildConfig, 'members');
          break;
        case 'voiceStateUpdate':
          channelId = getChannelId(guildConfig, 'voice');
          break;
        case 'guildUpdate':
        case 'channelCreate':
        case 'channelDelete':
          channelId = getChannelId(guildConfig, 'server');
          break;
        default:
          channelId = getChannelId(guildConfig, 'mod');
      }

      if (!channelId) return;
      const channel = await data.client.channels.fetch(channelId);
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTimestamp();

      switch (eventType) {
        case 'messageDelete':
          embed.setTitle('🗑️ Message Deleted')
               .setDescription(`**Author:** ${data.author}\n**Channel:** ${data.channel}\n**Content:** ${data.content}`);
          break;
        case 'guildMemberAdd':
          embed.setTitle('👋 Member Joined')
               .setDescription(`**Member:** ${data.member}`);
          break;
        case 'guildMemberRemove':
          embed.setTitle('👋 Member Left')
               .setDescription(`**Member:** ${data.member}`);
          break;
        case 'guildUpdate':
          embed.setTitle('⚙️ Server Updated')
               .setDescription(`**Changes:**\n${data.changeType}`);
          break;
        case 'voiceStateUpdate':
          embed.setTitle('🎮 Voice Status Changed')
               .setDescription(`**Member:** ${data.member}\n**Action:** ${data.action}`);
          break;
        case 'channelCreate':
          embed.setTitle('➕ Channel Created')
               .setDescription(`**Name:** ${data.channel}\n**Type:** ${data.type}\n**Category:** ${data.category}`)
               .setFooter({ text: 'New Channel' });
          break;
        case 'channelDelete':
          embed.setTitle('➖ Channel Deleted')
               .setDescription(`**Name:** ${data.channel}\n**Type:** ${data.type}\n**Category:** ${data.category}`)
               .setFooter({ text: 'Channel Removed' });
          break;
        case 'channelUpdate':
          embed.setTitle('�� Channel Updated')
               .setDescription(`**Channel:** ${data.channel}\n**Changes:**\n${data.changes}`)
               .setFooter({ text: 'Channel Modified' });
          break;
        case 'roleCreate':
          embed.setTitle('🆕 Role Created')
               .setDescription(`**Name:** ${data.role.name}\n**Color:** ${data.role.hexColor}`)
               .setColor(data.role.hexColor);
          break;
        case 'roleDelete':
          embed.setTitle('❌ Role Deleted')
               .setDescription(`**Name:** ${data.role.name}`);
          break;
        case 'roleUpdate':
          embed.setTitle('📝 Role Updated')
               .setDescription(`**Role:** ${data.role.name}\n**Changes:**\n${data.changes}`);
          break;
        case 'threadCreate':
          embed.setTitle('🧵 Thread Created')
               .setDescription(`**Name:** ${data.thread.name}\n**Parent Channel:** ${data.parent.name}\n**Created by:** <@${data.creator}>`);
          break;
        case 'emojiCreate':
          embed.setTitle('😀 Emoji Added')
               .setDescription(`**Name:** ${data.name}\n**Animated:** ${data.animated ? 'Yes' : 'No'}`)
               .setThumbnail(data.url);
          break;
        case 'guildMemberUpdate':
          embed.setTitle('👤 Member Updated')
               .setDescription(`**Member:** ${data.member}\n**Changes:**\n${data.changes}`)
               .setThumbnail(data.member.displayAvatarURL());
          break;
        case 'messageUpdate':
          embed.setTitle('✏️ Message Edited')
               .setDescription(`**Author:** ${data.author}\n**Channel:** ${data.channel}\n[Jump to Message](${data.messageURL})`)
               .addFields(
                 { name: 'Before', value: data.oldContent || '*Empty*', inline: false },
                 { name: 'After', value: data.newContent || '*Empty*', inline: false }
               );
          break;
      }

      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Logging Error:', error);
    }
  },

  getLogConfig(guildId) {
    const config = logChannels[guildId] || {};
    return {
      mod: config.mod?.id || config.mod,
      messages: config.messages?.id || config.messages,
      members: config.members?.id || config.members,
      voice: config.voice?.id || config.voice,
      server: config.server?.id || config.server
    };
  }
}; 