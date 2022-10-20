const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (serverID, memberID) => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-start`)
            .setLabel('Start')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-restart`)
            .setLabel('Restart')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-stop`)
            .setLabel('Stop')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-kill`)
            .setLabel('Force Stop')
            .setStyle(ButtonStyle.Danger)
    )
}