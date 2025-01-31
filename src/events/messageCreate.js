const { Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const permissionCheck = require('../utils/permissionCheck');

module.exports = {
  name: 'messageCreate',
  execute(message) {
    if (message.author.bot) return;

    // Load prefix commands
    const prefixCommands = new Collection();
    const commandsPath = path.join(__dirname, '../commands/prefix');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      prefixCommands.set(command.name, command);
    }

    // Check for prefix commands
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = prefixCommands.get(commandName);
    if (!command) return;

    try {
      // Check if command has required permissions
      if (command.permissions) {
        const check = permissionCheck.checkUserPermissions(message.member, command.permissions);
        
        if (!check.hasPermission) {
          const missingPerms = check.missing
            .map(perm => `\`${permissionCheck.formatPermission(perm)}\``)
            .join(', ');
            
          return message.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(`❌ You need the following permissions to use this command:\n${missingPerms}`)
            ]
          });
        }
      }

      command.execute(message, args, prefix);
    } catch (error) {
      console.error(error);
      message.reply('There was an error executing that command!');
    }
  }
}; 