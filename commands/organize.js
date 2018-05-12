const timeParse = require('../util/timeParse');
const eventFormats = require('../configs/fieldFormats.json').events;
const gcal = require('../services/gcalendar')
const gevents = require('../models/gevents')

const parseTimeAndDuration = (args) => {
    let time = null;
    let date = null;
    let duration = null; // TODO Parsing
    let usedArgs = [];
    args.forEach(arg => {
        // Hour 
        if ((arg.length == 4 || arg.length == 5) && time == null) {
            time = timeParse.tryParseTime(arg);
            if(time !== null) {
                usedArgs.push(arg)
            }
        }
        // Date
        else if (date == null) {
            date = timeParse.tryParseDate(arg);
            if(date !== null) {
                usedArgs.push(arg)
            }
        }
    });
    return {
        time: time,
        date: date,
        duration: 1,
        remainingArgs: args.filter( i => !usedArgs.includes(i) )
    }
}

const addDuration = (date, duration) => {
    // TODO Alter API to handle less than hours as well
    let afterDuration = new Date(date.getTime());
    afterDuration.setHours(afterDuration.getHours() + duration);
    return afterDuration;
}

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const {
        time,
        date,
        duration,
        remainingArgs
    } = parseTimeAndDuration(args)

    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());

    const eventStart = gevents.createTime(date)
    const eventEnd = gevents.createTime(addDuration(date, duration))
6
     // TODO Handle description or title?
    const event = gevents.createSimpleEvent(remainingArgs.join(" "), eventStart, eventEnd, "");
    const upcoming = gcal.insert(event, data => {
        message.channel.send(`Created event for ${data.start.dateTime} with title ${data.summary} (${data.id})`)
    });
    const msg = await message.channel.send("Creating event ...");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "organize",
    category: "Events",
    description: "Create event",
    usage: "organize"
};