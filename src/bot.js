require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
});
const welcome = require('./welcome');
const commands = require('./commands');
const classMessage = require('./classSelection');

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.username} has logged in successfully.`);
    client.user.setPresence({
        activity: {
            name: '$help',
            type: 'LISTENING',
        },
        status: 'idle'
    })

    welcome({ client: client });
    classMessage({client: client, Discord: Discord});

    client.on('message', async message => {
        if (message.author.bot) return;
        
        if (message.channel.name == "welcome") {
            const lastMessages = await message.channel.messages.fetch({ limit: 2 });
            const lastMessage = lastMessages.last().content;
            if (lastMessage === "What's your first name? This will be your name on the server.") {
                const name = lastMessages.first().content;
                message.channel.send(`Thanks! You will now be renamed to ${name}.`);
                // client.guilds.cache.find(message.user).setNickname("FFF");
                console.log(message.member);
                message.member.setNickname(name);
                // client.guilds.cache.get(message.author.id).setNickname(name);
            } else {
                commands.commandHandler({ client: client, Discord: Discord, message: message });
            }

        } else {
            commands.commandHandler({ client: client, Discord: Discord, message: message });
        }
    });

    newUserTest();

    async function newUserTest() {
        // console.log(client.users.fetch('272766623029395456'));
        const wizzy = await client.users.fetch('272766623029395456');
        client.emit('guildMemberAdd', wizzy);
    }
})


