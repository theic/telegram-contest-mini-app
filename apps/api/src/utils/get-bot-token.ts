import { Constants } from '@app/constants';

export function getBotToken(name?: string): string {
  return name && name !== Constants.DEFAULT_BOT_NAME ? `${name}Bot` : Constants.DEFAULT_BOT_NAME;
}