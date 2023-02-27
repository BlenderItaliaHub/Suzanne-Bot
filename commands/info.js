const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Visualizza le info della canzone in riproduzione"), 

    async execute(interaction) {}
}