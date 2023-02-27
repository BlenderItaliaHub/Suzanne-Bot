const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription("Salta alla canzone successiva"), 

    async execute(interaction) {}
}