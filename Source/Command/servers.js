const {
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    if (!client.accounts.get(interaction.member.id))
        return interaction.reply({ 
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('Your account is not binded. Use the command `/bind`')
            ],
            ephemeral: true
    });

    return interaction.reply({ components: [
        await require('../Components/MenuBuilder')(client, interaction.member.id)
    ]});
}

module.exports.config = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('See the status of your servers')
};