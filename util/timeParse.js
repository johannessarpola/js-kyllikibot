const moment = require('moment');
const formats = require('../configs/timeFormats.json');

returnDateIfValid = (mmnt) => {
    if (mmnt.isValid()) {
        return mmnt.toDate();
    } else {
        return null;
    }
} 

module.exports.tryParseTime = (str) => {
    const m = moment(str, formats.time.formats);
    return returnDateIfValid(m);
}

module.exports.tryParseDate = (str) => {
    const m = moment(str, formats.date.formats);
    return returnDateIfValid(m);
}

module.exports.tryParseDateTime = (str) => {
    const m = moment(str, formats.dateTime.formats);
    return returnDateIfValid(m);
}
 
module.exports.generateExamples = (formats, type = "date") => {
    const cur = moment();
    const exs = formats.map(fmt => {
        return cur.format(fmt);
    });
    return {
        examples : exs,
        date : cur.toDate()
    }
}