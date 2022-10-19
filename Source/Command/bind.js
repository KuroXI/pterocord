const {
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    SlashCommandStringOption,
    EmbedBuilder
} = require('discord.js');
const fs = require('fs');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = (client, interaction) => {
    const accountData = {
        id: interaction.member.id,
        api: interaction.options.getString('api')
    };

    fs.readFile('./Source/Data/account.json', (err, data) => {
        if (err) console.error(err);

        let obj = JSON.parse(data);
        obj.data.push(accountData);

        fs.writeFile('./Source/Data/account.json', JSON.stringify(obj, null, 4), 'utf-8', (err) => {
            if (err) console.log(err);
        });
    });

    return interaction.reply({
        embeds: [new EmbedBuilder()
            .setColor('Green')
            .setDescription(`Your API key is \`${interaction.options.getString('api')}\``)
        ],
        ephemeral: true
    })
}

module.exports.config = {
    data: new SlashCommandBuilder()
        .setName('bind')
        .setDescription('Bind your pterodactyl account in your discord account!')
        .addStringOption(
            new SlashCommandStringOption()
                .setName('api')
                .setDescription('Specify your API key')
                .setRequired(true)
        )
};