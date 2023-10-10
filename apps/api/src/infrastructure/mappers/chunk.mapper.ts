import { Injectable } from '@nestjs/common';
import { ChunkEntity } from '../entities';
import { Chunk } from '@app/model';

@Injectable()
export class ChunkMapper {
  public from(model: Chunk, entity?: ChunkEntity | null): ChunkEntity {
    if (!entity) {
      entity = new ChunkEntity();
    }

    entity.id = model.id;
    entity.projectId = model.projectId;
    entity.transcription = model.transcription;
    entity.start = model.start;
    entity.end = model.end;
    entity.position = model.position;
    entity.createdAt = model.createdAt;

    return entity;
  }

  public to(entity: ChunkEntity): Chunk {
    return new Chunk(entity);
  }
}
