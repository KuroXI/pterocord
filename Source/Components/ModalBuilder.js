const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = (serverID, memberID) => {
    return new ModalBuilder()
        .setTitle('Send Command')
        .setCustomId('sendcommand')
        .addComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setLabel('\u200b')
                    .setCustomId(`${serverID}-${memberID}-command`)
                    .setStyle(TextInputStyle.Short)
            )
    )
}