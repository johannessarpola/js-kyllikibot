const scheduler = require('node-schedule');

module.exports.runTask = (client, task, schedule, schedulerSettings) => {
    // TODO Channel?
    const settings = client.getGuildSettings(schedulerSettings.guildId);
    const f = () => {
        const guild = client.guilds.get(schedulerSettings.guildId);
        if(guild && guild.channels.get(schedulerSettings.channelId)) {
            const channel = guild.channels.get(schedulerSettings.channelId)
            task.run(client, channel, [])
        }
    }
    scheduler.scheduleJob('0 */8 * * *', f) // TODO Parameters
}