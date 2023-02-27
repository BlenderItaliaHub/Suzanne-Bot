const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('Ferma il bot e cancella la coda di riproduzione'), 

    async execute(interaction) {}
}