const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');
const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs");

module.exports = class GifCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'gif';
        this.category = 'Pornôgrafia';
    }

    async run(message, args) {

        if (!message.channel.nsfw) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` utilize apenas em canais **NSFW**.`);

        const subreddits = [
            "NSFW_GIF",
            "nsfw_gifs",
            "porninfifteenseconds",
            "60FPSPorn",
            "porn_gifs",
            "nsfw_Best_Porn_Gif",
            "LipsThatGrip",
            "adultgifs"
        ]

        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                request.get(url).then(r => {

                    const gifInfo = new ZenonEmbed();
                    gifInfo.setImage(url);
                    gifInfo.setFooter(message.author.tag, message.author.avatarURL);

                    message.channel.send(gifInfo);
                })
            })
    }
}