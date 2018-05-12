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
    const m = moment(str, formats.timeFormats);
    return returnDateIfValid(m);
}

module.exports.tryParseDate = (str) => {
    const m = moment(str, formats.dateFormats);
    return returnDateIfValid(m);
}

module.exports.tryParseDateTime = (str) => {
    const m = moment(str, formats.dateTimeFormats);
    return returnDateIfValid(m);
}