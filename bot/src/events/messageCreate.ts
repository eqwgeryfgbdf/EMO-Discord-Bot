import { Events, Message } from 'discord.js';
import { logger } from '../utils/logger';
import { commands } from '../commands';
import { config } from '../config/config';
import { hasAdminPermission } from '../utils/validators';

/**
 * 訊息建立事件處理器
 */
export function handleMessageCreate(client: any) {
  client.on(Events.MessageCreate, async (message: Message) => {
    // 忽略 Bot 訊息
    if (message.author.bot) {
      return;
    }

    // 檢查是否為 Prefix Command
    if (!message.content.startsWith(config.prefix)) {
      return;
    }

    // 解析命令
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) {
      return;
    }

    const command = commands.get(commandName);

    if (!command) {
      // 命令不存在，不回應（避免垃圾訊息）
      return;
    }

    // 檢查是否需要伺服器環境
    if (command.guildOnly && !message.guild) {
      await message.reply('❌ 此命令只能在伺服器中使用');
      return;
    }

    // 檢查管理員權限
    if (command.requiresAdmin && !hasAdminPermission(message)) {
      await message.reply('❌ 您沒有執行此命令的權限');
      return;
    }

    // 執行命令
    try {
      if (command.executePrefix) {
        const result = await command.executePrefix(message, args);
        
        if (result && !result.success) {
          await message.reply(result.error || '❌ 命令執行失敗');
        }
      } else {
        await message.reply(
          '❌ 此命令不支援 Prefix Command 格式，請使用 Slash Command'
        );
      }
    } catch (error) {
      logger.error(`執行命令 ${command.name} 時發生錯誤:`, error);
      
      const errorMessage =
        error instanceof Error ? error.message : '未知錯誤';
      await message.reply(`❌ 發生錯誤: ${errorMessage}`);
    }
  });
}

