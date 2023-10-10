import { Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';
import { Inject, Injectable } from '@nestjs/common';
import { WhisperService } from '../../infrastructure/services/whisper.service';
import { ProjectsService } from '../../infrastructure/services/projects.service';
import { Project } from '@app/model';
import ServerConfig from '../../config/server';
import { ConfigType } from '@nestjs/config';
import { Constants } from '@app/constants';
import { ChunksService } from '@app/infrastructure/services/chunks.service';

@Update()
@Injectable()
export class TelegramHandler {
  constructor(
    @Inject(WhisperService)
    private readonly whisperProvider: WhisperService,
    @Inject(ProjectsService)
    private readonly projectsService: ProjectsService,
    @Inject(ChunksService)
    private readonly chunksService: ChunksService,
    @Inject(ServerConfig.KEY)
    private readonly serverConfig: ConfigType<typeof ServerConfig>,
  ) {}

  @Start()
  async start(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.reply(Constants.BOT_START_TEXT);
    await ctx.reply(Constants.BOT_REQUEST_TEXT);
  }

  @On('document')
  async onDocument(@Ctx() ctx: Scenes.SceneContext) {
    const { message } = ctx;

    await this.processVideo(ctx, {
      fileId: message['document']['file_id'],
      fileSize: message['document']['file_size'],
      mimeType: message['document']['mime_type'],
      fileName: message['document']['file_name'],
    });
  }

  @On('video')
  async onVideo(@Ctx() ctx: Scenes.SceneContext) {
    const { message } = ctx;
    
    await this.processVideo(ctx, {
      fileId: message['video']['file_id'],
      fileSize: message['video']['file_size'],
      mimeType: message['video']['mime_type'],
      fileName: message['video']['file_name'],
    });
  }

  private async processVideo(ctx: Scenes.SceneContext, { fileId, fileSize, mimeType, fileName }: { fileId: string; fileSize: number; mimeType: string; fileName: string;}) {
    if (fileSize > Constants.MAX_FILE_SIZE) {
      await ctx.reply(`❌ File size exceeds ${Constants.MAX_FILE_SIZE / 1024 / 1024} MB`);
      return;
    }

    const { href: fileUrl} = await ctx.telegram.getFileLink(fileId);

    const model = new Project({
      link: fileUrl,
      name: fileName,
      mimeType,
    });

    const project = await this.projectsService.create(model);

    await ctx.reply(`✅ File received. Processing...`);

    const transcription = await this.whisperProvider.createTranscription(project.link, project.name);

    await this.chunksService.parseSubtitles(transcription, project.id);

    await ctx.sendVideo(fileId,
      {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: this.replyMarkup(project.id),
      });
  }

  private replyMarkup(projectId: string) {
    const { reply_markup } = Markup.inlineKeyboard(
      [
        Markup.button.webApp(
          'View',
          `${this.serverConfig.publicOrigin}?projectId=${projectId}`,
        ),
      ],
      { columns: 1 },
    );

    return reply_markup;
  }
}
