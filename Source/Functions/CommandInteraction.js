const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    const commands = client.slash.get(interaction.commandName);

    if (!commands) return interaction.reply({
        embeds: [new EmbedBuilder()
            .setColor('Red')
            .setDescription('Invalid command!')
        ],
        ephemeral: true
    });

    try {
        await commands(client, interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('Error occur while executing the command. Contact an admin to check the console!')
            ],
            ephemeral: true
        });
    };
}