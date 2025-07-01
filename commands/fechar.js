const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('fechar')
    .setDescription('Fecha este ticket (apenas admins).'),
  async execute(interaction) {
    await interaction.reply({ content: 'Fechando ticket…', ephemeral: true });
  }
};
