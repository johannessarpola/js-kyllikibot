const Soundboard = require('../soundboard/jukebox');
exports.run = async (client, message, args, level) => {
	Soundboard.handleMessage(client, message, args);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'soundboard',
	category: 'Sounds',
	description: '',
	usage: 'soundboard',
};