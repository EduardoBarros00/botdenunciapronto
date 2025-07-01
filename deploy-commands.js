const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];

// Carregar todos os comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`✅ Comando adicionado: ${command.data.name}`);
    } else {
        console.log(`⚠️ Comando ${file} não possui propriedades 'data' ou 'execute'`);
    }
}

// Construir e preparar REST
const rest = new REST().setToken(process.env.TOKEN);

// Deploy dos comandos
(async () => {
    try {
        console.log(`🔄 Iniciando deploy de ${commands.length} comandos...`);

        // Para comandos globais, use este:
        // const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        // Para comandos específicos de servidor (mais rápido para desenvolvimento):
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log(`✅ ${data.length} comandos registrados com sucesso!`);
    } catch (error) {
        console.error('❌ Erro ao registrar comandos:', error);
    }
})();
