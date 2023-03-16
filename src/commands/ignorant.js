const { MessageEmbed, Permissions, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require('child_process');
const validator = require('validator');
const fs = require('fs-extra');





module.exports = {
    data: new SlashCommandBuilder()
        .setName("ignorant")
        .setDescription("[ PHONE ] Use ignorant.")
        .addIntegerOption(option =>
            option.setName('countrycode')
                .setDescription('For example "33" is for France, do not enter the "+"')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Do not enter the "+" or the country code, only the number (without the 0, for France)')
                .setRequired(true)),
    run: async (client, interaction) => {



        var countrycode = interaction.options.getInteger('countrycode')

        var numero = interaction.options.getInteger('number')


        if (!/^\d{0,3}$/.test(countrycode)) {
            return;
        };
        if (!/^\d+$/.test(numero)) {
            return;
        };




        let filename = `${interaction.user.id}-ignorant-${Math.random().toString(36).substr(2, 9)}.txt`;


        await interaction.reply({
            content: "Wait a second.",
            ephemeral: true
        });

        exec(`ignorant --no-color --only-used "${countrycode}" "${numero}" > ${filename}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution du script`);
            }
            console.log(`stdout : ${stdout}`);
            console.log(`stderr : ${stderr}`);

            const zebi = new MessageAttachment(`${filename}`);



            interaction.editReply({
                content: "__**Développé par MJM**__, aka Sale Gosse, Qrowet et SysTailsy.",
                files: [zebi],
                ephemeral: true
            });

            setTimeout(() => {
                fs.remove(filename);
            }, 12000);
        });
    }
};
