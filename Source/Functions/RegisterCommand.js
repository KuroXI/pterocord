const { Client, Routes, REST } = require('discord.js');
const fs = require('fs');

const { TOKEN } = require('../../config.json');

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    const commands = [];
    const commandFiles = fs.readdirSync('./Source/Command/').filter((file) => file.endsWith('.js'));

    commandFiles.forEach((file) => {
        const command = require(`../Command/${file}`);
        commands.push(command.config.data.toJSON());
    });

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        await rest.put(Routes.applicationGuildCommands(client.user.id, '869903804093583361'), { body: commands });
        console.log(`[SLASH COMMAND] : Successfully registered ${commands.length} command(s) in private server!`);
    } catch (error) {
        console.error(error);
    }
}