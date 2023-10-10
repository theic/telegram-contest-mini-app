import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '@app/constants';
import { ChunkEntity } from '../entities';
import { Chunk } from '@app/model/chunk';
import { ChunkMapper } from '../mappers';
import { Cue, parseSync } from 'subtitle';

@Injectable()
export class ChunksService {
  constructor(
    @Inject(ChunkMapper)
    private readonly chunkMapper: ChunkMapper,
    private readonly em: EntityManager,
  ) {}

  public async create(chunk: Chunk) {
    const entity = this.chunkMapper.from(chunk);

    await this.em.persistAndFlush(entity);

    return this.chunkMapper.to(entity);
  }

  public async findByProject(projectId: string) {
    const chunks = await this.em.find(ChunkEntity, {
      projectId,
    }, {
      orderBy: {
        position: QueryOrder.ASC, 
      }
    });

    return chunks;
  }

  public async parseSubtitles(subtitlesRaw: string, projectId: string) {
    const nodes = parseSync(subtitlesRaw);

    if (!nodes || nodes.length === 0) {
      throw new Error('No subtitles found');
    }

    for (const [position, {data}] of nodes.filter(({ type, data }) => type === 'cue' && !!data).entries()) {
      const {start, end, text} = data as Cue;

      await this.create(new Chunk({
        projectId,
        start,
        end,
        transcription: text,
        position,
      }));
    }
  }
}
