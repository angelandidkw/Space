const { PermissionsBitField } = require('discord.js');

const permissionCheck = {
  // Check user permissions
  checkUserPermissions(member, requiredPermissions) {
    if (!Array.isArray(requiredPermissions)) {
      requiredPermissions = [requiredPermissions];
    }
    
    const missingPermissions = [];
    
    for (const permission of requiredPermissions) {
      if (!member.permissions.has(permission)) {
        missingPermissions.push(permission);
      }
    }
    
    return {
      hasPermission: missingPermissions.length === 0,
      missing: missingPermissions
    };
  },

  // Format permission names for display
  formatPermission(permission) {
    return permission
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  },

  // Common permission combinations
  MODERATION: [
    PermissionsBitField.Flags.KickMembers,
    PermissionsBitField.Flags.BanMembers,
    PermissionsBitField.Flags.ManageMessages
  ],
  
  MANAGEMENT: [
    PermissionsBitField.Flags.ManageGuild,
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageRoles
  ],
  
  VOICE: [
    PermissionsBitField.Flags.MuteMembers,
    PermissionsBitField.Flags.DeafenMembers,
    PermissionsBitField.Flags.MoveMembers
  ]
};

module.exports = permissionCheck; 