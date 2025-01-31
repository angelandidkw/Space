# 🚀 Space Bot

<div align="center">

![Space Bot Logo](https://your-logo-url-here.png)

[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.9.0-brightgreen.svg)](https://nodejs.org)

*A powerful Discord bot for comprehensive server logging, voice management, and moderation.*

[Installation](#installation) •
[Features](#features) •
[Commands](#commands) •
[Configuration](#configuration) •
[Support](#support)

</div>

---

## ✨ Features

### 📝 Advanced Logging System
- Message tracking (edits, deletions)
- Member activity (joins, leaves, updates)
- Voice channel monitoring
- Server changes & updates
- Role modifications
- Channel management logs

### 🎮 Voice Channel Management
- Simple voice channel joining (`!join`)
- Persistent connection
- Clean disconnection (`!leave`)
- Voice state tracking
- Multi-channel support

### 🛡️ Moderation Tools
- Permission-based commands
- Role management
- User verification
- Channel control
- Audit logging

### ⚙️ Server Management
- Customizable logging channels
- Automated setup
- Backup system
- Configuration dashboard

## 🚀 Installation

### Prerequisites
- Node.js (v16.9.0 or higher)
- Discord Bot Token
- Server Admin Permissions

### Quick Start
1. **Clone & Install**
```bash
git clone https://github.com/yourusername/space-bot.git
cd space-bot
npm install
```

2. **Configure Environment**
Create a `.env` file:
```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
```

3. **Deploy & Run**
```bash
# Deploy slash commands
node src/deploy-commands.js

# Start the bot
node src/index.js
```

## 🎮 Commands

### Prefix Commands (`!`)
| Command | Description | Permission |
|---------|-------------|------------|
| `!help` | Show all commands | None |
| `!loggers` | View log settings | None |
| `!join` | Join voice channel | Voice |
| `!leave` | Leave voice channel | Voice |
| `!ping` | Check latency | None |

### Slash Commands (`/`)
| Command | Description | Permission |
|---------|-------------|------------|
| `/setup-logs` | Auto-setup logging | Admin |
| `/setlogs` | Configure log channels | Admin |
| `/loggers` | View log dashboard | None |
| `/help` | Command guide | None |

## ⚙️ Configuration

### Logging Setup
```bash
# Automatic Setup
/setup-logs
# Creates all necessary channels under "Server Logs" category

# Manual Configuration
/setlogs [type] [#channel]
# Types: mod, messages, members, voice, server
```

### Permission Levels
```javascript
MODERATION: [
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'MANAGE_MESSAGES'
]

MANAGEMENT: [
  'MANAGE_GUILD',
  'MANAGE_CHANNELS',
  'MANAGE_ROLES'
]

VOICE: [
  'CONNECT',
  'SPEAK',
  'MOVE_MEMBERS'
]
```

## 📁 Project Structure
```
space-bot/
├── src/
│   ├── commands/
│   │   ├── prefix/
│   │   └── slash/
│   ├── events/
│   ├── utils/
│   ├── index.js
│   └── deploy-commands.js
├── .env
├── package.json
└── README.md
```

## 🔧 Advanced Configuration

### Custom Logging
```javascript
// loggers.json
{
  "guildId": {
    "mod": "channel_id",
    "messages": "channel_id",
    "members": "channel_id",
    "voice": "channel_id",
    "server": "channel_id"
  }
}
```

### Backup System
- Automatic backups in `backups/`
- Timestamped files
- Easy restoration
- JSON format

## 🛡️ Required Permissions
- `READ_MESSAGES`
- `SEND_MESSAGES`
- `MANAGE_MESSAGES`
- `VIEW_AUDIT_LOG`
- `MANAGE_CHANNELS`
- `CONNECT`
- `SPEAK`
- `MANAGE_ROLES`

## 🔍 Troubleshooting

### Common Issues
1. **Bot Not Responding**
   - Check token in `.env`
   - Verify permissions
   - Check Node.js version

2. **Logging Not Working**
   - Verify channel permissions
   - Check `loggers.json`
   - Ensure proper setup

3. **Voice Commands Failed**
   - Check voice permissions
   - Verify bot connection
   - Check channel access

## 📚 Documentation

Detailed documentation available at:
- [Command Guide](docs/COMMANDS.md)
- [Configuration](docs/CONFIG.md)
- [API Reference](docs/API.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 💬 Support

- [Discord Server](https://discord.gg/your-server)
- [GitHub Issues](https://github.com/yourusername/space-bot/issues)
- [Documentation](https://your-docs-url.com)

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌟 Acknowledgments

- [Discord.js](https://discord.js.org)
- [Node.js](https://nodejs.org)
- All contributors

---

<div align="center">
Made with ❤️ by [Your Name]

[⬆ Back to Top](#space-bot)
</div>
