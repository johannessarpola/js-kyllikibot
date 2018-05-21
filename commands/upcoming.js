const formatEvent = require("../util/eventParse").formatEvent 

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming(event => {
        if(event.err) {
            message.channel.send(event.err)
        }
        else {
            const evt = formatEvent(event)
            message.channel.send(evt)}
        }
    )
    const msg = await message.channel.send("Fetching events ...");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "upcoming",
    category: "System",
    description: "Lists upcoming events",
    usage: "upcoming"
};
