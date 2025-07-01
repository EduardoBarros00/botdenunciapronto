const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'denuncias.db',
});

const Ticket = sequelize.define('Ticket', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: DataTypes.STRING,
  channelId: DataTypes.STRING,
  status: DataTypes.STRING, // pending, inProgress, resolved
  clipLink: DataTypes.STRING,
  details: DataTypes.TEXT,
  claimedBy: DataTypes.STRING,
}, { timestamps: true });

module.exports = { sequelize, Ticket };
