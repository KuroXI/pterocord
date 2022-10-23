const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports.console = (serverID, memberID) => {
    return new ModalBuilder()
        .setTitle('Console')
        .setCustomId('console')
        .addComponents(new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setLabel('Send Command')
                .setCustomId(`${serverID}-${memberID}-console`)
                .setStyle(TextInputStyle.Short)
        )
    )
}

module.exports.rename = (serverID, memberID) => {
    return new ModalBuilder()
        .setTitle('Rename Server')
        .setCustomId('rename')
        .addComponents(new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setLabel('Name')
                .setCustomId(`${serverID}-${memberID}-rename`)
                .setStyle(TextInputStyle.Short)
        )
    )
}

module.exports.reinstall = (serverID, memberID) => {
    return new ModalBuilder()
        .setTitle('Confirm the reinstallment of the Server')
        .setCustomId('reinstall')
        .addComponents(new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setLabel(`Type " ${serverID} " to confirm`)
                .setPlaceholder('Some files may be deleted or modified during this process. Back up your server!')
                .setCustomId(`${serverID}-${memberID}-rename`)
                .setStyle(TextInputStyle.Paragraph)
        )
    )
}