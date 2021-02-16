module.exports = async (client, Discord) => {
    const channel = await client.channels.cache.find(channel => channel.name === 'class-selection');

    const classEmojis = [
        { emoji: '☕', roleId: '810915137103855638', desc: 'Java' },
        { emoji: '🧡', roleId: '810915170670084097', desc: 'Scratch' },
        { emoji: '🐍', roleId: '810915157919924265', desc: 'Python' }
    ]

    const message = await createMessage();

    classEmojis.forEach(cls => {
        message.react(cls.emoji);
    });

    
    client.on('messageReactionAdd', (reaction, user) => {
        reactionHandler(reaction, user, 'add');
    });

    client.on('messageReactionRemove', (reaction, user) => {
        reactionHandler(reaction, user, 'remove');
    });

    function reactionHandler(reaction, user, action) {
        if (user.bot) return;

        if (reaction.message.id === message.id) {
            const name = reaction.emoji.name;
            const member = reaction.message.guild.members.cache.get(user.id);
            for (let i = 0; i < classEmojis.length; i++) {
                const cls = classEmojis[i];
                if (cls.emoji == name) {
                    member.roles[action](cls.roleId);
                    break;
                }
            }
        }
    };

    async function createMessage() {
        let description = 'Please react to the courses you want to take! \n \n Key:';
        classEmojis.forEach(cls => {
            description += `\n ${cls.emoji}  ${cls.desc}`
        });
        const message = new Discord.MessageEmbed()
            .setColor('#fc0303')
            .setTitle('Class Selection')
            .setDescription(description)
            .setFooter("You may always remove the reaction if you don't like the course");

        return await channel.send(message);
    }
}
