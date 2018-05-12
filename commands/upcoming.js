exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming((event => {
        // TODO Handle date format as well
        // FIXME Handle no events
        const start = event.start.dateTime || event.start.date;
        let evt = `${start} - ${event.summary} (${event.id})`
        message.channel.send(evt)}
    ))
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