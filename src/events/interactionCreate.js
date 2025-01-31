const { Events, EmbedBuilder } = require('discord.js');
const permissionCheck = require('../utils/permissionCheck');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      // Check if command has required permissions
      if (command.permissions) {
        const check = permissionCheck.checkUserPermissions(interaction.member, command.permissions);
        
        if (!check.hasPermission) {
          const missingPerms = check.missing
            .map(perm => `\`${permissionCheck.formatPermission(perm)}\``)
            .join(', ');
            
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(`❌ You need the following permissions to use this command:\n${missingPerms}`)
            ],
            ephemeral: true
          });
        }
      }

      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ 
          content: '❌ There was an error executing this command!',
          ephemeral: true 
        });
      } else {
        await interaction.reply({ 
          content: '❌ There was an error executing this command!',
          ephemeral: true 
        });
      }
    }
  }
}; 