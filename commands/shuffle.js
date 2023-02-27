const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription("Mescola l'ordine delle canzoni"), 

    async execute(interaction) {}
}