module.exports = {
    // Configurações do servidor
    guildId: process.env.GUILD_ID || '',
    
    // IDs dos administradores
    adminIds: [
        '123456789012345678', // IDs dos admins
    ],
    
    // Configurações de categorias para tickets
    categories: {
        bugs: 'Denúncias Pendentes',
        inProgress: 'Denúncias Em Andamento',
        resolved: 'Denúncias Resolvidas',
    },
    
    // Canal de logs
    logChannelName: 'log-denuncias',
    
    // Tipos de denúncia
    denunciaTypes: {
        hack: {
            name: 'Hack/Cheats',
            description: 'Denunciar uso de hacks, cheats ou exploits',
            category: 'bugs',
            emoji: '🚫'
        },
        comportamento: {
            name: 'Comportamento Inadequado',
            description: 'Denunciar comportamento tóxico, assédio ou bullying',
            category: 'bugs',
            emoji: '⚠️'
        },
        chat: {
            name: 'Chat/Spam',
            description: 'Denunciar spam, flood ou linguagem inadequada',
            category: 'bugs',
            emoji: '💬'
        },
        bug: {
            name: 'Bug/Erro',
            description: 'Reportar bugs ou erros no servidor',
            category: 'bugs',
            emoji: '🐛'
        },
        suporte: {
            name: 'Suporte Geral',
            description: 'Solicitar ajuda ou esclarecimentos',
            category: 'bugs',
            emoji: '❓'
        }
    },
    
    // Cores para embeds
    colors: {
        success: 0x00ff00,
        error: 0xff0000,
        warning: 0xffff00,
        info: 0x0099ff,
        primary: 0x5865F2
    },
    
    // Configurações de tickets
    ticketConfig: {
        maxOpenTickets: 3, // Máximo de tickets abertos por usuário
        autoCloseAfterDays: 7, // Fechar automaticamente após X dias de inatividade
        archiveCategory: 'Tickets Arquivados'
    },
    
    // Permissões
    permissions: {
        adminRoles: ['Admin', 'Moderador', 'Staff'],
        supportRoles: ['Suporte', 'Helper', 'Moderador', 'Admin']
    }
};
