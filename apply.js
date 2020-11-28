const Discord = require('discord.js');
//Json file
const auth = require('./auth.json');
const prefix = auth.prefix;
const { Client, MessageEmbed } = require('discord.js');


//Discord Modules, Client
const bot = new Discord.Client()
const client = new Discord.Client();


//Applications
let memberApplications =[]


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


bot.on("message", function(message) {

    if (message.author.equals(bot.user)) return;
  
    let authorId = message.author.id;
  
    if (message.content === `${prefix}apply`) { // 
        console.log(`Apply begin for authorId ${authorId}`); 


        if (!(authorId in memberApplications)) {
            memberApplications[authorId] = { "step" : 1}
  
            message.author.send("**Type message here (like a title or anything else)**");
            message.author.send("`Question 1 : `Whats youre Discord Username ?");
            //message.author.send("```Type message here (like a title or anything else)```"); you can add more if you want 

        }
  
    } else {
  
        if (message.channel.type === "dm" && authorId in memberApplications) {
            //send msg thru dms
            let userApplications = memberApplications[authorId];
  
            if (userApplications.step == 1 ) {
                //first question 
                userApplications.answer1 = message.content;
                message.author.send("`Question 2 : ` How old are you ? ");
                userApplications.step ++;
            }
            //2nd step
            else if (userApplications.step == 2) {
                userApplications.answer2 = message.content;
                message.author.send("`Question 3 :` what's your Discord Tag ?");
                userApplications.step ++;
            }
            else if (userApplications.step == 3) {
                userApplications.answer3 = message.content;
                message.author.send("`Question 4 :` Windows or IOS ?");
                userApplications.step ++;
            }
  
            else if (userApplications.step == 4) {
                userApplications.answer4 = message.content;
                message.author.send("Application Done ! Thanks (no idea what to put here btw)");

                bot.channels.cache.get("782081509359878154")
                // Application response will be send in this channel or other just copy channel id or you can make it dm 
                  .send(`\`From :\` ${message.author.tag}\r\r \`Question 1 :\` ${userApplications.answer1}\r\r \`Question 2 :\` ${userApplications.answer2} \r\r \`Question 3 :\` ${userApplications.answer3} \r\r \`Question 4 :\` ${userApplications.answer4}`);
                delete memberApplications[authorId];
            }
        }
    }
  });


// simple ping to test it 

client.on('message', message => {
    if (message.content === `${prefix}ping`) {
    message.reply('Pong!');
  }
});


// Help command

client.on('message', message => {
    if(message.content === `${prefix}help`){
    
        const helpembed = new MessageEmbed()


        .setTitle("` Help Commands `")
        .setDescription("`%apply \r\r %ban \r\r %mute \r\r %kick \r\r %clear `")
        .setFooter("Application Bot")
        .setColor("#00BFFF")
  
  
        message.channel.send(helpembed)
      }
})

bot.login(auth.token);
client.login(auth.token);