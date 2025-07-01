# Discord Ticket Bot

## Overview

This is a Discord bot built with Node.js and Discord.js v14 that provides a comprehensive ticket system for server management. The bot allows users to create tickets for various purposes including reporting cheats/hacks, inappropriate behavior, chat violations, bugs, and general support requests. It features automated channel creation, ticket management, logging, and administrative controls.

## System Architecture

### Backend Architecture
- **Framework**: Node.js with Discord.js v14
- **Database**: SQLite with Sequelize ORM
- **Architecture Pattern**: Event-driven modular design
- **File Structure**: Organized into commands, events, models, and utilities

### Data Storage Solutions
- **Primary Database**: SQLite database stored locally
- **ORM**: Sequelize for database operations and model definitions
- **Data Persistence**: File-based SQLite storage with configurable path

### Authentication and Authorization
- **Discord OAuth**: Built-in Discord bot authentication using bot tokens
- **Role-based Permissions**: Configurable admin and support staff roles
- **Channel Permissions**: Dynamic permission management for ticket channels

## Key Components

### Command System
- **Slash Commands**: Modern Discord slash command implementation
- **Command Registration**: Automated command deployment script
- **Modular Design**: Each command in separate file with standardized structure

### Ticket Management
- **Three-Stage Workflow**: Pending → In Progress → Resolved
- **Ticket Creation**: `/denuncia` command creates pending requests in "Denúncias Pendentes"
- **Admin Approval**: Accept/reject buttons for administrators to review pending tickets
- **Active Tickets**: Accepted tickets move to "Denúncias Em Andamento" with dedicated channels
- **Resolution**: Closed tickets archive with full chat history in "Denúncias Resolvidas"

### Event Handling
- **Interaction Events**: Handles slash commands and component interactions
- **Ready Event**: Server setup and category/channel verification
- **Error Handling**: Comprehensive error catching and user feedback

### Database Models
- **Ticket Model**: Comprehensive ticket data storage including user info, type, status, and metadata
- **Relationships**: Structured data relationships for efficient querying

### Utility Systems
- **Embed Builder**: Standardized embed creation for consistent messaging
- **Logger**: Comprehensive logging system for ticket actions and admin oversight
- **Ticket Manager**: Channel creation and permission management utilities

## Data Flow

1. **User Interaction**: User executes `/denuncia` command
2. **Type Selection**: Interactive menu for ticket type selection
3. **Modal Input**: User provides detailed information via Discord modal
4. **Pending Request**: System creates database record and posts request in "Denúncias Pendentes"
5. **Admin Review**: Administrators see request with Accept/Reject buttons
6. **Ticket Activation**: If accepted, channel created in "Denúncias Em Andamento"
7. **Resolution**: When closed, ticket moves to "Denúncias Resolvidas" with full chat history
8. **Logging**: All actions logged to designated logs channel

## External Dependencies

### Core Dependencies
- **discord.js**: ^14.21.0 - Discord API interaction library
- **sequelize**: ^6.37.7 - ORM for database operations
- **sqlite3**: ^5.1.7 - SQLite database driver
- **dotenv**: ^17.0.0 - Environment variable management

### Environment Variables Required
- `TOKEN`: Discord bot token
- `CLIENT_ID`: Discord application client ID
- `GUILD_ID`: Target Discord server ID
- `DB_PATH`: Database file path (optional, defaults to ./database.sqlite)

## Deployment Strategy

### Local Development
- SQLite database for rapid development and testing
- Guild-specific command registration for faster deployment
- Environment-based configuration management

### Production Considerations
- Database path configuration via environment variables
- Logging level control based on NODE_ENV
- Global command registration option available

### Bot Permissions Required
- Send Messages
- Manage Channels
- View Channels
- Embed Links
- Attach Files
- Manage Roles (for permission overwrites)

## User Preferences

Preferred communication style: Simple, everyday language.

## Deployment Status

✅ **DEPLOYED AND RUNNING**
- Discord bot successfully connected to server "Servidor de Lil Kank"
- Categories automatically created: "Denúncias Pendentes", "Denúncias Em Andamento", "Denúncias Resolvidas"
- Log channel "log-denuncias" created
- All 4 slash commands registered and functional
- Database operational with SQLite storage

## Changelog

- June 30, 2025: Initial setup and full deployment
- June 30, 2025: Bot successfully connected to Discord server
- June 30, 2025: Configuration updated to match user requirements
- June 30, 2025: Categories and logging channels automatically created