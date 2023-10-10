import {
  Entity,
  PrimaryKey,
  Property,
  BaseEntity as Base,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ abstract: true })
export abstract class BaseEntity<T extends { id: string }> extends Base<
  T,
  'id'
> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
