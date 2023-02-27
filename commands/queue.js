const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Visualizza la coda delle canzoni')
        .addNumberOption((option) =>
            option
            .setName("pagina")
            .setDescription("Numero di pagina della coda")
            .setMinValue(1)),  

    async execute(interaction) {}
}