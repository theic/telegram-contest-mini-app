export class Constants {
  public static readonly CHUNK_MAX_LENGTH = 500;
  public static readonly DEFAULT_BOT_NAME = 'TestPatrikBot';
  public static readonly MIME_TYPES = [
    'video/mp4',
    'video/mpeg',
    'audio/mpeg',
    'audio/mp4',
    'audio/wav',
  ];
  public static readonly MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB in bytes
  public static readonly BOT_START_TEXT = `Upload videos (up to 25MB) to this chat, and receive subtitles in the video's language.`;
  public static readonly BOT_REQUEST_TEXT = `Please, send me a video file.`;
  public static readonly DEFAULT_SUBTITLES_FILE_NAME = 'subtitles';
}