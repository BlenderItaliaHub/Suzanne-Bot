const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Metti in pausa la canzone in riproduzione"), 

    async execute(interaction) {}
}