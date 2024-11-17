const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, // Needed to receive message events
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        // GatewayIntentBits.GuildMembers // Optional: allows more data about members
    ]
});

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
    throw new Error('No token provided');
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    

    // Check if the message is sent in the introductions channel
    const introductionsChannelId = '1301521686541111296'; // Replace with your channel ID
    if (message.channel.id === introductionsChannelId) {
        const roleId = '1301631751516585994'; // Replace with the role ID you want to assign

        // Get the guild member
        const member = message.member;
        if (member) {
            try {
                // Add the role to the member
                await member.roles.add(roleId);
                console.log(`Assigned role to ${member.user.username} for introducing themselves.`);
            } catch (error) {
                console.error(`Failed to assign role: ${error}`);
            }
        }
    }
});

client.login(TOKEN);