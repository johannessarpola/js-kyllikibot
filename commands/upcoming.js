const moment = require('moment');
const formats = require('../configs/timeFormats.json');
const eventFormat = require('../configs/modelFormats.json').eventFormat;
const dateFormat = formats.generalDateFormat;
const timeFormat = formats.generalTimeFormat;

const formatEvent = (event) => {

    const startMoment =  moment(event.start.dateTime || event.start.date);
    const endMoment = moment(event.end.dateTime || event.start.date)

    let base = eventFormat;
    base = base.replace("{{date}}", startMoment.format(dateFormat))
    base = base.replace("{{startTime}}", startMoment.format(timeFormat))
    base = base.replace("{{endTime}}", endMoment.format(timeFormat))
    base = base.replace("{{timeZone}}", startMoment.format('Z'))
    base = base.replace("{{summary}}", event.summary)
    base = base.replace("{{description}}", event.description || "")
    base = base.replace("{{id}}", event.id)

    base = base.replace("  ", " ");

    return base;
}

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming((event => {
                // FIXME Handle no events
        const evt = formatEvent(event)
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