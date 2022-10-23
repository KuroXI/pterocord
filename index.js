const { Client, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        'Guilds',
        'GuildIntegrations',
        'GuildMembers',
        'GuildMessages',
        'MessageContent'
    ]
});

client.slash = new Collection();
client.accounts = new Collection();

const config = require('./config.json');

const applicationFiles = fs.readdirSync('./Source/Command/').filter((file) => file.endsWith('.js'));
applicationFiles.forEach((file) => {
    const applicationCommand = require(`./Source/Command/${file}`);
    client.slash.set(applicationCommand.config.data.name, applicationCommand);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand())
        return require('./Source/Functions/CommandInteraction')(client, interaction);
    if (interaction.isSelectMenu())
        return require('./Source/Functions/MenuInteraction')(client, interaction);
    if (interaction.isButton())
        return require('./Source/Functions/ButtonInteraction')(client, interaction);
    if (interaction.isModalSubmit())
        return require('./Source/Functions/ModalInteraction')(client, interaction)
});

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`);

    fs.readFile('./Source/Data/account.json', (err, data) => {
        if (err) console.error(err);

        let obj = JSON.parse(data);
        for (const user of obj.data) client.accounts.set(user.id, user.api);
    });

    require('./Source/Functions/RegisterCommand')(client)
});
client.login(config.TOKEN);