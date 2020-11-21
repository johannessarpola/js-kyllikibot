const gcal = require('../services/gcalendar');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const eventId = args.join('').replace('(', '').replace(')', '');
	const name = message.author.username;
	gcal.participate(client.config.services.google, eventId, name, (event) => {
		message.channel.send(`${name} participates in ${event.summary} (${event.id})`);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'participate',
	category: 'Events',
	description: 'Announce to participate in a event with this command',
	usage: 'participate [event id]',
};
