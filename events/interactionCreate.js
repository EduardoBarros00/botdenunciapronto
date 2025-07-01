const { Ticket } = require('../models/Ticket');
const { ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    const client = interaction.client;

    // Slash commands
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return;
      return cmd.execute(interaction);
    }

    // Botões
    if (!interaction.isButton()) return;
    const { customId, user, guild } = interaction;

    // 1) Abrir ticket
    if (customId === 'open_ticket') {
      const num = await Ticket.count() + 1;
      const ch = await guild.channels.create({
        name: `denuncia-${num}`,
        type: ChannelType.GuildText,
        parent: client.cats.pending.id,
        permissionOverwrites: [
          { id: guild.id, deny: ['ViewChannel'] },
          { id: user.id, allow: ['ViewChannel', 'SendMessages'] },
          ...config.adminIds.map(id => ({
            id,
            allow: ['ViewChannel', 'SendMessages', 'ManageChannels']
          })),
        ]
      });
      await Ticket.create({
        userId: user.id,
        channelId: ch.id,
        status: 'pending'
      });
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('accept_ticket')
            .setLabel('✅ Aceitar')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('reject_ticket')
            .setLabel('❌ Recusar')
            .setStyle(ButtonStyle.Danger)
        );
      await ch.send({ content: `Denúncia de <@${user.id}>`, components: [row] });
      return interaction.reply({ content: `Seu ticket foi criado: ${ch}`, ephemeral: true });
    }

    // 2) Aceitar ou recusar
    if (['accept_ticket','reject_ticket'].includes(customId)) {
      if (!config.adminIds.includes(user.id))
        return interaction.reply({ content: '❌ Sem permissão.', ephemeral: true });

      const ticket = await Ticket.findOne({ where: { channelId: interaction.channelId } });
      if (!ticket) return;
      if (customId === 'reject_ticket') {
        await interaction.channel.delete();
        await ticket.destroy();
        return;
      }

      // Aceitar
      await interaction.channel.setParent(client.cats.inProgress.id);
      ticket.status = 'inProgress';
      ticket.claimedBy = user.id;
      await ticket.save();

      const embed = new EmbedBuilder()
        .setTitle('📝 Informe os detalhes')
        .setDescription('Envie aqui o link do clip, data, hora e motivo da denúncia.');
      await interaction.update({ content: null, embeds: [embed], components: [] });
      return;
    }

    // 3) Fechar com slash ou botão
    if ((interaction.isChatInputCommand() && interaction.commandName === 'fechar') || customId === 'close_ticket') {
      if (!config.adminIds.includes(user.id))
        return interaction.reply({ content: '❌ Sem permissão.', ephemeral: true });

      const ticket = await Ticket.findOne({ where: { channelId: interaction.channelId } });
      if (!ticket) return interaction.reply({ content: '❌ Ticket não encontrado.', ephemeral: true });

      // Coleta histórico como detalhes
      const messages = await interaction.channel.messages.fetch({ limit: 20 });
      const last = messages.filter(m => [ticket.userId, user.id].includes(m.author.id))
                           .map(m => `${m.author.username}: ${m.content}`);
      ticket.details = last.join('\n');
      ticket.status = 'resolved';
      await ticket.save();

      await interaction.channel.setParent(client.cats.resolved.id);
      await interaction.channel.permissionOverwrites.edit(ticket.userId, { ViewChannel: true });

      const log = `Ticket #${ticket.id} resolvido por <@${user.id}> (aberto por <@${ticket.userId}>)`;
      await client.logChannel.send(log);

      setTimeout(() => interaction.channel.delete(), 5000);
      return interaction.reply({ content: '✅ Denúncia encerrada.', ephemeral: true });
    }
  }
};
