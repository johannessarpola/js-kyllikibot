
const formatEvent = require("../util/formatter").event 

exports.run = async (client, channel, args) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    const upcoming = gcal.upcoming(event => {
        if(event.err) {
            channel.send(event.err)
        }
        else {
            const evt = formatEvent(event)
            channel.send(evt)}
        }
    )
};

exports.help = {
    name: "upcoming",
    category: "System",
    description: "Lists upcoming events",
    usage: "upcoming"
};
