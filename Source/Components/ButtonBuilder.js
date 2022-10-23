const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports.power = (serverID, memberID, resource) => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-start`)
            .setLabel('Start')
            .setStyle(ButtonStyle.Success)
            .setDisabled((resource.current_state === 'running') ? true : false),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-restart`)
            .setLabel('Restart')
            .setStyle(ButtonStyle.Primary)
            .setDisabled((resource.current_state === 'running') ? false : true),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-stop`)
            .setLabel('Stop')
            .setStyle(ButtonStyle.Danger)
            .setDisabled((resource.current_state === 'running') ? false : true),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-kill`)
            .setLabel('Force Stop')
            .setStyle(ButtonStyle.Danger)
            .setDisabled((resource.current_state === 'running') ? false : true)
    )
}

module.exports.setting = (serverID, memberID, resource) => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-console`)
            .setLabel('Send Command')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled((resource.current_state === 'running') ? false : true),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-rename`)
            .setLabel('Rename')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId(`${serverID}-${memberID}-reinstall`)
            .setLabel('Reinstall')
            .setStyle(ButtonStyle.Danger),
    )
}