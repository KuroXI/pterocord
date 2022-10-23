const { Client, ButtonInteraction, EmbedBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const API = require('../API');
const Utils = require('../Utilities');
const sleep = require('util').promisify(setTimeout);

/**
 * 
 * @param {Client} client 
 * @param {ButtonInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    if (!interaction.deferred) interaction.deferUpdate();

    const buttonID = interaction.customId.split('-');

    if (interaction.member.id !== buttonID[1]) return;
    const api = client.accounts.get(buttonID[1]);

    if (buttonID[2] === 'console') {
        const modal = require('../Components/ModalBuilder').console(buttonID[0], buttonID[1]);
        return await interaction.showModal(modal);
    }

    if (buttonID[2] === 'rename') {
        const modal = require('../Components/ModalBuilder').rename(buttonID[0], buttonID[1]);
        return await interaction.showModal(modal);
    }

    if (buttonID[2] === 'reinstall') {
        const modal = require('../Components/ModalBuilder').reinstall(buttonID[0], buttonID[1]);
        return await interaction.showModal(modal);
    }

    await API.powerState(api, buttonID[0], buttonID[2]);
    switch(buttonID[2]) {
        case 'start':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Green')
                .setDescription('**Starting the server, Please wait!**')
            ]});
            break;
        case 'restart':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Orange')
                .setDescription('**Restarting the server, Please wait!**')
            ]});
            break;
        case 'stop':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('**Stopping the server, Please wait!**')
                ]});
            break;
        case 'kill':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('**Force stopping the server, Please wait!**')
            ]});
            break;
    }

    await sleep(10000);

    const resource = await API.serverResource(api, buttonID[0]);
    const details = await API.serverDetails(api, buttonID[0]);

    if (resource.current_state === 'running') {
        const docs = await require('../Components/DescriptionBuilder')(details, resource);

        return await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setColor(Utils.statusFormat(resource.current_state).color)
                .setTitle(`${details.name} - ${Utils.statusFormat(resource.current_state).state}`)
                .setDescription(Utils.textFormat(docs.join('\n')))
            ],
            components: [
                await require('../Components/MenuBuilder')(client, buttonID[1]),
                require('../Components/ButtonBuilder').power(buttonID[0], buttonID[1], resource),
                require('../Components/ButtonBuilder').setting(buttonID[0], buttonID[1], resource)
            ]
        });
    }

    return interaction.editReply({
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setDescription('The server is offline')
        ],
        components: [
            await require('../Components/MenuBuilder')(client, buttonID[1]),
            require('../Components/ButtonBuilder').power(buttonID[0], buttonID[1], resource)
        ]
    });
}