import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../types/command';

/**
 * Ping 命令 - 測試 Bot 回應時間
 */
export const pingCommand: Command = {
  name: 'ping',
  description: '測試 Bot 回應時間',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('測試 Bot 回應時間'),

  executeSlash: async (interaction: ChatInputCommandInteraction) => {
    const sent = await interaction.reply({
      content: 'Pinging...',
      fetchReply: true,
    });

    const timeDiff = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.editReply(
      `🏓 Pong!\n` +
      `📡 API 延遲: ${apiLatency}ms\n` +
      `⏱️ 回應時間: ${timeDiff}ms`
    );
  },

  executePrefix: async (message: Message) => {
    const sent = await message.reply('Pinging...');
    const timeDiff = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);

    await sent.edit(
      `🏓 Pong!\n` +
      `📡 API 延遲: ${apiLatency}ms\n` +
      `⏱️ 回應時間: ${timeDiff}ms`
    );

    return { success: true };
  },
};

