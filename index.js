const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.default.json');
const fs = require('fs');
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Er zijn geen commando's gevonden.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} ingeladen!`);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
  console.log(`Ingelogd als ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'join-log');
    if (!channel) return console.log('Er is iemand nieuws gejoined, maar het #join-log kanaal is niet aanwezig dus er is geen welkomstbericht verstuurd.');

    const joinEmbed = new Discord.MessageEmbed()
    .setTitle(`**Welkom ${member.user.tag}!**`)
    .setDescription('Welkom op de MinecraftGamers discord.\n Mocht je vragen hebben kan je altijd een ticket aanmaken.')
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("#004b96")
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    channel.send(joinEmbed);
  });

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!cmd.startsWith(prefix)) return;

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);
});

client.login(process.env.token);