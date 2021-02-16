require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
});
const welcome = require('./welcome');
const commands = require('./commands');

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.username} has logged in successfully.`);

    welcome({client: client});
    commands({client: client, Discord: Discord});

    client.user.setPresence({
        activity: {
            name: '$help',
            type: 'LISTENING',
        },
        status: 'idle'
    })

    // newUserTest();

    async function newUserTest() {
        // console.log(client.users.fetch('272766623029395456'));
        const wizzy = await client.users.fetch('272766623029395456');
        client.emit('guildMemberAdd', wizzy);
    }
})


