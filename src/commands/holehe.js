const { MessageEmbed, Permissions, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require('child_process');
const validator = require('validator');
const fs = require('fs-extra');





module.exports = {
    data: new SlashCommandBuilder()
        .setName("holehe")
        .setDescription("[ EMAIL ] Use holehe.")
        .addStringOption(option =>
            option.setName('email')
                .setDescription('Enter the email')
                .setRequired(true)),
    run: async (client, interaction) => {



        var email = interaction.options.getString('email')
            .replaceAll("'", "")
            .replaceAll('"', "")
            .replaceAll("`", "")
            .replaceAll("{", "")



        if (!validator.isEmail(email)) {
            return interaction.reply('Enter real email.');
        }

        let filename = `${interaction.user.id}-holehe-${Math.random().toString(36).substr(2, 9)}.txt`;


        await interaction.reply({
            content: "Wait a second.",
            ephemeral: true
        });

        exec(`holehe --no-color --only-used "${email}" > ${filename}`, (error, stdout, stderr) => {
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
