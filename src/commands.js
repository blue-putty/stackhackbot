const classMessage = require('./classSelection');
const PREFIX = "$";

module.exports.commandHandler = commandHandler;

let client, Discord;
function commandHandler(args) {
    Discord = args.Discord;
    client = args.client;

    const message = args.message;
    // console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        try {
            commands[CMD_NAME]({ message: message, args: args });
        }
        catch (e) {
            if (e instanceof TypeError) {
                console.log(e);
                message.channel.send(`${message.author} I'm sorry. That's not a command I have.`)
            } else {
                message.channel.send(`${message.author} I'm sorry. There was an error carrying out the command ${CMD_NAME}`);
                console.log(e);
            }
        }
    }


}

const commands = (function () {
    function nuke(obj) {
        const message = obj.message;
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send('Missing permissions.');
            return;
        }

        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            channel.send(`This channel has been cleared by ${message.member}`)
        })
        message.channel.delete()
    }

    function help(obj) {
        const channel = obj.message.channel;
        const help = new Discord.MessageEmbed()
            .setColor('#fc0303')
            .setTitle('Help: ')
            .setDescription('Administrator only commands: \n $clear: clears this channel \n\n All commands: \n$rules: displays the rules');

        channel.send(help);
    }

    function nithin(obj) {
        const message = obj.message;
        message.channel.send(`All hail the master mind`)
    }

    function csc() {
        classMessage.createMessage(args);
    }

    function rules(obj) {
        const ruleList = [
            'Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.',
            'No NSFW or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content.',
            'No spam (includes random @everyone mentions) or self - promotion server invites, advertisements, etc) without permission from a staff member. This includes DMing fellow members.',
            'If you see something against the rules or something that makes you feel unsafe, let staff know. We want this server to be a welcoming space!',
            'The teachers have sole discretion to punish infractions. We will be as fair as possible.',
            'Have fun!',
        ]
        const channel = obj.message.channel;
        let desc = '';
        for (let i = 0; i < ruleList.length; i++) {
            desc += (i + 1) + '. ' + ruleList[i] + '\n \n';
        }
        const help = new Discord.MessageEmbed()
            .setColor('#fc0303')
            .setTitle('Rules: ')
            .setDescription(desc);

        channel.send(help);
    }


    return {
        rules: rules,
        classSelection: csc,
        nithin: nithin,
        anish: nithin,
        help: help,
        clear: nuke
    }
})();