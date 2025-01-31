require('dotenv').config();
const { Client, Collection, GatewayIntentBits, ActivityType, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Initialize loggers.json if it doesn't exist
const loggersPath = path.join(__dirname, '../loggers.json');
if (!fs.existsSync(loggersPath)) {
  fs.writeFileSync(loggersPath, '{}', 'utf8');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Command handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands/slash');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// Add this after loading slash commands
client.prefixCommands = new Collection();
const prefixCommandsPath = path.join(__dirname, 'commands/prefix');
const prefixCommandFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));

for (const file of prefixCommandFiles) {
  const command = require(path.join(prefixCommandsPath, file));
  client.prefixCommands.set(command.name, command);
}

// Event handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);