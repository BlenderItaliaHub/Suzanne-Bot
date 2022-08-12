const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('screenshot')
        .setDescription('l\'enciclopedia della CGI')

        .addSubcommand(subcommand =>
            subcommand
            .setName('viewport')
            .setDescription('Manda uno screenshot del 3D Viewport.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('modeling')
            .setDescription('Manda uno screenshot del Modeling tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('sculpting')
            .setDescription('Manda uno screenshot dello Sculpting tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('uv_editing')
            .setDescription('Manda uno screenshot dell\'UV Editing tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('texture_paint')
            .setDescription('Manda uno screenshot della Texture Paint tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('shading')
            .setDescription('Manda uno screenshot dello Shading tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('animation')
            .setDescription('Manda uno screenshot dell\'Animation tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('rendering')
            .setDescription('Manda uno screenshot del Rendering tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('compositing')
            .setDescription('Manda uno screenshot del Compositing tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('geometry_nodes')
            .setDescription('Manda uno screenshot della Geometry Nodes tab.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('scripting')
            .setDescription('Manda uno screenshot dello Scripting tab.')),

    async execute(interaction) {}
}