// This will check if the node version you are running is the required one
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js');
const scheduling = require('./services/scheduler');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');


// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.

async function loadCommands(client) {
	// Here we load **commands** into memory, as a collection, so they're accessible here and everywhere else.
	const cmdFiles = await readdir('./commands/');
	client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith('.js')) return;
		const response = client.loadCommand(f);
		if (response) console.log(response);
	});
}

async function loadTasks(client) {

	const taskFiles = await readdir('./scheduled/');

	taskFiles.forEach(f => {
		if (!f.endsWith('.js')) return;
		const response = client.loadScheduledTask(f);
		if (response) console.log(response);
	});

}

async function loadEvents(client) {
	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir('./events/');
	client.logger.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split('.')[0];
		const event = require(`./events/${file}`);
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

}

const init = async () => {

	const client = new Discord.Client();
	client.config = require('./config.js');

	// Require our logger
	client.logger = require('./util/Logger');

	// Let's start by getting some useful functions that we'll use throughout
	// the bot, like logs and elevation features.
	require('./modules/functions.js')(client);

	// Aliases and commands are put in collections where they can be read from,
	// catalogued, listed, etc.
	client.commands = new Enmap({ name: 'commands' });
	client.aliases = new Enmap({ name: 'aliases' });
	client.tasks = new Enmap({ name: 'tasks' });
	client.musicQueues = new Enmap({ name: 'music-queues' });
	client.settings = new Enmap({ name: 'settings' });


	loadCommands(client);
	loadTasks(client);
	loadEvents(client);

	// Generate a cache of client permissions for pretty perms
	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
		const thisLevel = client.config.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}

	const schedulerSettings = {
		guildId: '134603873187921920',
		channelId: '134603873187921920',
	};

	client.login(client.config.token).then(() => {
		client.tasks.forEach((task) => {
			scheduling.runTask(client, task, '', schedulerSettings);
		});
	});
};

init();
