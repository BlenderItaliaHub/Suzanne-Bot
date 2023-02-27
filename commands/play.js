const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Carica le canzoni')
        .addSubcommand((subcommand)=>
            subcommand
            .setName("canzone")
            .setDescription("Carica una singola canzone")
            .addStringOption(option =>
                option
                    .setName('canzone')
                    .setDescription('Nome o link canzone')
                    .setRequired(true)
            )
        )
        .addSubcommand((subcommand)=>
            subcommand
            .setName("playlist")
            .setDescription("Carica una playlist da un link")
            .addStringOption(option =>
                option
                    .setName('link')
                    .setDescription('Link playlist')
                    .setRequired(true)
            )
        ),
        

    async execute(interaction) {}
}