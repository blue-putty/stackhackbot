module.exports = (args) => {
    const client = args.client;
    client.on('guildMemberAdd', async (member) => {
        const channel = await client.channels.cache.find(channel => (channel.name === 'welcome' && channel.type !== 'category'));

        const greetings = [
            "Welcome",
            "Hey",
            "Welcome aboard",
            "Nice to meet you",
            "How do you do",
            "How you doin",
            "Hi",
            "Hello",
            "Nice to see you",
            "It’s great to see you",
            "Good to see you",
            "What’s up",
            "Sup",
            "Ahoy",
            "What's, poppin'"
        ]

        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        const message = `${greeting}, <@${member.id}>! \n` +
            "It's a pleasure to have you here. Please check my DM to you so I can get you started!";
        channel.send(message);

        member.send(`${greeting}, <@${member.id}>! \n`);
        member.send("What's your first name?");

        client.on('message', msg => {
            if (msg.channel.type == "dm") {
                msg.author.send("Thanks!");
                return;
            }
        });
    });
}