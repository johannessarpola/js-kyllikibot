const moment = require('moment');
const formats = require('../configs/timeFormats.json');
const dateTimeFormat = formats.generalFormat;
const timeFormat = formats.timeFormat;

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming((event => {
        // TODO Handle date format as well
        // FIXME Handle no events
        const startMoment =  moment(event.start.dateTime || event.start.date);
        const endMoment = moment(event.end.dateTime || event.start.date)
        let evt = `${startMoment.format(dateTimeFormat)} - ${endMoment.format(timeFormat)} : ${event.summary} (${event.id})`
        message.channel.send(evt)}
    ))
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