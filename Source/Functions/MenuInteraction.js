const { 
    Client,
    SelectMenuInteraction,
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SelectMenuBuilder
} = require('discord.js');

const API = require('../API');
const Utils = require('../Utilities');

/**
 * 
 * @param {Client} client 
 * @param {SelectMenuInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    const menuID = interaction.customId.split('-')

    if (menuID[0] === 'servers') {
        interaction.deferUpdate();

        if (menuID[1] !== interaction.member.id) return;

        const details = await API.serverDetails(client, interaction.values[0], interaction.member.id);
        const resource = await API.serverResource(client, interaction.values[0], interaction.member.id);

        return interaction.editReply({
            embeds: [new EmbedBuilder()
                .setColor(Utils.statusColor(resource.current_state))
                .setImage('attachment://status.png')
            ],
            files: [new AttachmentBuilder(
                await require('../Build/stats')(details, resource), { name: 'status.png' }
            )],
            components: [
                new ActionRowBuilder().addComponents(new SelectMenuBuilder(interaction.component.data)),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`${details.identifier}-${interaction.member.id}-start`)
                        .setLabel('Start')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`${details.identifier}-${interaction.member.id}-restart`)
                        .setLabel('Restart')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`${details.identifier}-${interaction.member.id}-stop`)
                        .setLabel('Stop')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`${details.identifier}-${interaction.member.id}-kill`)
                        .setLabel('Force Stop')
                        .setStyle(ButtonStyle.Danger)
                )
            ]
        });
    }
}