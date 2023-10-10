import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({
  tableName: 'projects',
})
export class ProjectEntity extends BaseEntity<ProjectEntity> {
  @Property()
  link!: string;

  @Property()
  mimeType!: string;

  @Property({ nullable: true })
  name?: string;

  constructor() {
    super();
  }
}
