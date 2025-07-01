require('dotenv').config();

const clientId = process.env.CLIENT_ID;

if (!clientId) {
    console.error('❌ CLIENT_ID não encontrado no arquivo .env');
    process.exit(1);
}

// Permissões necessárias para o bot funcionar
const permissions = [
    'ViewChannels',          // Ver canais
    'SendMessages',          // Enviar mensagens
    'ManageChannels',        // Gerenciar canais (criar tickets)
    'ManageRoles',          // Gerenciar cargos (para permissões)
    'EmbedLinks',           // Incorporar links
    'AttachFiles',          // Anexar arquivos
    'ReadMessageHistory',   // Ler histórico de mensagens
    'UseSlashCommands'      // Usar comandos de barra
];

// Converter para valor numérico (calculado com base nas permissões necessárias)
const permissionValue = '268560464'; // Permissões calculadas

const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissionValue}&scope=bot%20applications.commands`;

console.log('\n🎫 === CONVITE DO BOT DE TICKETS ===');
console.log('\n🔗 Use este link para adicionar o bot ao seu servidor:');
console.log(`\n${inviteUrl}\n`);
console.log('📋 Instruções:');
console.log('1. Clique no link acima');
console.log('2. Selecione seu servidor Discord');
console.log('3. Confirme as permissões');
console.log('4. O bot estará pronto para usar!\n');
console.log('✅ Comandos disponíveis após adicionar:');
console.log('• /denuncia - Criar nova denúncia ou ticket');
console.log('• /listar-tickets - Listar tickets (staff apenas)');
console.log('• /fechar-ticket - Fechar um ticket');
console.log('• /deletar-ticket - Deletar ticket (admin apenas)\n');