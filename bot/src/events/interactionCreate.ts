import {
  ChatInputCommandInteraction,
  Events,
  Interaction,
} from 'discord.js';
import { logger } from '../utils/logger';
import { commands } from '../commands';
import { hasAdminPermission } from '../utils/validators';

/**
 * 互動建立事件處理器
 */
export function handleInteractionCreate(client: any) {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    // 處理 Slash Commands
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(interaction);
    }
    // TODO: 處理其他類型的互動（按鈕、選單等）
  });
}

/**
 * 處理 Slash Command
 */
async function handleSlashCommand(
  interaction: ChatInputCommandInteraction
): Promise<void> {
  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`未找到命令: ${interaction.commandName}`);
    await interaction.reply({
      content: '❌ 找不到此命令',
      ephemeral: true,
    });
    return;
  }

  // 檢查是否需要伺服器環境
  if (command.guildOnly && !interaction.guild) {
    await interaction.reply({
      content: '❌ 此命令只能在伺服器中使用',
      ephemeral: true,
    });
    return;
  }

  // 檢查管理員權限
  if (command.requiresAdmin && !hasAdminPermission(interaction)) {
    await interaction.reply({
      content: '❌ 您沒有執行此命令的權限',
      ephemeral: true,
    });
    return;
  }

  // 執行命令
  try {
    if (command.executeSlash) {
      const result = await command.executeSlash(interaction);
      
      if (result && !result.success) {
        await interaction.reply({
          content: result.error || '❌ 命令執行失敗',
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: '❌ 此命令不支援 Slash Command 格式',
        ephemeral: true,
      });
    }
  } catch (error) {
    logger.error(`執行命令 ${command.name} 時發生錯誤:`, error);
    
    const errorMessage =
      error instanceof Error ? error.message : '未知錯誤';
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: `❌ 發生錯誤: ${errorMessage}`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `❌ 發生錯誤: ${errorMessage}`,
        ephemeral: true,
      });
    }
  }
}

