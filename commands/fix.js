const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fix')
        .setDescription('Problemi comuni e come risolverli')

        .addSubcommand(subcommand =>
            subcommand
            .setName('autosmooth')
            .setDescription('Sistema alcune ombre sulle mesh')),

    async execute(interaction) {}
}