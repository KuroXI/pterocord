const {
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
} = require('discord.js');

const API = require('../API');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    await interaction.deferReply();
    if (!client.accounts.get(interaction.member.id)) return interaction.followUp({
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setDescription('Your account is not binded. Use the command `/bind`')
        ]
    });

    const list = await API.serverList(client, interaction.member.id);
    let serverList = [];

    for (const server of list) {
        serverList.push({
            label: server.attributes.name,
            value: server.attributes.identifier
        });
    }

    return interaction.followUp({
        components: [new ActionRowBuilder().setComponents(
            new SelectMenuBuilder()
                .setMaxValues(1)
                .setCustomId(`servers-${interaction.member.id}`)
                .setPlaceholder('Select a server')
                .addOptions(serverList)
        )]
    });
}

module.exports.config = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('See the status of your servers')
};