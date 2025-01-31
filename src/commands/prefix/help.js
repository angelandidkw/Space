const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Show help information',
  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor('#2B2D31') // Discord's dark theme chat color
      .setAuthor({
        name: 'Available Commands',
        iconURL: message.client.user.displayAvatarURL()
      })
      .setDescription('Here are all the commands you can use with Space Bot:')
      .addFields(
        { 
          name: 'Prefix Commands',
          value: '`!help` - Show help\n`!loggers` - Logging setup\n`!ping` - Check latency\n`!join` - Join voice channel\n`!leave` - Leave voice channel'
        },
        {
          name: 'Slash Commands', 
          value: '`/help` - Help menu\n`/loggers` - Logging dashboard\n`/ping` - Check bot status'
        }
      )
      .setFooter({ 
        text: `Requested by ${message.author.username}`, // Username instead of tag for 14+
        iconURL: message.author.displayAvatarURL()
      })
      .setTimestamp();

    await message.reply({ 
      embeds: [embed], 
      allowedMentions: { repliedUser: false }
    });
  }
};