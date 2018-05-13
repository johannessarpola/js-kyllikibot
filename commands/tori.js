exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const here = message.channel.guild.roles.find('name', '@everyone');
    message.channel.send(`${here} Torille!?`);
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "tori",
    category: "Miscelaneous",
    description: "Torille",
    usage: "tori"
  };
  