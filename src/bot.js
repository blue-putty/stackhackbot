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
                
                message.member.setNickname(name);
                message.member.roles.add('809954412277661737');

                const channel = await client.channels.cache.find(channel => channel.name === 'class-selection');
                message.channel.send(`Please check out ${channel} to sign up for your classes`);
            } else {
                commands.commandHandler({ client: client, Discord: Discord, message: message });
            }

        } else {
            commands.commandHandler({ client: client, Discord: Discord, message: message });
        }
    });

    newUserTest();

    async function newUserTest() {
        const me = await client.users.fetch(process.env.TEST_USER);
        client.emit('guildMemberAdd', me);
    }
})


