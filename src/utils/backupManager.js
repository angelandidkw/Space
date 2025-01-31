const fs = require('fs');
const path = require('path');

module.exports = {
  createBackup: () => {
    const backupData = {
      date: new Date().toISOString(),
      loggers: require('../../loggers.json')
    };

    const backupPath = path.join(__dirname, '../../backups');
    if (!fs.existsSync(backupPath)) fs.mkdirSync(backupPath);
    
    const filename = `loggers_backup_${Date.now()}.json`;
    fs.writeFileSync(path.join(backupPath, filename), JSON.stringify(backupData));
    return filename;
  },

  restoreBackup: (filename) => {
    const backupPath = path.join(__dirname, '../../backups', filename);
    if (fs.existsSync(backupPath)) {
      const backupData = JSON.parse(fs.readFileSync(backupPath));
      fs.writeFileSync('loggers.json', JSON.stringify(backupData.loggers, null, 2));
      return true;
    }
    return false;
  }
}; 