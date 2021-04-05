var time = require('./fanta_lib.js');
require("dotenv").config({path: "./Tokens.env"});
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.FANTA_TOKEN);
const fs = require('fs');

var recorder = function (player_name, player_id, group_name, group_id, bet) {
    var data = player_name+","+player_id+","+group_name+","+group_id+","+bet+"\n";
    fs.appendFile('./player.csv', data, (err) => {
        if (err) {
            console.log(err);
        }
    })
};

bot.help((ctx) =>
    ctx.reply("Manda /gioca e rispondi al messaggio per giocare\n\n"+
    "Il vincitore del gruppo verrà estratto alle 20, i numeri potranno essere giocati entro le 17:00")
);

bot.command("gioca", (ctx) => ctx.reply("Rispondi a questo messaggio con la tua scommessa"));

bot.on("text", (ctx) => {
    console.log(time.hour()+":"+time.minute());
    if (time.hour()<17) {
        if (!isNaN(ctx.update.message.text.toString())){
            player_id = ctx.update.message.from.id.toString();
            player_display = ctx.update.message.from.first_name.toString();
            group_id = ctx.update.message.chat.id.toString();
            group_name = ctx.update.message.chat.title.toString();

            bet = parseInt(ctx.update.message.text.toString());
            recorder(player_display, player_id, group_name, group_id, bet);
            ctx.reply("_Salvato!_\n"+player_display+": "+bet+" casi", {parse_mode: "markdown"});
        } else {
            try {
                user = "@"+ctx.update.message.from.username.toString();
            } catch {
                user = ctx.update.message.from.first_name.toString();
            }
            ctx.reply(user+" rispondi con un numero.");
        }
    } else {
        ctx.reply("I numeri vanno giocati entro le 17:00!");
    }
})

bot.launch()
console.log("Bot online")
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
