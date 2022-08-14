const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fix')
        .setDescription('Problemi comuni e come risolverli'),

    async execute(interaction) {}
}