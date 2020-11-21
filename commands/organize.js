const timeParse = require('../util/timeParse');
const eventFormats = require('../configs/fieldFormats.json').events;
const gcal = require('../services/gcalendar');
const gevents = require('../models/gevents');

const parseTimeAndDuration = (args) => {
	let time = null;
	let date = null;
	const duration = null; // TODO Parsing
	const usedArgs = [];
	args.forEach(arg => {
		// Hour
		if ((arg.length == 4 || arg.length == 5) && time == null) {
			// TODO This adds +3 hours because of TimeZone to the hours
			time = timeParse.tryParseTime(arg);
			if(time !== null) {
				usedArgs.push(arg);
			}
		}
		// Date
		else if (date == null) {
			date = timeParse.tryParseDate(arg);
			if(date !== null) {
				usedArgs.push(arg);
			}
		}
	});
	return {
		time: time,
		date: date,
		duration: 1,
		remainingArgs: args.filter(i => !usedArgs.includes(i)),
	};
};

const addDuration = (date, duration) => {
	// TODO Alter API to handle less than hours as well
	const afterDuration = new Date(date.getTime());
	afterDuration.setHours(afterDuration.getHours() + duration);
	return afterDuration;
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const {
		time,
		date,
		duration,
		remainingArgs,
	} = parseTimeAndDuration(args);

	// TODO This adds +3 hours because of TimeZone to the hours
	date.setHours(time.getHours());
	date.setMinutes(time.getMinutes());

	const eventStart = gevents.createTime(date);
	const eventEnd = gevents.createTime(addDuration(date, duration));

	// TODO Handle description or title?
	const event = gevents.createSimpleEvent(remainingArgs.join(' '), eventStart, eventEnd, message.author.username);
	const upcoming = gcal.insert(client.config.services.google, event, data => {
		message.channel.send(`Created event for ${data.start.dateTime} with title ${data.summary} (${data.id})`);
	});
	const msg = await message.channel.send('Creating event ...');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Moderator',
};

exports.help = {
	name: 'organize',
	category: 'Events',
	description: 'Create event, formats can be retrieved with command -formats',
	usage: 'organize [date] [time] [title]',
};