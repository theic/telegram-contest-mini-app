// import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Sse } from '@nestjs/common';

import { ChunksService, ProjectsService } from '@app/infrastructure/services';
import { Body, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { Scenes, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { stringifySync } from 'subtitle';
import { NodeList } from 'subtitle';
import { Constants } from '@app/constants';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectsService)
    private readonly projectsService: ProjectsService,
    @Inject(ChunksService)
    private readonly chunksService: ChunksService,
    @InjectBot()
    private readonly bot: Telegraf<Scenes.SceneContext>,
    
  ) {}

  @Get(':projectId')
  async getProject(
    @Param('projectId') projectId: string,
  ) {
    const chunks = await this.chunksService.findByProject(projectId);

    return chunks;
  }

  @Get(':projectId/subtitles')
  async generateSubtitles(
    @Param('projectId') projectId: string,
    @Query('chatId') chatId: string,
  ) {
    const chunks = await this.chunksService.findByProject(projectId);
    const project = await this.projectsService.get(projectId);

    const nodes: NodeList = chunks.map((chunk) => ({
      type: 'cue',
      data: {
        start: chunk.start,
        end: chunk.end,
        text: chunk.transcription,
      }
    }));
    const subtitles = stringifySync(nodes, { format: 'WebVTT' });
    
    const filename = `${project.name || Constants.DEFAULT_SUBTITLES_FILE_NAME}.vtt`;

    await this.bot.telegram.sendDocument(chatId, {
      filename,
      source: Buffer.from(subtitles, 'utf-8'),
    });

    return chunks;
  }
}
