const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
  name: 'join',
  description: 'Join a voice channel',
  async execute(message, args) {
    try {
      // Check if user is in a voice channel
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ You need to be in a voice channel first!')
          ]
        });
      }

      // Check bot permissions
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has([
        PermissionsBitField.Flags.Connect,
        PermissionsBitField.Flags.Speak,
        PermissionsBitField.Flags.ViewChannel
      ])) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ I need permissions to join and speak in that channel!')
          ]
        });
      }

      // Check if bot is already in a voice channel in this guild
      const botCurrentChannel = message.guild.members.me.voice.channel;
      if (botCurrentChannel) {
        if (botCurrentChannel.id === voiceChannel.id) {
          return message.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('#ff9900')
                .setDescription('⚠️ I\'m already in that voice channel!')
            ]
          });
        } else {
          return message.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('#ff9900')
                .setDescription(`⚠️ I'm already in ${botCurrentChannel}! Use \`!leave\` first.`)
            ]
          });
        }
      }

      try {
        // Join the voice channel
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
          selfDeaf: false,
          selfMute: false
        });

        // Create audio player
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
          },
        });

        connection.subscribe(player);

        // Set up connection status handlers
        connection.on('stateChange', (oldState, newState) => {
          console.log(`Connection state changed from ${oldState.status} to ${newState.status}`);
          if (newState.status === 'disconnected') {
            message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor('#ff9900')
                  .setDescription('🔌 Disconnected from voice channel.')
              ]
            });
          }
        });

        // Success message
        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setTitle('🎵 Voice Channel Joined')
          .setDescription(`Successfully joined ${voiceChannel}`)
          .addFields(
            { name: 'Channel', value: voiceChannel.name, inline: true },
            { name: 'Members', value: `${voiceChannel.members.size}`, inline: true }
          )
          .setFooter({ text: 'Use !leave to disconnect' })
          .setTimestamp();

        message.reply({ embeds: [embed] });

      } catch (error) {
        console.error('Voice connection error:', error);
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ Failed to join the voice channel. Please try again.')
          ]
        });
      }
    } catch (error) {
      console.error('Join command error:', error);
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription('❌ An error occurred while executing the command.')
        ]
      });
    }
  }
}; 