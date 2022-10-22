const { Client, ModalSubmitInteraction, EmbedBuilder } = require('discord.js');
const API = require('../API');
const Utils = require('../Utilities');

/**
 * 
 * @param {Client} client 
 * @param {ModalSubmitInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    if (interaction.customId !== 'sendcommand') return;

    const modalID = interaction.components[0].components[0].customId.split('-');

    const command = interaction.fields.getTextInputValue(interaction.components[0].components[0].customId);
    const api = client.accounts.get(modalID[1]);

    interaction.reply({
        embeds: [new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(`Command sent!\n${Utils.textFormat(command, 'bash')}`)
        ],
        ephemeral: true
    });

    return await API.sendCommand(api, modalID[0], command);
}