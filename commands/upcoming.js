exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming((event => message.channel.send(event)))
    const msg = await message.channel.send("Fetching events ...");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "upcoming",
    category: "System",
    description: "Lists upcoming events",
    usage: "upcoming"
};