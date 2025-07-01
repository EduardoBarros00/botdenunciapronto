const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
  new SlashCommandBuilder()
    .setName('denuncia')
    .setDescription('Abra um ticket de denúncia'),
  new SlashCommandBuilder()
    .setName('fechar')
    .setDescription('Fecha este ticket (apenas admins).')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Registrando comandos...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Comandos registrados!');
  } catch (err) {
    console.error(err);
  }
})();
