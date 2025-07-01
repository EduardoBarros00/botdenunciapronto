const { Client, GatewayIntentBits, Partials, ChannelType } = require('discord.js');
const { sequelize } = require('./models/Ticket');
const config = require('./config');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Channel]
});

client.commands = new Map();
for (const file of fs.readdirSync('./commands')) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.data.name, cmd);
}
for (const file of fs.readdirSync('./events')) {
  const evt = require(`./events/${file}`);
  client.on(evt.name, (...args) => evt.execute(...args));
}

client.once('ready', async () => {
  await sequelize.sync();

  const guild = client.guilds.cache.first();
  const cats = {};
  for (const [key, name] of Object.entries(config.categories)) {
    let cat = guild.channels.cache.find(c => c.name === name && c.type === ChannelType.GuildCategory);
    if (!cat) {
      cat = await guild.channels.create({ name, type: ChannelType.GuildCategory });
    }
    cats[key] = cat;
  }
  let logCh = guild.channels.cache.find(c => c.name === config.logChannelName && c.type === ChannelType.GuildText);
  if (!logCh) {
    logCh = await guild.channels.create({ name: config.logChannelName, type: ChannelType.GuildText });
  }
  client.cats = cats;
  client.logChannel = logCh;

  console.log(`✅ ${client.user.tag} online!`);
});

client.login(process.env.TOKEN);
