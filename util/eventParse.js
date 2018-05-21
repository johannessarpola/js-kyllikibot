const moment = require('moment');
const formats = require('../configs/timeFormats.json');
const eventFormat = require('../configs/modelFormats.json').eventFormat;
const dateFormat = formats.generalDateFormat;
const timeFormat = formats.generalTimeFormat;

module.exports.formatEvent = (event) => {

    const startMoment =  moment(event.start.dateTime || event.start.date);
    const endMoment = moment(event.end.dateTime || event.end.date)

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