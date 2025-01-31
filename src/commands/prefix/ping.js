module.exports = {
  name: 'ping',
  description: 'Test bot latency',
  execute(message) {
    message.reply('Pong! Use slash commands for better integration!');
  }
}; 