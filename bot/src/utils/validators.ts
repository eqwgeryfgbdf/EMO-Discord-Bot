import { ChatInputCommandInteraction, Message } from 'discord.js';

/**
 * 驗證用戶是否有管理員權限
 */
export function hasAdminPermission(
  interaction: ChatInputCommandInteraction | Message
): boolean {
  if (!interaction.member || !('permissions' in interaction.member)) {
    return false;
  }

  return interaction.member.permissions.has('Administrator');
}

/**
 * 驗證用戶是否有特定權限
 */
export function hasPermission(
  interaction: ChatInputCommandInteraction | Message,
  permission: bigint
): boolean {
  if (!interaction.member || !('permissions' in interaction.member)) {
    return false;
  }

  return interaction.member.permissions.has(permission);
}

/**
 * 驗證命令參數
 */
export function validateCommandArgs(
  args: string[],
  minArgs: number,
  maxArgs?: number
): { valid: boolean; error?: string } {
  if (args.length < minArgs) {
    return {
      valid: false,
      error: `命令需要至少 ${minArgs} 個參數`,
    };
  }

  if (maxArgs !== undefined && args.length > maxArgs) {
    return {
      valid: false,
      error: `命令最多需要 ${maxArgs} 個參數`,
    };
  }

  return { valid: true };
}

/**
 * 清理用戶輸入
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>@#&!]/g, '');
}

