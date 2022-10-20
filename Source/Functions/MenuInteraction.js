const { 
    Client,
    SelectMenuInteraction,
    EmbedBuilder
} = require('discord.js');

const API = require('../API');
const Utils = require('../Utilities');

/**
 * 
 * @param {Client} client 
 * @param {SelectMenuInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    const menuID = interaction.customId.split('-');

    if (menuID[0] === 'servers') {
        interaction.deferUpdate();

        if (menuID[1] !== interaction.member.id) return;
        const api = client.accounts.get(menuID[1])

        const resource = await API.serverResource(api, interaction.values[0]);
        const details = await API.serverDetails(api, interaction.values[0]);

        if (resource.current_state === 'running') {
            const desc = await require('../Components/DescriptionBuilder')(details, resource);

            return interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor(Utils.statusFormat(resource.current_state).color)
                    .setTitle(`${details.name} - ${Utils.statusFormat(resource.current_state).state}`)
                    .setDescription(Utils.textFormat(desc.join('\n')))
                ],
                components: [
                    await require('../Components/MenuBuilder')(client, menuID[1]),
                    require('../Components/ButtonBuilder')(interaction.values[0], menuID[1])
                ]
            });
        }

        return interaction.editReply({
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('The server is either offline or starting. Please try again later.')
            ],
            components: [
                await require('../Components/MenuBuilder')(client, menuID[1]),
                require('../Components/ButtonBuilder')(interaction.values[0], menuID[1])
            ]
        });
    }
}