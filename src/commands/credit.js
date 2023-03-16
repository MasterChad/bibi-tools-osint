const { MessageEmbed, Permissions, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require('child_process');
const validator = require('validator');
const fs = require('fs-extra');





module.exports = {
    data: new SlashCommandBuilder()
        .setName("credit")
        .setDescription("[ INFORMATION ] See the informations."),
    run: async (client, interaction) => {



        const embed = {
            "description": ":heart:",
            "footer": {
                "text": "By MJM - Sale Gosse, Qrowet & SysTailsy"
            },
            "thumbnail": {
                "url": "https://media.discordapp.net/attachments/1066794874474594395/1078440902047047830/image.png"
            },
            "author": {
                "name": "Bibi OSINT",
                "icon_url": "https://cdn.discordapp.com/avatars/1078408744171483167/190b60694843c72500c84cfd6898580f"
            },
            "fields": [
                {
                    "name": "Who are we? ? 🤔",
                    "value": "Simple passionate developers who want to code to facilitate osint."
                },
                {
                    "name": "Who can use the bot ? 🤔",
                    "value": "Absolutely everyone at the moment."
                },
                {
                    "name": "Why this bot ? 🤔",
                    "value": "While waiting for the website, it's simply to facilitate access to osint tools, and to save time for people who are too lazy to download/use the tools."
                },
                {
                    "name": "What is MJM ? 🧐",
                    "value": "A trio of developers.",
                    "inline": true
                },
                {
                    "name": "Composed of who ? 🧐",
                    "value": "**Sale Gosse, Qrowet et SysTailsy**",
                    "inline": true
                },
                {
                    "name": "Github:",
                    "value": "https://github.com/MasterChad/bibi-tools-osint"
                }
            ]
        };
        await interaction.reply({ embeds: [embed] })
    }
};
