const { Client, ButtonInteraction, EmbedBuilder } = require('discord.js');
const API = require('../API');
const Utils = require('../Utilities');
const sleep = require('util').promisify(setTimeout);

/**
 * 
 * @param {Client} client 
 * @param {ButtonInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    interaction.deferUpdate();
    const buttonID = interaction.customId.split('-');

    if (interaction.member.id !== buttonID[1]) return;
    const api = client.accounts.get(buttonID[1]);

    const currentResource = await API.serverResource(api, buttonID[0]);
    if (buttonID[2] === 'start' && currentResource.current_state === 'running') return;
    if (buttonID[2] === 'restart' && currentResource.current_state !== 'running') return;
    if (buttonID[2] === 'stop' && currentResource.current_state !== 'running') return;
    if (buttonID[2] === 'kill' && currentResource.current_state !== 'running') return;

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
                require('../Components/ButtonBuilder')(buttonID[0], buttonID[1])
            ]
        });
    }

    return interaction.editReply({
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setDescription('The server is either offline or starting. Please try again later.')
        ],
        components: [
            await require('../Components/MenuBuilder')(client, buttonID[1]),
            require('../Components/ButtonBuilder')(buttonID[0], buttonID[1])
        ]
    });
}