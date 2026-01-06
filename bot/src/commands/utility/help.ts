import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Message,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../types/command';

/**
 * Help 命令 - 顯示可用命令列表
 */
export const helpCommand: Command = {
  name: 'help',
  description: '顯示可用命令列表',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('顯示可用命令列表')
    .addStringOption((option) =>
      option
        .setName('command')
        .setDescription('查看特定命令的詳細資訊')
        .setRequired(false)
    ),

  executeSlash: async (interaction: ChatInputCommandInteraction) => {
    const commandName = interaction.options.getString('command');

    if (commandName) {
      // 顯示特定命令的詳細資訊
      // TODO: 從命令註冊表獲取命令資訊
      await interaction.reply({
        content: `命令 "${commandName}" 的詳細資訊將在此顯示`,
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('📚 EMO Bot 命令列表')
      .setDescription('以下是可用的命令：')
      .addFields(
        {
          name: '🔧 工具命令',
          value: '`/ping` - 測試 Bot 回應時間\n`/help` - 顯示此幫助訊息',
          inline: false,
        },
        {
          name: 'ℹ️ 資訊',
          value: '使用 `/help <命令名稱>` 查看特定命令的詳細資訊',
          inline: false,
        }
      )
      .setColor(0x5865f2)
      .setTimestamp()
      .setFooter({
        text: 'EMO Discord Bot',
      });

    await interaction.reply({ embeds: [embed] });
  },

  executePrefix: async (message: Message, args: string[]) => {
    const embed = new EmbedBuilder()
      .setTitle('📚 EMO Bot 命令列表')
      .setDescription('以下是可用的命令：')
      .addFields(
        {
          name: '🔧 工具命令',
          value: '`!ping` - 測試 Bot 回應時間\n`!help` - 顯示此幫助訊息',
          inline: false,
        },
        {
          name: 'ℹ️ 資訊',
          value: '使用 `!help <命令名稱>` 查看特定命令的詳細資訊',
          inline: false,
        }
      )
      .setColor(0x5865f2)
      .setTimestamp()
      .setFooter({
        text: 'EMO Discord Bot',
      });

    await message.reply({ embeds: [embed] });
    return { success: true };
  },
};

