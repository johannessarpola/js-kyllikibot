const formatEvent = require('../util/formatter').event;

exports.run = async (client, channel, args) => { // eslint-disable-line no-unused-vars
	const gcal = require('../services/gcalendar');
	gcal.upcoming(event => {
		if(event.err) {
			client.logger.log('No upcoming events. 🤷‍♂️');
			return;
		}
		else {
			const evt = formatEvent(event);
			channel.send(evt);
		}
	});
};

exports.help = {
	name: 'upcoming',
	category: 'System',
	description: 'Lists upcoming events',
	usage: 'upcoming',
};
