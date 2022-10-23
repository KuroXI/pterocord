const { 
    Client,
    SelectMenuInteraction,
    EmbedBuilder
} = require('discord.js');

const API = require('../API');
const Utils = require('../Utilities');
const sleep = require('util').promisify(setTimeout);

/**
 * 
 * @param {Client} client 
 * @param {SelectMenuInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    if (!interaction.deferred) interaction.deferUpdate();
    const menuID = interaction.customId.split('-');

    if (menuID[0] === 'servers') {
        if (menuID[1] !== interaction.member.id) return;
        const api = client.accounts.get(menuID[1])

        const details = await API.serverDetails(api, interaction.values[0]);
        if (details.is_installing) {
            interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`Server is installing. Please wait!`)
                ],
                components: [ await require('../Components/MenuBuilder')(client, menuID[1]) ]
            });

            await sleep(5000);
            return require('./MenuInteraction')(client, interaction);
        }
        
        if (details.is_suspended) {
            return interaction.editReply({
                embeds: [ new EmbedBuilder().setColor('Red').setDescription(`This server is suspended!`) ],
                components: [ await require('../Components/MenuBuilder')(client, menuID[1]) ]
            });
        }

        const resource = await API.serverResource(api, interaction.values[0]);

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
                    require('../Components/ButtonBuilder').power(interaction.values[0], menuID[1], resource),
                    require('../Components/ButtonBuilder').setting(interaction.values[0], menuID[1], resource)
                ]
            });
        }

        return interaction.editReply({
            embeds: [ new EmbedBuilder().setColor('Red').setDescription('Server is offline!') ],
            components: [
                await require('../Components/MenuBuilder')(client, menuID[1]),
                require('../Components/ButtonBuilder').power(interaction.values[0], menuID[1], resource)
            ]
        });
    }
}