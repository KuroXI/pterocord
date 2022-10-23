const { Client, ModalSubmitInteraction, EmbedBuilder } = require('discord.js');
const API = require('../API');
const Utils = require('../Utilities');

/**
 * 
 * @param {Client} client 
 * @param {ModalSubmitInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    if (interaction.customId === 'console') {
        const id = interaction.components[0].components[0].customId;
        const idArr = id.split('-');
        const command = interaction.fields.getTextInputValue(id);
        const api = client.accounts.get(idArr[1]);

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Blurple')
                .setDescription(`Successfully send a command in the console!\n${Utils.textFormat(command, 'bash')}`)
            ],
            ephemeral: true
        });

        return await API.sendCommand(api, idArr[0], command);
    }

    if (interaction.customId === 'rename') {
        const id = interaction.components[0].components[0].customId;
        const idArr = id.split('-');
        const name = interaction.fields.getTextInputValue(id);
        const api = client.accounts.get(idArr[1]);

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Blurple')
                .setDescription(`Successfully rename the server to ${name}`)
            ],
            ephemeral: true
        });

        return await API.renameServer(api, idArr[0], name);
    }

    if (interaction.customId === 'reinstall') {
        const id = interaction.components[0].components[0].customId;
        const idArr = id.split('-');
        const name = interaction.fields.getTextInputValue(id);
        const api = client.accounts.get(idArr[1]);

        if (name !== idArr[0]) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('Entered Value and Server ID does not match')
                ]
            })
        };

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Blurple')
                .setDescription(`Successfully reinstall the server!`)
            ],
            ephemeral: true
        });

        return await API.reinstallServer(api, idArr[0]);
    }
}