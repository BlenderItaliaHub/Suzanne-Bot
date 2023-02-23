const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Carica le canzoni')
        .addSubcommand((subcommand)=>
            subcommand
            .setName("canzone")
            .setDescription("Carica una singola canzone da un link")
            .addStringOption(option =>
                option
                    .setName('link')
                    .setDescription('Link canzone')
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
        )
        .addSubcommand((subcommand)=>
            subcommand
            .setName("cerca")
            .setDescription("Cerca canzone in base al nome")
            .addStringOption(option =>
                option
                    .setName('nome')
                    .setDescription('Nome canzone')
                    .setRequired(true)
            )
        ),
        

    async execute(interaction) {}
}