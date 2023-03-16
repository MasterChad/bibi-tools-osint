const { MessageEmbed, Permissions, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require('child_process');
const validator = require('validator');
const fs = require('fs-extra');





module.exports = {
    data: new SlashCommandBuilder()
        .setName("sherlock")
        .setDescription("[ USERNAME ] Use sherlock.")
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Enter the username')
                .setRequired(true)),
    run: async (client, interaction) => {



        function sanitizeString(str) {
            return str.replace(/[&<>"'`{}=\/\\]/g, '');
        }

        var username = sanitizeString(interaction.options.getString('username')
            .replaceAll("'", "")
            .replaceAll('"', "")
            .replaceAll("`", "")
            .replaceAll("{", ""))






        let filename = `${interaction.user.id}-sherlock-${Math.random().toString(36).substr(2, 9)}.txt`;


        await interaction.reply({
            content: "Wait a second.",
            ephemeral: true
        });

        // ici vous devez mettre votre chemin vers sherlock, remplacez /root/tools/sherlock
        exec(`cd /root/tools/sherlock/ && python3 sherlock --no-color "${username}" > ${filename}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution du script`);
            }
            console.log(`stdout : ${stdout}`);
            console.log(`stderr : ${stderr}`);

            // la aussi
            const zebi = new MessageAttachment(`//root//tools//sherlock//${filename}`);



            interaction.editReply({
                content: "__**Développé par MJM**__, aka Sale Gosse, Qrowet et SysTailsy.",
                files: [zebi],
                ephemeral: true
            });

            setTimeout(() => {
                //la aussi
                fs.remove(`//root//tools//sherlock//${filename}`);
            }, 12000);
        });
    }
};
