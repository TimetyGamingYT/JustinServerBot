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

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '👤 ・ Gamer');

    guildMember.roles.add.add(welcomeRole);
    guildMember.guild.channels.cache.get('773965123320021015').send('Welkom <@${guildMember.user.id}> in de Minecraft Gamers NL/BE discord.')
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