exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    // TODO Parse message to event
    const gcal = require('../services/gcalendar')
    const gevents = require('../models/gevents')

    let start = new Date();
    start.setHours(16)
    const numberOfDaysToAdd = 4;
    start.setDate(start.getDate() + numberOfDaysToAdd);
    const eventStart = gevents.createTime(start)

    let end = new Date(start.getTime());
    const hoursToAdd = 2;
    end.setHours(end.getHours() + hoursToAdd)
    const eventEnd = gevents.createTime(end)

    const event = gevents.createSimpleEvent("Eventty", eventStart, eventEnd, "Descripty");
    const upcoming = gcal.insert(event, data => message.channel.send("Stored: "+data.id));
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