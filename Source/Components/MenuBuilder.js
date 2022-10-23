const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const API = require('../API');

module.exports = async (client, memberID) => {
    const list = await API.serverList(client.accounts.get(memberID));
    let serverList = [];

    for (const server of list) {
        serverList.push({
            label: server.attributes.name,
            value: server.attributes.identifier
        });
    }

    return new ActionRowBuilder().addComponents(new SelectMenuBuilder()
        .setMaxValues(1)
        .setCustomId(`servers-${memberID}`)
        .setPlaceholder('Select a server')
        .addOptions(serverList)
    )
}