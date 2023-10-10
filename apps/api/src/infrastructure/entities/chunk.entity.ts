import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { Constants } from '@app/constants';

@Entity({
  tableName: 'chunks',
})
export class ChunkEntity extends BaseEntity<ChunkEntity> {
  @Property()
  start!: number;

  @Property()
  end!: number;

  @Property()
  projectId!: string;

  @Property()
  position!: number;

  @Property({ length: Constants.CHUNK_MAX_LENGTH })
  transcription!: string;

  constructor() {
    super();
  }
}
