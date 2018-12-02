const formatEvent = require("../util/formatter").event 

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming(client.config.services.google, event => {
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
    category: "Events",
    description: "Lists upcoming events",
    usage: "upcoming"
};
