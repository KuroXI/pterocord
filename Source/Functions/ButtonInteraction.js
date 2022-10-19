const { Client, ButtonInteraction, EmbedBuilder, AttachmentBuilder } = require('discord.js');
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

    const currentResource = await API.serverResource(client, buttonID[0], buttonID[1]);
    if (buttonID[2] === 'start' && currentResource.current_state === 'running') return;
    if (buttonID[2] === 'restart' && currentResource.current_state !== 'running') return;
    if (buttonID[2] === 'stop' && currentResource.current_state !== 'running') return;
    if (buttonID[2] === 'kill' && currentResource.current_state !== 'running') return;

    await API.powerState(client, buttonID[0], buttonID[1], buttonID[2]);

    switch(buttonID[2]) {
        case 'start':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Green')
                .setDescription('**Starting the server, Please wait!**')
                ], files: []
            });
            break;
        case 'restart':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Orange')
                .setDescription('**Restarting the server, Please wait!**')
                ], files: []
            });
            break;
        case 'stop':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('**Stopping the server, Please wait!**')
                ], files: []
            });
            break;
        case 'kill':
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription('**Force stopping the server, Please wait!**')
                ], files: []
            });
            break;
    }

    await sleep(10000);

    const resource = await API.serverResource(client, buttonID[0], buttonID[1]);
    const details = await API.serverDetails(client, buttonID[0], buttonID[1]);

    return await interaction.editReply({
        embeds: [new EmbedBuilder()
            .setColor(Utils.statusColor(resource.current_state))
            .setImage('attachment://status.png')
        ],
        files: [new AttachmentBuilder(
            await require('../Build/stats')(details, resource), { name: 'status.png' }
        )]
    });
}