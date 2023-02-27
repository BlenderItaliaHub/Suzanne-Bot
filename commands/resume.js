const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription("Riprendi la musica"), 

    async execute(interaction) {}
}