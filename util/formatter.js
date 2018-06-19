const moment = require('moment');
const formats = require('../configs/timeFormats.json');
const eventFormat = require('../configs/modelFormats.json').event.formats[0];
const formatFormat = require('../configs/modelFormats.json').format.formats[0];
const dateFormat = formats.generalDateFormat;
const timeFormat = formats.generalTimeFormat;

module.exports.event = (event) => {

    const startMoment =  moment(event.start.dateTime || event.start.date);
    const endMoment = moment(event.end.dateTime || event.end.date)

    let base = eventFormat;
    base = base.replace("{{date}}", startMoment.format(dateFormat))
    base = base.replace("{{startTime}}", startMoment.format(timeFormat))
    base = base.replace("{{endTime}}", endMoment.format(timeFormat))
    base = base.replace("{{timeZone}}", startMoment.format('Z'))
    base = base.replace("{{summary}}", event.summary)
    // base = base.replace("{{description}}", event.description || "")
    base = base.replace("{{id}}", event.id)
    base = base.replace("{{attendees}}", event.description.split(",").join(", "))

    base = base.replace("  ", " ");

    return base;
}

module.exports.formatFormat = (fmt, title = "") => {
    let base = formatFormat;
    base = base.replace("{{title}}", title)
    base = base.replace("{{description}}", fmt.description)
    base = base.replace("{{examples}}", fmt.examples)
    base = base.replace("  ", " ");
    return base;
}