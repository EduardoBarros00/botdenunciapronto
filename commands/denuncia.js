const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('denuncia')
    .setDescription('Abra um ticket de denúncia'),
  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('open_ticket')
          .setLabel('📢 Abrir Denúncia')
          .setStyle(ButtonStyle.Primary)
      );
    await interaction.reply({
      content: 'Clique no botão para abrir um ticket de denúncia.',
      components: [row],
      ephemeral: true
    });
  }
};
