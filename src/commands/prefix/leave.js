const { EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'leave',
  description: 'Leave the current voice channel',
  async execute(message) {
    try {
      const voiceChannel = message.guild.members.me.voice.channel;
      
      if (!voiceChannel) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff9900')
              .setDescription('⚠️ I\'m not in a voice channel!')
          ]
        });
      }

      // Check if user is in the same voice channel
      if (message.member.voice.channel?.id !== voiceChannel.id) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ You need to be in the same voice channel as me!')
          ]
        });
      }

      try {
        // Get and destroy the voice connection
        const connection = getVoiceConnection(message.guild.id);
        if (connection) {
          connection.destroy();
        }

        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setTitle('👋 Voice Channel Left')
          .setDescription(`Successfully left ${voiceChannel.name}`)
          .setTimestamp();

        message.reply({ embeds: [embed] });
      } catch (error) {
        console.error('Voice disconnection error:', error);
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ Failed to leave the voice channel. Please try again.')
          ]
        });
      }
    } catch (error) {
      console.error('Leave command error:', error);
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