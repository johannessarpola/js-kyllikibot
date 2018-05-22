
const formatEvent = require("../util/eventParse").formatEvent 

exports.run = async (client, channel, args) => { // eslint-disable-line no-unused-vars
    const gcal = require('../services/gcalendar')
    gcal.upcoming(event => {
        if(event.err) {
            return
        }
        else {
            const evt = formatEvent(event)
            channel.send(evt)
        }
    })
};

exports.help = {
    name: "upcoming",
    category: "System",
    description: "Lists upcoming events",
    usage: "upcoming"
};
